import React from 'react';
var config = require('../../config');
import SignUp from '../components/signup.js'

class Register extends React.Component {
  render() {
      return <div>
          <h1>Hello, This is a test, backend at {config.backendLocation}</h1>
          <SignUp/>
      </div>;
  }
}

export default Register
