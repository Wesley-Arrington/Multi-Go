import { NEW_CHAT } from '../actions/chat_action';

function chatReducer(state = initialState, action) {

    switch (action.type) {
        case NEW_CHAT:
            return {
                ...state,
                messages: action.message
            }
        default:
            return state
    }
}

export default chatReducer;