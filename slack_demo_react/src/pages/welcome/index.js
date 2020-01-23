import React, { Component } from 'react';
import { connect } from 'react-redux';

class WelcomePage extends Component {
    state = { loading: false };
    componentWillMount() {

        this.requireAuth();
    }

    componentWillUpdate() {
        
        this.requireAuth();
    }

    requireAuth() {
        if (!this.props.user.authenticated) {
            this.props.history.push('/');
        }
    }

    render() {
        if (this.props.user.authenticated) {
            return (
                <div className="card align_center span_4_of_6 col float_none margin_auto large_bottom_margin large_bottom_padding large_right_padding large_left_padding">
                    <h1>Welcome to your workspace!</h1>
                    <div className="col float_none margin_auto span_4_of_6">
                        <p>
                            You have signed in with the following information:
                        </p>
                        <p>
                            <span className="col align_left span_3_of_6">
                                Workspace URL:
                            </span>
                            <span className="col align_left span_3_of_6">
                                {this.props.team.teamUrl}
                            </span>
                        </p>
                        <p>
                            <span className="col align_left span_3_of_6">
                                Team ID:
                            </span>
                            <span className="col align_left span_3_of_6">
                                {this.props.team.teamId}
                            </span>
                        </p>
    
                        <p>
                            <span className="col align_left span_3_of_6">
                                User Email:
                            </span>
                            <span className="col align_left span_3_of_6">
                                {this.props.user.email}
                            </span>
                        </p>
    
                        <p>
                            <span className="col align_left span_3_of_6">
                                User ID:
                            </span>
                            <span className="col align_left span_3_of_6">
                                {this.props.user.userId}
                            </span>
                        </p>
    
                        <div className="clear_both"></div>
                    </div>
                </div>
            );
        }
        
        return (<div></div>);
        
    }
}

function mapStateToProps({ auth }) {
    return {
        team: auth.team,
        user: auth.user
    };
}

export default connect(mapStateToProps)(WelcomePage);