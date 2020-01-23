import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <footer>
                <section className="links">
                    <div className="grid">
                        <div className="col span_1_of_4 nav_col">
                            <ul>
                                <li className="cat_1">Using Slack</li>
                                <li>
                                    <a href="/is">Product</a>
                                </li>
                                <li>
                                    <a href="/enterprise">Enterprise</a>
                                </li>
                                <li>
                                    <a href="/pricing?ui_step=28&amp;ui_element=5">Pricing</a>
                                </li>
                                <li>
                                    <a href="https://get.slack.help/hc/en-us">Support</a>
                                </li>
                                <li>
                                    <a href="/guides">Slack Guides</a>
                                </li>
                                <li>
                                    <a href="/apps" >App Directory</a>
                                </li>
                                <li>
                                    <a href="https://api.slack.com/">API</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col span_1_of_4 nav_col">
                            <ul>
                                <li className="cat_2">Slack <i className="ts_icon_heart" /></li>
                                <li>
                                    <a href="/jobs" >Jobs</a>
                                </li>
                                <li>
                                    <a href="/customers">Customers</a>
                                </li>
                                <li>
                                    <a href="/developers">Developers</a>
                                </li>
                                <li>
                                    <a href="/events">Events</a>
                                </li>
                                <li>
                                    <a href="https://slackhq.com/">Blog</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col span_1_of_4 nav_col">
                            <ul>
                                <li className="cat_3">Legal</li>
                                <li>
                                    <a href="/privacy-policy">Privacy</a></li>
                                <li>
                                    <a href="/security">Security</a>
                                </li>
                                <li>
                                    <a href="/terms-of-service">Terms of Service</a>
                                </li>
                                <li>
                                    <a href="/policies">Policies</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col span_1_of_4 nav_col">
                            <ul>
                                <li className="cat_4">Handy Links</li>
                                <li>
                                    <a href="/downloads">Download desktop app</a>
                                </li>
                                <li>
                                    <a href="/downloads">Download mobile app</a>
                                </li>
                                <li>
                                    <a href="/brand-guidelines">Brand Guidelines</a>
                                </li>
                                <li>
                                    <a href="https://slackatwork.com">Slack at Work</a>
                                </li>
                                <li>
                                    <a href="https://status.slack.com/">Status</a>
                                </li>
                            </ul>
                        </div>
                     </div>
                </section>
                <div className="footnote">
                    <section>
                        <a href="https://slack.com">
                            <i className="c-icon--slack" />
                        </a>
                        <ul>
                            <li>
                                <a href="/help/contact">Contact Us</a>
                            </li>
                            <li>
                                <a href="https://twitter.com/SlackHQ">
                                    <i className="ts_icon_twitter" />
                                </a>
                            </li>
                            <li className="yt">
                                <a href="https://www.youtube.com/channel/UCY3YECgeBcLCzIrFLP4gblw">
                                    <i className="ts_icon_youtube" />
                                </a>
                            </li>
                        </ul>
                    </section>
                </div>
            </footer>
        );
    }
}

export default Footer;