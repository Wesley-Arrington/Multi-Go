import { connect } from 'react-redux';
// import { createNewUser } from '../../actions/session_actions';
import Signup from './sign_up';

const mapStateToProps = ({ errors }, ownProps) => {
    return {
        errors: errors.session,
        toggleSignUpModal: ownProps.toggleSignUpModal
    };
};

const mapDispatchToProps = dispatch => ({
    // createNewUser: formUser => dispatch(createNewUser(formUser)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
