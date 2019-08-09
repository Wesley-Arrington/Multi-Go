import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createGame,  updateSetting } from '../../actions/game_action';
import { openModal, closeModal } from '../../actions/modal_action'
import GameSetting from './gameSettings';

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



export default withRouter(connect(msp, mdp)(GameSetting));
