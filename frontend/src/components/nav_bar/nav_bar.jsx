import React, { Component } from 'react'
// import LeftNavBarItems from './left_nav_bar_items';
// import DropDown from './drop_down/user_drop_down_options'
import RightNavBarItemsContainer from './right_nav_bar_items_container'
// import Modal from './modal'
import './nav_bar.css';

export default class NavBar extends Component {
    render() {
        return (
            <div className = "nav-bar">
                <RightNavBarItemsContainer />
            </div>
        )
    }
}
