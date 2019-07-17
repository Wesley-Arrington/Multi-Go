import { connect } from 'react-redux';
import { patchGame } from '../../../actions/game_action';
import { fetchGame } from '../../../actions/game_action';

import GameBoardButton from './game_board_button';

const msp = state => {

    return {
        game_id: state.entities.games.game_id,
        player_ids: state.entities.games.player_ids,
        grid: state.entities.games.grid,
        turn: state.entities.games.turn,
        user_id: state.session.user.id
    }
}

const mdp = dispatch => {
    return {
        makeMove: (game_id, grid) => dispatch(patchGame(game_id, grid)),
        getGame: (id) => dispatch(fetchGame(id))
    }
}

export default connect(msp, mdp)(GameBoardButton);