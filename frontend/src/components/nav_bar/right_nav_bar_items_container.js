import { connect } from 'react-redux';
// import { logout } from '../../actions/session_actions';
import RightNavBarItems from './right_nav_bar_items';

const mapStateToProps = (state, ownProps) => {
    return {
        // currentUserId: state.session.currentUser
    };
};

export default connect(mapStateToProps, null)(RightNavBarItems);
