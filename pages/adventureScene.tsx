import React, {Component, Fragment} from 'react';

import Logo from '../components/logo';
import {PageData} from '../server/middlewares/pageData';
import Scene from '../components/scene';

interface ScenePageProps {
    adventureName: string;
    nextScene: string;
}

interface ScenePageState {
    loading: boolean;
    pageData: PageData;
}

export default class IndexPage extends Component<ScenePageProps, ScenePageState> {
    static getInitialProps({req, query}: any) {
        const adventureName = req ?
            req.params.adventureName :
            query.adventureName;

        return {adventureName};
    }

    state: ScenePageState = {
        loading: true,
        pageData: {},
    };

    componentDidMount() {
        this.fetchScene();
    }

    fetchScene = (currentAdventure = this.props.adventureName, nextScene = '') => {
        const route = `/api/startAdventure/${currentAdventure}` + (nextScene ? `/${nextScene}` : '');
        fetch(route)
            .then(response => response.json())
            .then(pageData => this.setState({loading: false, pageData}));
    };

    render() {
        const {pageData, loading} = this.state;

        if (loading) {
            return <p>Loading...</p>;
        }

        return (
            <div className="scene-page">
                <Fragment>
                    {
                        pageData.logo ? <Logo logo={pageData.logo}
                                              fetchData={this.fetchScene}/> : undefined
                    }
                </Fragment>
                <Fragment>
                    <Scene sceneData={pageData}
                           fetchScene={this.fetchScene}/>
                </Fragment>
            </div>
        );
    }
}
