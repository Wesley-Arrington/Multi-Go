import { connect } from 'react-redux';
import { createGame } from '../../actions/game_action';
import Game from './game';

const msp = state => {

}

const mdp = dispatch => {

    return {
        newGame: (data) => dispatch(createGame(data))
    }
}

export default connect(null, mdp)(Game);