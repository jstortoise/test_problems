import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEmailValid: false,
            isNameValid: false,
            isPhoneValid: false,
            isUrlValid: false,
            name: '',
            email: '',
            phone: '',
            url: ''
        };
    }
    onChangeName = (e) => {
      this.setState({ name: e.target.value });
    }
    onChangeEmail = (e) => {
      this.setState({ email: e.target.value });
    }
    onChangePhone = (e) => {
      this.setState({ phone: e.target.value });
    }
    onChangeUrl = (e) => {
      this.setState({ url: e.target.value });
    }
    verifyForm = () => {
        const { isFormValid } = this.props;
        const { name, email, phone, url } = this.state;
        var state = {};
        const nameRegEx = /^[a-z,A-Z]{3,30}$/;
        state.isNameValid = !!name && nameRegEx.test(name);
        const emailRegEx = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        state.isEmailValid = !!email && emailRegEx.test(email);
        const phoneRegEx = /^[2-9][0-9]{9}$/;
        state.isPhoneValid = !!phone && phoneRegEx.test(phone);
        const urlRegEx = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
        state.isUrlValid = !!url && urlRegEx.test(url);
        this.setState(state, () => {
            let isValid = false;
            if (state.isNameValid && state.isEmailValid && state.isPhoneValid && state.isUrlValid) {
                isValid = true;
            }
            isFormValid(isValid);
        });
    };
    render() {
        return (
            <div className="row">
            <h1 className="text-center">Form Validation</h1>
            <form>
                <h3>Name:</h3>
                <input type="text" name="name" className="name" value={this.state.name} onChange={this.onChangeName} />
                <h3>Email:</h3>
                <input type="text" name="email" className="email" value={this.state.email} onChange={this.onChangeEmail} />
                <h3>Phone:</h3>
                <input type="text" name="phone" className="phone" value={this.state.phone} onChange={this.onChangePhone} />
                <h3>Blog URL:</h3>
                <input type="text" name="url" className="url" value={this.state.url} onChange={this.onChangeUrl} />
                <div className="small-6 small-centered text-center columns">
                    <a href="#" className="button success expand round text-center" onClick={this.verifyForm}>Verify</a>
                </div>
            </form>
        </div>);
    }
}
Form.propTypes = {
    isFormValid: PropTypes.func
};
export default Form;
