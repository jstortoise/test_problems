import React, { Component } from 'react';
import Alert from '../../components/Alert';
import * as actions from '../../actions';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';

class SigninPage extends Component {
    state = { loading: false };
    componentWillMount() {

        this.requireTeam();
    }

    componentWillUpdate() {
        
        this.requireTeam();
    }

    requireTeam() {
        if (!this.props.team.found) {
            this.props.history.push('/');
        }
    }

    onSubmit = formProps => {
        this.setState(state => {
            return { ...state, loading: true };
        });
        this.props.authUser(formProps, () => {
            this.setState(state => {
                return { ...state, loading: false };
            });

            if (this.props.user.authenticated) {
                this.props.history.push('/welcome');
            }
        });
    }

    renderAlert() {
        if (this.props.user.error) {
            return (
                <Alert
                    htmlText={
                        <span>
                            Sorry, you entered an incorrect email address or password.
                        </span>
                    }
                />
            );
        } else {
            return;
        }
        
    }

    renderBelowContent() {
        return (
            <div className="real_content align_center">
                <p>
                    <span className="bold">Don't have an account on this workspace yet?</span>
                    <span className="clear_both block">Contact the workspace administrator for an invitation</span>
                </p>
                <p>
                    Trying to create a workspace?&nbsp;
                    <a href="https://slack.com/create" className="bold">Create a new workspace</a>
                </p>
            </div>
        );
    }

    render() {
        const { handleSubmit } = this.props;

        let loadingProps;
        if (this.state.loading) {
            loadingProps = {
                "disabled": true,
                "data-loading": true
            };
        } else {
            loadingProps = {};
        }

        // Extract team url and team name from the full url
        let teamUrl, teamName;
        if (this.props.team.found) {
            let matches = this.props.team.teamUrl.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
            teamUrl = matches && matches[1];
            matches = teamUrl.match(/^(.*)\.slack.com$/i);
            teamName = matches && matches[1];
        }
        
        return (
            <>
                {this.renderAlert()}

                <div className="real_content card align_center span_4_of_6 col float_none margin_auto large_bottom_margin right_padding large_bottom_padding">
                    <h1 id="signin_header" className="tiny_bottom_margin">
                        Sign in to &nbsp;
                        <span className="break_word capitalize">
                            {teamName}
                        </span> 
                    </h1>
                    <p className="medium_bottom_margin">{teamUrl}</p>
                    <div className="col span_4_of_6 float_none margin_auto signin_card">
                        <form id="signin_form" onSubmit={handleSubmit(this.onSubmit)}>
                            <p className="browser_password align_left">
                                Enter your <strong>email address</strong> and <strong>password</strong>.
                            </p>
                            <p className="ssb_password hidden">
                                What is your <strong>password</strong>?
                            </p>
                            <p className="no_bottom_margin">
                                <Field
                                    name="email"
                                    type="email"
                                    id="email"
                                    size="40"
                                    placeholder="you@example.com"
                                    autoComplete="none"
                                    component="input"
                                />
                            </p>
                            <p className="small_bottom_margin">
                                <Field
                                    name="password"
                                    type="password"
                                    id="password"
                                    size="40"
                                    placeholder="password"
                                    autoComplete="none"
                                    component="input"
                                />
                            </p>
                            <p>
                                <button 
                                    id="signin_btn" 
                                    type="submit" 
                                    className="btn btn_large full_width ladda-button" 
                                    data-style="expand-right" {...loadingProps}
                                >
                                    <span className="ladda-label">Sign in</span>
                                    <span className="ladda-spinner"></span>
                                </button>
                            </p>
                            <div className="align_left">
                                <label className="checkbox normal inline_block small_right_margin">
                                    <Field 
                                        name="remember"
                                        type="checkbox"
                                        component="input"
                                    />
                                    Remember me
                                </label>
                            </div>
                            <div className="align_left small_top_margin">
                                <a id="forgot-pw" href="/forgot">Forgot password?</a> · <a href="https://slack.com/get-started">Forgot which email you used?</a>
                            </div>
                        </form>
                        <div id="magic_login_cta" className="float_none margin_auto hidden">
                            <div className="or no_wrap small_top_padding medium_bottom_margin align_center">or</div>
                            <p className="large_bottom_margin">
                                <strong>Long password? Hard to type?</strong><br /> We can email you a magic link so you can sign in without having to type your password.    
                            </p>
                    
                        </div>
                    </div>
                    <p className="small clear_both taller_line_height"></p>
                </div>
                {this.renderBelowContent()}
                
            </>
        );
    }
}

function mapStateToProps({ auth }) {
    return {
        team: auth.team,
        user: auth.user
    };
}

export default compose(
    connect(mapStateToProps, actions),
    reduxForm({ form: 'signin' })
)(SigninPage);