import React, {Component, Fragment} from 'react';

import Adventures from '../components/adventures';
import Logo from '../components/logo';
import {PageData} from '../server/middlewares/pageData';

interface ListPageProps {
    adventureName: string;
    hashTag: string;
}

interface ListPageState {
    loading: boolean;
    currentHashTag: string;
    pageData: PageData;
}

export default class IndexPage extends Component<ListPageProps, ListPageState> {
    state: ListPageState = {
        loading: true,
        currentHashTag: '',
        pageData: {}
    };

    componentDidMount() {
        this.fetchAdventures();
    }

    fetchAdventures = (hashTag = '') => {
        const route = hashTag.length !== 0 ? `/api/${hashTag}` : '/api/adventures';
        fetch(route)
            .then(response => response.json())
            .then(pageData => this.setState({loading: false, pageData: pageData, currentHashTag: hashTag}))

    };

    fetchNextFive = (adventureName: string, hashTag: string) => {
        const route = `/api/getNextFiveAdventures?adventureName=${adventureName}&hashTag=` + (hashTag ? hashTag : '');
        fetch(route)
            .then(response => response.json())
            .then(pageData => {
                const newPageData = this.state.pageData;
                newPageData.adventures = newPageData.adventures?.concat(pageData.adventures);

                this.setState({loading: false, pageData: newPageData})
            });
    };

    render() {
        const {pageData, loading, currentHashTag} = this.state;

        if (loading) {
            return <p>Loading...</p>;
        }

        return (
            <div className="home-page">
                <Fragment>
                    {
                        pageData.logo ? <Logo logo={pageData.logo}
                                              fetchData={this.fetchAdventures}/> : undefined
                    }
                </Fragment>
                <Fragment>
                    <Adventures adventuresData={pageData.adventures || []}
                                currentHashTag={currentHashTag}
                                fetchAdventures={this.fetchAdventures}
                                fetchNextFive={this.fetchNextFive}/>
                </Fragment>
            </div>
        );
    }
}
