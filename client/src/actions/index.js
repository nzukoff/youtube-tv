export const getChannelId = (channel, prevChannel) => {
    return async (dispatch) => {
        const response = await fetch(`/api/channels/${channel}`)
        const channelResponse = await response.json()
        dispatch(setChannelId(channelResponse, prevChannel))
    }
}

export const setChannelId = (channel, prevChannel) => ({
    type: 'SET_CHANNEL_ID',
    channel,
    prevChannel,
    meta: {
        mixpanel: {
            event: 'Load Channel',
            props: {
                channel: channel.channelTitle
            }
        }
    }
})

export const chooseChannel = (channel, type) => {
    return (dispatch, getState) => {
        const { channel: currentChannel, channels, prevChannel } = getState()
        if (type === 'normal') {
            dispatch(getChannelId(channel, currentChannel))
        } else if (type === 'random') {
            const randomChannel = randomChoice(channels)[1]
            dispatch(getChannelId(randomChannel, currentChannel))
        } else if (type === 'previous') {
            dispatch(getChannelId(prevChannel.channelId, currentChannel))
        }
    }
}

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