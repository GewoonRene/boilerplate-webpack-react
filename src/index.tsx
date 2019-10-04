import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './styles/index.scss';

"use strict"
const Index = () => {
    return (
        <React.Fragment>
            <Router>
                <Switch>
                    <Route path="/" > </Route>
                </Switch>
            </Router>
        </React.Fragment>
    )
}

// @ts-ignore // Ignores HMR
if (module.hot) { module.hot.accept() }
render(<Index />, document.getElementById('app'));
