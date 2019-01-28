import React, { Component } from 'react'
import { connect } from 'react-redux'

import { 
    IconButton, 
    List,
    ListItem,
    ListItemText,
    Drawer
 } from '@material-ui/core'

import Menu from '@material-ui/icons/Menu'

import { setChannelId } from '../../actions/index'

import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  buttonText: {
    color: '#22a0ff',
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
            <div className={classes.list}>
                <List>
                    {this.props.channels.map((channel, index) => (
                    <ListItem button key={channel.channelName} onClick={() => this.props.setChannelId(channel)}>
                        <ListItemText primary={channel.channelTitle} />
                    </ListItem>
                    ))}
                </List>
            </div>
        )
            
        return (
        <div className="Share">
                <IconButton className={classes.buttonText} onClick={() => this.handleClick()} >
                    <Menu />
                </IconButton>
                <Drawer anchor="left" open={this.state.drawerOpen} onClose={() => this.toggleDrawer()}>
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={() => this.toggleDrawer()}
                    >
                        {sideList}
                    </div>
                </Drawer>
        </div>
        )
    }
}

const mapStateToProps = state => ({
  channels: state.channels
})

const mapDispatchToProps = dispatch => ({
    setChannelId: (channelID) => dispatch(setChannelId(channelID))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ChannelDrawer))
