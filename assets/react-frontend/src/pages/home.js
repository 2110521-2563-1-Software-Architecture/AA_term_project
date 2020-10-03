import React from 'react';
import ContainerImage from '../../assets/container.jpg'
var config = require('../../config')

class Home extends React.Component {
    render() {
        return <div>
            <h1>Hello, This is a test, backend at {config.backendLocation}</h1>
            <img src={ContainerImage} />
        </div>;
    }
}

export default Home