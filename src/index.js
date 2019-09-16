import React from 'react';
import ReactDOM from 'react-dom';

// Component imports 


// Styles
import './styles/index.scss';

const Index = () => {
    return (
        <div className="app-container">
        
        </div>
    )
}

ReactDOM.render(<Index />, document.getElementById('app'));
if (module.hot) { module.hot.accept() }