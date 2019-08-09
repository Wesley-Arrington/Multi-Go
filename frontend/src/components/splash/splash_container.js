import { connect } from 'react-redux';
// import { logout } from '../../actions/session_actions';
import { createGame, getValidGames, updateSetting } from '../../actions/game_action';
import { openModal, closeModal } from '../../actions/modal_action'
import Splash from './splash';

const msp = (state, ownProps) => {
    return {
        isLoggedIn: state.session.isAuthenticated,
        currentUser: state.session.user,
        session: state.session
        // games: Object.values(state.entities.games)
    };
};

const mdp = dispatch => {
    return {
        newGame: (data) => dispatch(createGame(data)),
        openModal: (modal) => dispatch(openModal(modal)),
        getValidGames: () => dispatch(getValidGames()),
        updateSetting: (data) => dispatch(updateSetting(data))
        // getGame: (id) => dispatch(fetchGame(id))
    }
}



export default connect(msp, mdp)(Splash);
