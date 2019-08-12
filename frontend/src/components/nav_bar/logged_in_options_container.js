import { connect } from 'react-redux';
import LoggedInOptions from './logged_in_options';
import { openModal } from '../../actions/modal_action';
import { withRouter } from 'react-router-dom';


const mapStateToProps = (state, ownProps) => {

    return {
        // isLoggedIn: state.session.isAuthenticated,
        currentUser: state.session.user,
        currentGameId: state.entities.game.id
    };
};

const mapDispatchToProps = dispatch => ({
    // createNewUser: formUser => dispatch(createNewUser(formUser)),
    openModal: (modal) => dispatch(openModal(modal))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoggedInOptions));
