import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import { 
    IconButton, 
    List,
    ListItem,
    ListItemText,
    Drawer,
    Grid,
    Typography
} from '@material-ui/core'

import Menu from '@material-ui/icons/Menu'
import Casino from '@material-ui/icons/Casino'
import Undo from '@material-ui/icons/Undo'

import { setChannelId } from '../../actions/index'

import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  menu: {
    color: 'white',
    position: 'fixed',
    top: 0,
    left: 10,
    opacity: 0.5,
    paddingTop: '11px',
    "&:hover": {
        backgroundColor: "transparent"
    }
  },
  title: {
    textAlign: 'right',
    paddingRight: '50px',
    color: 'white',
    textDecoration:'none',
    // paddingTop: '13px',
    opacity: 0.6
  },
  menuIcon: {
    height: 30,
    width: 30
  },
  paper: {
      background: '#111111',
      width: '20%'
  },
  listTitles: {
      color: 'white',
      opacity: 0.6
  },
  random: {
    color: 'white',
    opacity: 0.6,
    paddingTop: '11px',
    "&:hover": {
        backgroundColor: "transparent"
    }
  },
  randomIcon: {
    height: 30,
    width: 30
  },
  randomGrid: {
      textAlign: 'right'
  },
  undo: {
    color: 'white',
    opacity: 0.6,
    paddingTop: '11px',
    "&:hover": {
        backgroundColor: "transparent"
    }
  },
  undoIcon: {
    height: 30,
    width: 30
  },
})

export class ChannelDrawer extends Component {
    constructor(props) {
        super(props)

        this.state = {drawerOpen: false, prevChannel: undefined}
    }

    handleClick = () => {
        this.setState({drawerOpen: true})
    }

    toggleDrawer = () => {
        this.setState({drawerOpen: false})
    }
    
    randomChoice = (array) => {
        const index = Math.floor(Math.random() * array.length)
        const item = array[index]
        return item
    }

    setChannel = (channel, type) => {
        if (type === 'normal') {
            this.setState({prevChannel: this.props.channel})
            this.props.setChannelId(channel)
        } else if (type === 'random') {
            const randomChannel = this.randomChoice(this.props.channels)
            this.setState({prevChannel: this.props.channel})
            this.props.setChannelId(randomChannel)
        } else if (type === 'previous') {
            this.setState({prevChannel: this.props.channel})
            this.props.setChannelId(this.state.prevChannel)
        }
    }

    render() {
        const { classes } = this.props

        const sideList = (
            <Fragment>
                <List>
                    {this.props.channels.map((channel, index) => (
                    <ListItem button key={channel.channelName} onClick={() => this.setChannel(channel, 'normal')}>
                        <ListItemText primary={channel.channelTitle.toUpperCase()} classes={{primary: classes.listTitles}} />
                    </ListItem>
                    ))}
                </List>
            </Fragment>
        )
            
        return (
            <Fragment>
                <Grid container alignItems='center'>
                    <Grid item xs={1} >
                        <IconButton className={classes.menu} onClick={() => this.handleClick()} disableRipple={true}>
                            <Menu className={classes.menuIcon}/>
                        </IconButton>
                    </Grid>
                    <Grid item xs={2} >
                        {this.state.prevChannel ? 
                            <IconButton className={classes.undo} onClick={() => this.setChannel(null, 'previous')} disableRipple={true}>
                                <Undo className={classes.undoIcon}/>
                            </IconButton>
                            :
                            <IconButton className={classes.undo} disabled={true} disableRipple={true}>
                                <Undo className={classes.undoIcon}/>
                            </IconButton>
                        }
                        <IconButton className={classes.random} onClick={() => this.setChannel(null, 'random')} disableRipple={true} >
                            <Casino className={classes.randomIcon}/>
                        </IconButton>
                    </Grid>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={5}  >
                        <Typography variant="h4" component="a" href={`https://www.youtube.com/user/${this.props.channel.channelName}`} className={classes.title}>
                            {this.props.channel.channelTitle.toUpperCase()}
                        </Typography>
                        {/* {props.video ? 
                        <Typography variant="subtitle1" component="a" href={`https://www.youtube.com/watch?v=${props.video.videoId}`} className={classes.subtitle}>
                            {props.video.title}
                        </Typography>
                        : ''} */}
                    </Grid>
                </Grid>
                
                <Drawer 
                    anchor="left" 
                    open={this.state.drawerOpen} 
                    classes={{paper: classes.paper}}
                    onClose={() => this.toggleDrawer()}>
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={() => this.toggleDrawer()}
                        
                    >
                        {sideList}
                    </div>
                </Drawer>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
  channels: state.channels,
  channel: state.channel
})

const mapDispatchToProps = dispatch => ({
    setChannelId: (channelID) => dispatch(setChannelId(channelID))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ChannelDrawer))
