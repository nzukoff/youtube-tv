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

import { setChannelId } from '../../actions/index'

import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  menu: {
    color: 'white',
    position: 'fixed',
    top: 0,
    left: 0,
    opacity: 0.5
  },
  title: {
    textAlign: 'right',
    paddingRight: '50px',
    color: 'white',
    textDecoration:'none',
    paddingTop: '10px',
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
  }
})

export class ChannelDrawer extends Component {
    constructor(props) {
        super(props)

        this.state = {drawerOpen: false}
    }

    handleClick = () => {
        this.setState({drawerOpen: true})
    }

    toggleDrawer = () => {
        this.setState({drawerOpen: false})
    }

    render() {
        const { classes } = this.props

        const sideList = (
            <Fragment>
                <List>
                    {this.props.channels.map((channel, index) => (
                    <ListItem button key={channel.channelName} onClick={() => this.props.setChannelId(channel)}>
                        <ListItemText primary={channel.channelTitle} classes={{primary: classes.listTitles}} />
                    </ListItem>
                    ))}
                </List>
            </Fragment>
        )
            
        return (
        <Fragment>
            <Grid container >
                <Grid item xs={1} className={classes.drawer} >
                    <IconButton className={classes.menu} onClick={() => this.handleClick()} >
                        <Menu className={classes.menuIcon}/>
                    </IconButton>
                </Grid>
                <Grid item xs={5}  ></Grid>
                <Grid item xs={6}  >
                    <Typography variant="h5" component="a" href={`https://www.youtube.com/user/${this.props.channel.channelName}`} className={classes.title}>
                        {this.props.channel.channelTitle}
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
                // className={classes.list} 
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
