import React from 'react';
import { connect } from 'react-redux'

import './App.css';
import Video from './components/Video/Video'
import ChannelDrawer from './components/ChannelDrawer/ChannelDrawer'
// import { addVideo } from './actions/index'


export const App = (props) => {
  return (
    <div className="App">
      <ChannelDrawer />
      <Video />
    </div>
  );
}

// const mapStateToProps = state => ({view: state.view})

// const mapDispatchToProps = dispatch => ({
//   addVideo: () => dispatch(addVideo())
// })

export default connect(
  null,
  null
)(App)
