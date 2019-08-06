import { connect } from 'react-redux';
import LobbyRows from './lobby_rows';

const msp = (state, ownProps) => {
    return {
        games: Object.values(state.entities.games)
    };
};

export default connect(msp, null)(LobbyRows);