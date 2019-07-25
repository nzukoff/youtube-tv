import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import { 
    IconButton, 
    Grid
} from '@material-ui/core'

import ChevronRight from '@material-ui/icons/ChevronRight'
import ChevronLeft from '@material-ui/icons/ChevronLeft'

import { updateIndexToPlay } from '../../actions/index'

import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
    iconButton: {
        color: 'white',
        opacity: 0.6,
        padding: 0,
        float: 'right',
        paddingRight: 24,
        "&:hover": {
            backgroundColor: "transparent"
        }
    },
    icon: {
        fontSize: 34,
    },
})

export class ChannelControls extends Component {
    render() {
        const { classes } = this.props
        return (
            <Fragment>
                <Grid container justify="flex-end" alignItems="center">
                    <Grid item xs={6}>
                      <IconButton className={classes.iconButton} onClick={() => this.props.updateIndexToPlay(this.props.channel, false)} disableRipple={true} >
                        <ChevronLeft className={classes.icon}/>
                      </IconButton>
                    </Grid>
                    <Grid item xs={6}>
                      <IconButton className={classes.iconButton} onClick={() => this.props.updateIndexToPlay(this.props.channel, true)} disableRipple={true} >
                        <ChevronRight className={classes.icon}/>
                      </IconButton>
                    </Grid>
                </Grid>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
  channels: state.channels,
  channel: state.channel,
  video: state.video, 
  prevChannel: state.prevChannel
})

const mapDispatchToProps = dispatch => ({
  updateIndexToPlay: (channel, forward) => dispatch(updateIndexToPlay(channel, forward))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ChannelControls))
