const DEFAULT_IMG = 'https://s1.1zoom.ru/big0/788/Lavandula_Fields_Blue_525422_1280x778.jpg';
const FETCH_ALERT_MESSAGE = 'Не удалось загрузить приключения';

const SERVER_GET_ADVENTURES_FUNCTION = 'getNextFiveAdventures';
const SERVER_START_ADVENTURE_PATH = 'startAdventure';

const HASH_TAG_PARAM = 'hashTag';
const ADVENTURE_NAME_PARAM = 'adventureName';

const DIV_TAG = 'div';
const IMG_TAG = 'img';
const META_TAG = 'meta';
const A_TAG = 'a';
const P_TAG = 'p';

const HOME_PAGE_ADVENTURES_CLASS = 'home_page__adventures';
const ADVENTURE_META_CLASS = 'adventure__meta';
const ADVENTURE_IMG_CLASS = 'adventure__img';
const ADVENTURE_DESCRIPTION_CLASS = 'adventure__description';
const ADVENTURE_HASHTAGS_CLASS = 'adventure__hashTags';
const ADVENTURE_HASHTAG_CLASS = 'adventure__hashTag';
const ADVENTURE_HASHTAG_TEXT_CLASS = 'adventure__hashTag-text';
const ADVENTURE_TEXTS_CLASS = 'adventure__texts';
const ADVENTURE_TITLE_CLASS = 'adventure__title';
const ADVENTURE_CLASS = 'adventure';

const QUERY_HOME_PAGE_ADVENTURES = `.${HOME_PAGE_ADVENTURES_CLASS}`;
const QUERY_ADVENTURE_META = `.${ADVENTURE_META_CLASS}`;
const QUERY_ADVENTURE_LAST_CHILD = `.${ADVENTURE_CLASS}:last-child`;

function resolveHashTagClick(tag) {
    hashTag = tag;
    history.pushState({page: hashTag}, hashTag, `/${hashTag}`);
    showHashTagPage(tag);
}

function showHashTagPage(tag) {
    const adventuresDiv = document.querySelector(QUERY_HOME_PAGE_ADVENTURES);
    const newAdventuresDiv = document.createElement(DIV_TAG);
    newAdventuresDiv.classList.add(HOME_PAGE_ADVENTURES_CLASS);
    adventuresDiv.replaceWith(newAdventuresDiv);

    fetchFromServer(`/${SERVER_GET_ADVENTURES_FUNCTION}?${HASH_TAG_PARAM}=${tag}`);
}

window.onpopstate = function (event) {
    hashTag = event.state.page;
    showHashTagPage(event.state.page);
};

function renderElement(tag, className, parent) {
    const element = document.createElement(tag);
    if (className) {
        element.classList.add(className);
    }
    parent.appendChild(element);

    return element;
}

function addAdventureMeta(adventure, adventureDiv) {
    const adventureMeta = renderElement(META_TAG, ADVENTURE_META_CLASS, adventureDiv);
    adventureMeta.name = adventure.adventureData.adventureName;
}

function addAdventureImg(adventure, adventureDiv) {
    const adventureImgDiv = renderElement(DIV_TAG, ADVENTURE_IMG_CLASS, adventureDiv);
    const imgRef = renderElement(A_TAG, null, adventureImgDiv);
    const adventureImg = renderElement(IMG_TAG, ADVENTURE_IMG_CLASS, imgRef);

    imgRef.href = `/${SERVER_START_ADVENTURE_PATH}/${adventure.adventureData.adventureName}`;

    adventureImg.src = adventure.adventureData.picture || DEFAULT_IMG;
    adventureImg.alt = 'adventure';
}

function addDescription(adventure, adventureTextsDiv) {
    if (adventure?.adventureData?.description) {
        const adventureDescription = renderElement(P_TAG, ADVENTURE_DESCRIPTION_CLASS, adventureTextsDiv);
        adventureDescription.innerText = adventure.adventureData.description;
    }
}

function addHashTags(adventure, adventureTextsDiv) {
    if (adventure.hashTags) {
        const advHashTagsDiv = renderElement(DIV_TAG, ADVENTURE_HASHTAGS_CLASS, adventureTextsDiv);
        adventure.hashTags.forEach((hashTag) => {
            const hashTagDiv = renderElement(DIV_TAG, ADVENTURE_HASHTAG_CLASS, advHashTagsDiv);
            const hashTagRef = renderElement(A_TAG, ADVENTURE_HASHTAG_TEXT_CLASS, hashTagDiv);

            hashTagRef.addEventListener('click', () => resolveHashTagClick(hashTag.valueEn));
            hashTagRef.innerText = `#${hashTag.valueRu}`;
        });
    }
}

function addAdventureTexts(adventure, adventureDiv) {
    const adventureTextsDiv = renderElement(DIV_TAG, ADVENTURE_TEXTS_CLASS, adventureDiv);
    const titleRef = renderElement(A_TAG, ADVENTURE_TITLE_CLASS, adventureTextsDiv);

    titleRef.href = `/${SERVER_START_ADVENTURE_PATH}/${adventure.adventureData.adventureName}`;
    titleRef.innerText = adventure.adventureData.adventureName;

    addDescription(adventure, adventureTextsDiv);
    addHashTags(adventure, adventureTextsDiv);
}

function addAdventuresOnPage(nextAdventures) {
    nextAdventures.map((adventure) => {
        const adventureDiv = renderElement(DIV_TAG, ADVENTURE_CLASS, document.querySelector(QUERY_HOME_PAGE_ADVENTURES));

        addAdventureMeta(adventure, adventureDiv);
        addAdventureImg(adventure, adventureDiv);
        addAdventureTexts(adventure, adventureDiv);
    });
}

function observerCallBack(entries) {
    if (entries[0].isIntersecting) {
        const adventureName = lastPageAdventure.querySelector(QUERY_ADVENTURE_META).name;
        fetchFromServer(`/${SERVER_GET_ADVENTURES_FUNCTION}?${ADVENTURE_NAME_PARAM}=${adventureName}&${HASH_TAG_PARAM}=${hashTag}`)
    }
}

function fetchFromServer(input) {
    fetch(input)
        .then((res) => res.json())
        .then((data) => {
            addAdventuresOnPage(data.adventures);
            observer.unobserve(lastPageAdventure);
            if (data.adventures.length !== 0) {
                lastPageAdventure = document.querySelector(QUERY_ADVENTURE_LAST_CHILD);
                observer.observe(lastPageAdventure);
            }
        })
        .catch(() => alert(FETCH_ALERT_MESSAGE));
}

const splittedUrl = document.location.pathname.split('/');
let hashTag = splittedUrl[splittedUrl.length - 1];
history.pushState({page: hashTag}, hashTag, `/${hashTag}`);

const observer = new IntersectionObserver(observerCallBack);
let lastPageAdventure = document.querySelector(QUERY_ADVENTURE_LAST_CHILD);
observer.observe(lastPageAdventure);
