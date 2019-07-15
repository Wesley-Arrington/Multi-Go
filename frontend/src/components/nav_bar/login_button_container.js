import { connect } from 'react-redux';
// import { createNewUser, login} from '../../actions/session_actions'
import { openModal, closeModal } from '../../actions/modal_action'
import LoginButton from './login_button'

// const msp = ({}) => {
//     return 
// }

const mdp = dispatch => ({
    openModal: (modal) => dispatch(openModal(modal))
})

export default connect(null, mdp)(LoginButton);