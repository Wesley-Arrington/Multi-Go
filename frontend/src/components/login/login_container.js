import { connect } from 'react-redux';
import { openModal, closeModal } from '../../actions/modal_action'
import Login from './login';

const mapDispatchToProps = dispatch => ({
    closeModal: () => dispatch(closeModal()),
    openModal: (modal) => dispatch(openModal(modal))

});

export default connect(null, mapDispatchToProps)(Login);
