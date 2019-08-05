import { connect } from 'react-redux';

import Lobby from './lobby';

const msp = state => {

    return {
        gameId: state.entities.games.game_id
    }
}

export default connect(msp, null)(Lobby);