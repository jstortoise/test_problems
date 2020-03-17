import React, {Component} from 'react';
import Form from './components/Form'
import Message from './components/Message'

class App extends Component {
    state = {
        message: 'Form is Incomplete!'
    };

    submitMessage = isValid => {
        this.setState({ message: isValid ? 'Form is Complete!' : 'Form is Incomplete!' });
    };

    render() {
        return (<div>
            <Form isFormValid={this.submitMessage}></Form>
            <Message>{this.state.message}</Message>
        </div>);
    }
}

export default App;
