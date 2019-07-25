export const getChannelId = (channel, prevChannel) => {
    return async (dispatch, getState) => {
        const { channelsPlayed } = getState()
        const response = await fetch(`/api/channels/${channel}`)
        const channelResponse = await response.json()
        if (!channelsPlayed.some(channel => channel.channelId === channelResponse.channelId)) {
            if (channelsPlayed.length < 20) {
                channelsPlayed.push(channelResponse)
            } else {
                channelsPlayed.shift()
                channelsPlayed.push(channelResponse)
            }
        }
        dispatch(setChannelId(channelResponse, prevChannel, channelsPlayed))
    }
}

export const setChannelId = (channel, prevChannel, channelsPlayed) => ({
    type: 'SET_CHANNEL_ID',
    channel,
    prevChannel,
    channelsPlayed,
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
        const { channel: currentChannel, channels, prevChannel, channelsPlayed } = getState()
        if (type === 'normal') {
            dispatch(getChannelId(channel, currentChannel))
        } else if (type === 'random') {
            const randomChannel = randomChoice(channels, channelsPlayed)[1]
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
    return async (dispatch, getState) => {
        const { channelsPlayed } = getState()
        const response = await fetch(`/api/channels/`)
        const channelsResponse = await response.json()
        dispatch(setChannels(channelsResponse))
        dispatch(getChannelId(randomChoice(channelsResponse, channelsPlayed)[1]))
    }
}

export const setChannels = (channels) => ({
    type: 'SET_CHANNELS',
    channels
})

export const updateChannel = (channel) => {
    return ({
        type: 'UPDATE_CHANNEL',
        channel
    })
}

export const updateIndexToPlay = (channel, forward) => {
    return async (dispatch) => {
        const amount = forward ? 1 : -1
        dispatch(updateChannel({...channel, indexToShow: channel.indexToShow+amount}))
    }
}

export const setIndex = (videoIndexToPlay) => {
    return (dispatch, getState) => {
        const { channel } = getState()
        dispatch(updateChannel({...channel, indexToShow: videoIndexToPlay}))
    }
}

const randomChoice = (channels, channelsPlayed) => {
    const filteredChannels = channels.filter(channel => !channelsPlayed.some(c => c.channelId === channel[1]))
    const index = Math.floor(Math.random() * filteredChannels.length)
    const item = filteredChannels[index]
    return item
}