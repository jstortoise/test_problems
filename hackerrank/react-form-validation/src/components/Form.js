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
        };
        
        this.form = React.createRef();
    }

    verifyForm = () => {
        const { isFormValid } = this.props;
        if (this.form.current) {
            const { name, email, phone, url } = this.form.current.elements;
            
            var state = this.state;

            const nameRegEx = /^[a-z,A-Z]{3,30}$/;
            state.isNameValid = name.value && nameRegEx.test(name.value);

            const emailRegEx = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            state.isEmailValid = email.value && emailRegEx.test(email.value);

            const phoneRegEx = /^[2-9][0-9]{9}$/;
            state.isPhoneValid = phone.value && phoneRegEx.test(phone.value);
    
            const urlRegEx = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
            state.isUrlValid = !!(url.value && urlRegEx.test(url.value));

            console.log(url.value, urlRegEx.test(url.value));
            console.log(state);
            this.setState(state, () => {
                let isValid = false;
                if (state.isNameValid && state.isEmailValid && state.isPhoneValid && state.isUrlValid) {
                    isValid = true;
                }
                isFormValid(isValid);
            });
        }
    };
    
    render() {
        return (
            <div className="row">
            <h1 className="text-center">Form Validation</h1>
            <form ref={this.form}>
                <h3>Name:</h3>
                <input type="text" name="name" className="name" />
                <h3>Email:</h3>
                <input type="text" name="email" className="email" />
                <h3>Phone:</h3>
                <input type="text" name="phone" className="phone" />
                <h3>Blog URL:</h3>
                <input type="text" name="url" className="url" />
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
