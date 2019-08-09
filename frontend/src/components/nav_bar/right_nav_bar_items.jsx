import React, { Component } from 'react'
import LoggedOutOptions from './logged_out_options'
import LoggedInOptionsContainer from './logged_in_options_container'

export default class RightNavBarItems extends Component {

    render() {
        // let currentSession = store.getState().session.isAuthenticated

        let { isLoggedIn } = this.props
        if (isLoggedIn) {
            return (
                <div className="right-nav-bar-items">
                    <LoggedInOptionsContainer />
                </div>
            )
        } else {
            return (
                <div className="right-nav-bar-items">
                    <LoggedOutOptions />
                </div>
            )
        }
        // return (
        //     <div className="right-nav-bar-items">
        //         < componentToRender />
        //         {/* <StartCampaign />
        //         <LoggedOutOptions /> */}
        //     </div>
        // )
    }
}
