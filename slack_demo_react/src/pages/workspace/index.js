import React, { Component } from 'react';
import Alert from '../../components/Alert';
import * as actions from '../../actions';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';

class WorkspacePage extends Component {

    state = { loading: false };

    onSubmit = formProps => {
        this.setState(state => {
            return { ...state, loading: true };
        });
        this.props.findWorkspace(formProps.domain, () => {
            this.setState(state => {
                return { ...state, loading: false };
            });

            if (this.props.team.found) {
                this.props.history.push('/signin');
            }
        });
    }

    renderAlert() {
        if (this.props.team.error) {
            return (
                <Alert
                    htmlText={
                        <span>
                            <strong>We couldn’t find your workspace.</strong> If you can’t remember your workspace’s address, we can 
                            <a href="/get-started#find" className="bold"> send you a reminder</a>.
                        </span>
                    }
                />
            );
        } else {
            return;
        }
        
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

        return (
            <div>
                {this.renderAlert()}
                <form 
                    onSubmit={handleSubmit(this.onSubmit)} 
                    className="card align_center span_4_of_6 col float_none margin_auto large_bottom_margin large_bottom_padding large_right_padding large_left_padding">
                    <h1>Sign in to your workspace</h1>
                    <div className="col float_none margin_auto span_4_of_6">
                        <p>
                            Enter your workspace’s <strong>Slack URL</strong>.
                        </p>
                        <p className="no_bottom_margin domain_input ">
                            <Field
                                name="domain" 
                                id="domain"
                                type="text"
                                placeholder="your-workspace-url"
                                className="input_inline align_right small_right_margin team_name_input"
                                component="input"
                                autoComplete="none"
                            />
                            <span className="domain small_bottom_margin">
                                .slack.com
                            </span>
                        </p>
                        <p className="large_bottom_margin">
                            <button className="btn btn_large small_top_margin full_width ladda-button" data-style="expand-right" {...loadingProps}>
                                <span className="ladda-label align_middle">Continue<i className="ts_icon ts_icon_arrow_large_right small_left_margin"></i></span>
                                <span className="ladda-spinner"></span>
                            </button>
                        </p>
                        <p>
                            Don’t know your workspace URL? 
                            <a href="/get-started#/find" className="bold"> Find your workspace</a>
                        </p>
                    </div>
                </form>

                <div className="align_center">
                    <p>
                        Need to get your group started on Slack?&nbsp;
                        <a href="https://slack.com/create" className="bold">Create a new workspace</a>
                    </p>
                </div>
            </div>
        );
    }
}

function mapStateToProps({ auth }) {
    return {
        team: auth.team
    };
}

export default compose(
    connect(mapStateToProps, actions),
    reduxForm({ form: 'workspace' })
)(WorkspacePage);