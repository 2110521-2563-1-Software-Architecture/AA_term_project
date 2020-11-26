import React from 'react';
import RegisterCard from '../components/RegisterCard';

class RegisterPage extends React.Component {
    render() {
        return <div className="decorate" align="center" style={{ paddingTop: 70 }}>
        <div>
            <RegisterCard />
        </div></div>;
    }
}

export default RegisterPage