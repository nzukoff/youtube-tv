const initialState = {}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CHANNEL_ID':
        console.log("action ", action)
            return {
                ...state, 
                channel: action.channel,
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

        default:
        return (state)
    }
}

export default rootReducer
  