import React, { Component } from 'react'

export default class CloseIcon extends Component {
    render() {
        return (
            <div className="close-icon-div">
                <svg className="close-icon">
                    <path d="M9.886 8l5.724-5.724A1.335 1.335 0 0 0 13.724.39L8 6.114 2.276.39A1.333 1.333 0 0 0 .39 2.276L6.115 8 .39 13.724a1.333 1.333 0 1 0 1.885 1.886L8 9.886l5.724 5.724a1.332 1.332 0 0 0 1.886 0c.52-.52.52-1.366 0-1.886L9.886 8z">
                    </path>
                </svg>
            </div>
        )
    }
}
