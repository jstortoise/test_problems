import React, { Component } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import Content from '../Content';

class Layout extends Component {
    render() {
        return (
            <div>
                <Header />
                <Content>
                    {this.props.children}
                </Content>
                <Footer />
            </div>
        );
    }
}

export default Layout;