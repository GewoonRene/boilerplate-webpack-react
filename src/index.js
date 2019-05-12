import React from 'react';
import ReactDOM from 'react-dom';

import './styles/index.scss';

const Index = () => {
    return (
        <div>hello world</div>
    )
}

ReactDOM.render(<Index />, document.getElementById('app'));

if (module.hot) {
    module.hot.accept();
}