import React, { Component } from 'react'
// import UserDropDownOption from './user_drop_down_option'
import LogoutButtonContainer from './logout_button_container'
// import ProfileButton from './profile_button'

export default class UserDropDownOptions extends Component {
    render() {

        return (
            <div className="drop-down-menu-visable">
                {/* <UserDropDownOption title={"My Campaigns"} /> */}
                {/* <UserDropDownOption title={"My Contributions"} /> */}
                {/* <ProfileButton /> */}
                <LogoutButtonContainer />
            </div>
        )
    }
}
