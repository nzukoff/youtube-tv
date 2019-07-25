const initialState = {
    channelsPlayed: []
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CHANNEL_ID':
            return {
                ...state, 
                channel: action.channel,
                prevChannel: action.prevChannel,
                channelsPlayed: action.channelsPlayed
            }
        case 'SET_VIDEO':
            return {
                ...state, 
                video: action.video
            }
        case 'SET_CHANNELS':
            return {
                ...state,
                channels: action.channels
            }
        case 'UPDATE_CHANNEL':
            return {
                ...state,
                channel: action.channel
            }
        default:
        return (state)
    }
}

export default rootReducer
  