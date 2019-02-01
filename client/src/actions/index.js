export const getChannelId = (channel) => {
    return async (dispatch) => {
        const response = await fetch(`/api/channels/${channel}`)
        const channelResponse = await response.json()
        dispatch(setChannelId(channelResponse))
    }
}

export const setChannelId = (channel) => ({
    type: 'SET_CHANNEL_ID',
    channel,
    meta: {
        mixpanel: {
            event: 'Load Channel',
            props: {
                channel: channel.channelTitle
            }
        }
    }
})

export const setVideo = (video) => ({
    type: 'SET_VIDEO',
    video
})

export const getChannels = () => {
    return async (dispatch) => {
        const response = await fetch(`/api/channels/`)
        const channelsResponse = await response.json()
        dispatch(setChannels(channelsResponse))
        dispatch(getChannelId(randomChoice(channelsResponse)[1]))
    }
}

export const setChannels = (channels) => ({
    type: 'SET_CHANNELS',
    channels
})

const randomChoice = (array) => {
    const index = Math.floor(Math.random() * array.length)
    const item = array[index]
    return item
}