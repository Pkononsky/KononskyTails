import Link from "next/link";
import React, {Fragment} from 'react';

import {SceneData} from '../../server/types';
import Achievements from '../achievements';

interface SceneProps {
    sceneData: SceneData;
    fetchScene: Function;
}

export default function Scene({sceneData, fetchScene}: SceneProps) {
    const scene = sceneData.scene;
    const actions = sceneData.actions;

    function handleDefaultActionClick(): void {
        fetchScene(sceneData.currentAdventure, sceneData.firstScene);
    }

    return scene ? (
        <div className="scene-page__content">
            {
                scene.picture ?
                    (
                        <
                            Fragment>
                            <div className="scene-page__picture">
                                <img src={scene.picture} alt="scene-pic" className="scene-page__img"/>
                            </div>
                            <div className="scene-page__description">
                                <p className="scene-page__description-text {scene.descriptionPos}">
                                    {scene.description}
                                </p>
                            </div>
                        </Fragment>
                    )
                    :
                    (
                        <div className="scene-page__description black UL">
                            <p>
                                {scene.description}
                            </p>
                        </div>
                    )
            }
            <Achievements achievements={sceneData.achievements || []}/>
            {
                actions?.length ?
                    (
                        <div className="scene-page__buttons">
                            {
                                actions?.map(action => {
                                    const linkHref = {pathname: "/adventureScene"};

                                    function handleClick(): void {
                                        fetchScene(sceneData.currentAdventure, action.nextScene);
                                    }

                                    return (
                                        <Link as={action.nextScene} href={linkHref}>
                                            <a className="scene-page__button" onClick={handleClick}>
                                                <p className="scene-page__button-text">
                                                    {action.actionRu}
                                                </p>
                                            </a>
                                        </Link>)
                                })}
                        </div>
                    )
                    :
                    (
                        <div className="scene-page__start-again">
                            <Link as={sceneData.firstScene} href={{pathname: "/adventureScene"}}>
                                <a className="scene-page__button" onClick={handleDefaultActionClick}>
                                    <p className="scene-page__button-text">
                                        Начать заново
                                    </p>
                                </a>
                            </Link>
                        </div>
                    )
            }
        </div>
    ) : null;
}
