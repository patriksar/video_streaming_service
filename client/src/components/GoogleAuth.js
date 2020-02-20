import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

const key = '662101766932-45bfjdf5ifib0lpgqb7goi9knkom5a81.apps.googleusercontent.com';

class GoogleAuth extends React.Component {
    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: `${ key }`,
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    };

    onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId(), this.auth.currentUser.get().getBasicProfile().getGivenName());
        }
        else {
            this.props.signOut();
        }
    }

    onSignInClick = () => {
        this.auth.signIn();
    }

    onSignOutClick = () => {
        this.auth.signOut();
    }

    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return (
                null
            );
        }
        else if (this.props.isSignedIn) {
            return (
                <div className="ui labeled button">
                    <div className="ui google label">
                        Welcome { this.props.clientName }!
                    </div>
                    <button className="ui red google button" onClick={ this.onSignOutClick }>
                        <i className="google icon"></i>
                        Sign Out
                    </button>
                </div>
            );
        }
        else {
            return (
                <button className="ui red google button" onClick={ this.onSignInClick }>
                    <i className="google icon"></i>
                    Sign In with Google
                </button>
            );
        };
    };

    render() {
        return (
            <div className="item"> { this.renderAuthButton() } </div>
        );
    };
};

const mapStateToProps = (state) => {
    return { 
        isSignedIn: state.auth.isSignedIn,
        clientId: state.auth.clientId,
        clientName: state.auth.clientName
    };
}

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);