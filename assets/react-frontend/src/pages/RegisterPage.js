import React from "react";
import RegisterCard from "../components/RegisterCard";

class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="decorate" align="center" style={{ paddingTop: 70 }}>
        <RegisterCard />
      </div>
    );
  }
}

export default RegisterPage;
