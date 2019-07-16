import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, withRouter } from 'react-router-dom';


// Passed in from parent component or from mapStateToProps
const Auth = ({ component: Component, path, loggedIn, exact }) => (
    <Route path={path} exact={exact} render={(props) => (
        !loggedIn ? (
            <Component {...props} />
        ) : (
            // Redirect to the tweets page if the user is authenticated
            <Redirect to="/" />
        )
    )} />
);

const Protected = ({ component: Component, loggedIn, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            loggedIn ? (
                <Component {...props} />
            ) : (
                // Redirect to the login page if the user is already authenticated
                <Redirect to="/" />
            )
        }
    />
);

// Use the isAuthenitcated slice of state to determine whether a user is logged in

const mapStateToProps = state => (
    { loggedIn: state.session.isAuthenticated }
);

export const AuthRoute = withRouter(connect(mapStateToProps)(Auth));

export const ProtectedRoute = withRouter(connect(mapStateToProps)(Protected));



// KC: looks like FSP 

// const mapStateToProps = state => ({
//     loggedIn: Boolean(state.session.currentUser),
// });

// const Auth = ({ component: Component, path, loggedIn }) => (
//     <Route
//         path={path}
//         render={props => (
//             loggedIn ? <Redirect to="/" /> : <Component {...props} />
//         )}
//     />
// );

// const Protected = ({ component: Component, path, loggedIn }) => (
//     <Route
//         path={path}
//         render={props => (
//             loggedIn ? <Component {...props} /> : <Redirect to="/signup" />
//         )}
//     />
// );

// export const AuthRoute = withRouter(connect(mapStateToProps)(Auth));
// export const ProtectedRoute = withRouter(connect(mapStateToProps, undefined)(Protected));
