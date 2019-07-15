import { connect } from 'react-redux';
// import { createNewUser, login } from '../../actions/session_actions'
import { openModal, closeModal } from '../../actions/modal_action'
import SignUpButton from './sign_up_button';

// const msp = ({}) => {
//     return 
// }

const mdp = dispatch => ({
    openModal: (modal) => dispatch(openModal(modal))
})

export default connect(null, mdp)(SignUpButton);