import React from 'react';
import RegisterCard from '../components/RegisterCard';

class RegisterPage extends React.Component {
    render() {
        return <div className="decorate" align="center" style={{ backgroundColor:'#2F4F4F', minHeight:'727px', marginBottom: '-30px' }}>
        <div>
            <RegisterCard />
        </div></div>;
    }
}

export default RegisterPage