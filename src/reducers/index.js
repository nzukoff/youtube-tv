const initialState = {
    videos: []
  }
  
const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GOT_INFO':
        console.log("IN REDUCER")
        return {
            ...state
        }

        default:
        return (state)
    }
}

export default rootReducer
  