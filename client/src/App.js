import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'

import './App.css';
import Video from './components/Video/Video'
import ChannelDrawer from './components/ChannelDrawer/ChannelDrawer'
import { withStyles } from '@material-ui/core/styles'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

import { getChannels } from './actions/index'

const theme = createMuiTheme({
  typography: { fontFamily: "'Questrial', sans-serif", useNextVariants: true }
})

const styles = theme => ({
  drawer: {
    textAlign: 'left'
  },
})

export class App extends Component {
  componentDidMount() {
    this.props.getChannels()
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div>
            {this.props.channel ? 
            <Fragment>
              <ChannelDrawer />
              <Video />
            </Fragment>
            : <Fragment></Fragment>
          }
        </div>
      </MuiThemeProvider>
  )};
}

const mapStateToProps = state => ({
  channel: state.channel,
  channels: state.channels,
  channelId: state.channelId,
  video: state.video
})

const mapDispatchToProps = dispatch => ({
  getChannels: () => dispatch(getChannels())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(App))
