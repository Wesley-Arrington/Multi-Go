import { connect } from 'react-redux';

import Players from './players';

const msp = state => {
    return {
        game: state.entities.game
    }
}

const mdp = dispatch => {
    return {
        // 1. fetch the game information
        // 2. patch the DB with 2nd player id
    }
}

export default connect(msp, null)(Players);