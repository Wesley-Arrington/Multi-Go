import { connect } from 'react-redux';
import LoggedInOptions from './logged_in_options';

const mapStateToProps = (state, ownProps) => {
    // debugger;
    return {
        // isLoggedIn: state.session.isAuthenticated,
        currentUser: state.session.user
    };
};

const mapDispatchToProps = dispatch => ({
    // createNewUser: formUser => dispatch(createNewUser(formUser)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoggedInOptions);
