import React, { Component } from 'react';
import { connect } from 'react-redux'

import { getInfo } from '../../actions/index'

// import { Paper, Grid, Card, CardMedia } from '@material-ui/core'
// import PlayArrowIcon from '@material-ui/icons/PlayArrow'
// import { withStyles } from '@material-ui/core/styles'


export class Video extends Component {
    render() {
        return (
            <div className="Video">
                <h1>HELLO</h1>
            </div>
        )
    }

    componentDidMount() {
        this.props.getInfo()
    }
    
}

const mapStateToProps = state => ({
//   videos: state.videos
})

const mapDispatchToProps = dispatch => ({
  getInfo: () => dispatch(getInfo())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Video)