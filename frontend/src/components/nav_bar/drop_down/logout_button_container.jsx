import { connect } from 'react-redux';
import { logout } from '../../../actions/session_actions';
import Logout from './logout_button';

// const mapStateToProps = ({ errors }, ownProps) => {
//     return {
//         renderRightNavBarItems: ownProps.renderRightNavBarItems
//     };
// };

const mapDispatchToProps = (dispatch, ownProps) => ({
    logout: formUser => dispatch(logout())
});

export default connect(null, mapDispatchToProps)(Logout);
