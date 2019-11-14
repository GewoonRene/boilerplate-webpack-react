import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './index.less';

"use strict"
const Index: React.FC = (): JSX.Element => (
  <React.Fragment>
    <Router>
      <Switch>
        <Route path="/" >
          hello
        </Route>
      </Switch>
    </Router>
  </React.Fragment>
)

// @ts-ignore // Ignores HMR
if (module.hot) module.hot.accept();
render(<Index />, document.getElementById('app'));
