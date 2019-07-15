import React, { Component } from 'react'
import LoggedOutOptions from './logged_out_options'
import LoggedInOptions from './logged_in_options'

export default class RightNavBarItems extends Component {



    render() {
        // let currentSession = store.getState().session.currentUser

        // let {currentUserId} = this.props
        // if (currentUserId !== null) {
        //     return (
        //         <div className="right-nav-bar-items">
        //             <LoggedInOptions />
        //         </div>
        //     )
        // } else {
            return (
                <div className="right-nav-bar-items">
                    <LoggedOutOptions />
                </div>
            )
        // }
        // return (
        //     <div className="right-nav-bar-items">
        //         < componentToRender />
        //         {/* <StartCampaign />
        //         <LoggedOutOptions /> */}
        //     </div>
        // )
    }
}
