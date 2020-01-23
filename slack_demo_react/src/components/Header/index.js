import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
    render() {
        return (
            <nav className="top persistent">
                <Link to="/" className="logo"></Link>
                <ul>
                    <li>
                        <a href="https://slack.com/is">Product</a>
                    </li>
                    <li>
                        <a href="https://slack.com/pricing?ui_step=55&amp;ui_element=5">Pricing</a>
                    </li>
                    <li>
                        <a href="https://get.slack.help/hc/en-us" >Support</a>
                    </li>
                    <li className="mobile_btn download_slack">
                        <a href="https://slack.com/get">Download Slack</a>
                    </li>
                    <li>
                        <a href="https://slack.com/create">Create a new workspace</a>
                    </li>
                    <li>
                        <a href="https://slack.com/get-started">Find your workspace</a>
                    </li>
                    <li className="sign_in hide_on_mobile">
                        <a href="/" className="btn_sticky btn_filled">Sign in</a>
                    </li>
                    {/* <li className="mobile_btn mobile_menu_btn">
                        <a href="#" className="btn_sticky">Menu</a>
                    </li> */}
                </ul>
            </nav>
        );
    }
}

export default Header;