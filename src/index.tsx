
import React from "react";
import {render} from "react-dom";
import './index.less';

const App = (): JSX.Element => (
  <h1>Hello world</h1>
);

document.addEventListener('DOMContentLoaded', () => render(
  <App/>, document.getElementById('app')
));