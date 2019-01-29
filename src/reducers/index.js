import data from '../data.json'

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

data.map((d) => {
    shuffleArray(d.videos)
})

const initialState = {
    channels: data,
    channel: randomChoice(data)
}

function randomChoice(array) {
    const index = Math.floor(Math.random() * array.length)
    const item = array[index]
    return item
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CHANNEL_ID':
            return {
                ...state, 
                channel: action.channel,
                channelId: action.channel.channelName
            }
        case 'SET_VIDEO':
            return {
                ...state, 
                video: action.video
            }

        default:
        return (state)
    }
}

export default rootReducer
  