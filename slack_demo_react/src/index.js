import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux';

import Layout from './components/Layout';
import reducers from './reducers';
import WorkspacePage from './pages/workspace';
import SigninPage from './pages/signin';
import WelcomePage from './pages/welcome';

import './resources/css/font.css';
import './resources/css/icon.css';
import './resources/css/header.css';
import './resources/css/alert.css';
import './resources/css/text.css';
import './resources/css/ladda.css';
import './resources/css/form.css';
import './resources/css/menu.css';
import './resources/css/sticky_nav.css';
import './resources/css/signin.css';
import './resources/css/footer.css';

const store = createStore(
    reducers, 
    {},
    applyMiddleware(thunk)
);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Layout>
                <Route path="/" exact component={WorkspacePage} />
                <Route path="/signin" exact component={SigninPage} />
                <Route path="/welcome" exact component={WelcomePage} />
            </Layout>
        </BrowserRouter>
    </Provider>,
    document.querySelector('#root')
);