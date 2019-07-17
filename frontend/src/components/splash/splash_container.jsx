import { connect } from 'react-redux';
// import { logout } from '../../actions/session_actions';
import { createGame } from '../../actions/game_action';
import { openModal, closeModal } from '../../actions/modal_action'
import Splash from './splash';

const mdp = dispatch => {
    return {
        newGame: (data) => dispatch(createGame(data)),
        openModal: (modal) => dispatch(openModal(modal))
        // getGame: (id) => dispatch(fetchGame(id))
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isLoggedIn: state.session.isAuthenticated
    };
};

export default connect(mapStateToProps, mdp)(Splash);
