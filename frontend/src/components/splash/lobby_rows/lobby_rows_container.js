import { connect } from 'react-redux';
import LobbyRows from './lobby_rows';
import { getValidGames } from '../../../actions/game_action';

const msp = (state, ownProps) => {
    return {
        games: state.entities.games
    };
};

const mdp = dispatch => {
    return {
        getValidGames: () => dispatch(getValidGames())
    }
}

export default connect(msp, mdp)(LobbyRows);