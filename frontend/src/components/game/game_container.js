import { connect } from 'react-redux';
import { createGame, fetchGame } from '../../actions/game_action';
import Game from './game';

const msp = state => {
    // let gameId = ownProps.match.params.gameId;

    return {
        game: state.entities.game
    }
}

const mdp = dispatch => {
    return {
        newGame: (data) => dispatch(createGame(data)),
        // getGame: (id) => dispatch(fetchGame(id))
    }
}

export default connect(msp, mdp)(Game);