export const NEW_CHAT = 'NEW_CHAT';

export const newChat = (message) => {
    return {
        type: NEW_CHAT,
        message: message.data
    }
}

export const createChat = (message) => dispatch => {
    return dispatch(newChat(message))
}