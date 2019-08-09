import { connect } from 'react-redux';
import { createGame, getValidGames, updateSetting } from '../../actions/game_action';
import { openModal, closeModal } from '../../actions/modal_action'
import GameSetting from './game_setting';

const msp = (state, ownProps) => {
    return {
        isLoggedIn: state.session.isAuthenticated,
        session: state.session
    };
};

const mdp = dispatch => {
    return {
        newGame: (data) => dispatch(createGame(data)),
        updateSetting: (data) => dispatch(updateSetting(data))
    }
}



export default connect(msp, mdp)(GameSetting);
