import { connect } from 'react-redux';
import { openModal, closeModal } from '../../actions/modal_action'
import Signup from './sign_up';

const mapStateToProps = ({ errors }, ownProps) => {
    return {
        // toggleSignUpModal: ownProps.toggleSignUpModal
    };
};

const mapDispatchToProps = dispatch => ({
    // createNewUser: formUser => dispatch(createNewUser(formUser)),
    closeModal: () => dispatch(closeModal()),
    openModal: (modal) => dispatch(openModal(modal))

});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
