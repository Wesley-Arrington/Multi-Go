import { connect } from 'react-redux';
import LoggedInOptions from './logged_in_options';
import { openModal } from '../../actions/modal_action';
import { fetchGame } from '../../actions/game_action';
import { withRouter } from 'react-router-dom';


const mapStateToProps = (state, ownProps) => {

    return {
        game: state.entities.game,
        currentUser: state.session.user,
        currentGameId: state.entities.game.id
    };
};

const mapDispatchToProps = dispatch => ({
    openModal: (modal) => dispatch(openModal(modal)),
    fetchGame: (id) => dispatch(fetchGame(id))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoggedInOptions));
