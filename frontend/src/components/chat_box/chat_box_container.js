import { connect } from 'react-redux';
import ChatBox from './chat_box';

const mapStateToProps = (state, ownProps) => {

    return {
        // isLoggedIn: state.session.isAuthenticated,
        currentUser: state.session.user
    };
};

const mapDispatchToProps = dispatch => ({
    // createNewUser: formUser => dispatch(createNewUser(formUser)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatBox);
