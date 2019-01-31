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
    menuIconButton: {
        marginLeft: 12,
        marginRight: 28,
        color: 'white',
        opacity: 0.6,
        "&:hover": {
            backgroundColor: "transparent"
        }
    },
    iconButton: {
        color: 'white',
        opacity: 0.6,
        "&:hover": {
            backgroundColor: "transparent"
        }
    },
    icon: {
        fontSize: 36,
    },
    title: {
        float: 'right',
        display: 'inline',
        paddingTop: 1,
        paddingRight: 55,
        fontSize: 36,
        color: 'white',
        textDecoration:'none',
        opacity: 0.6,
        [theme.breakpoints.down('xs')]: {
            marginLeft: 24,
            marginBottom: 24,
        },
    },
    paper: {
        background: '#111111',
        opacity: 0.8,
        width: 340
    },
    listTitles: {
        color: 'white',
        opacity: 0.7,
        fontSize: 23,
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
                    {this.props.channels.map((channel) => (
                    <ListItem button key={channel.channelTitle} onClick={() => this.setChannel(channel, 'normal')}>
                        <ListItemText primary={channel.channelTitle.toUpperCase()} classes={{primary: classes.listTitles}} />
                    </ListItem>
                    ))}
                </List>
            </Fragment>
        )
            
        return (
            <Fragment>
                <Grid container justify="space-between" alignItems="center">
                    <Grid item xs={12} sm={6}>
                        <IconButton className={classes.menuIconButton} onClick={() => this.handleClick()} disableRipple={true}>
                            <Menu className={classes.icon}/>
                        </IconButton>
                        {this.state.prevChannel ? 
                            <IconButton className={classes.iconButton} onClick={() => this.setChannel(null, 'previous')} disableRipple={true}>
                                <Undo className={classes.icon}/>
                            </IconButton>
                            :
                            <IconButton className={classes.iconButton} disabled={true} disableRipple={true}>
                                <Undo className={classes.icon}/>
                            </IconButton>
                        }
                        <IconButton className={classes.iconButton} onClick={() => this.setChannel(null, 'random')} disableRipple={true} >
                            <Casino className={classes.icon}/>
                        </IconButton>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h4" component="a" href={`https://www.youtube.com/channel/${this.props.channel.channelId}`} className={classes.title}>
                            {this.props.channel.channelTitle.toUpperCase()}
                        </Typography>
                        {/* {this.props.video ? 
                        <Typography variant="subtitle1" component="a" href={`https://www.youtube.com/watch?v=${this.props.video.videoId}`} className={classes.subtitle}>
                            {this.props.video.title}
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
  channel: state.channel,
  video: state.video
})

const mapDispatchToProps = dispatch => ({
    setChannelId: (channelID) => dispatch(setChannelId(channelID))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ChannelDrawer))
