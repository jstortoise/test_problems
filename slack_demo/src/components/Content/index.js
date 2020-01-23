import React, { Component } from 'react';

class Content extends Component {
    render() {
        const { children } = this.props;
        return (
            <div id="page">
                <div id="page_contents" data-qa="page_contents">
                    {children}
                </div>
            </div>
        );
    }
}

export default Content;