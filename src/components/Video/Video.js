import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import { setVideo } from '../../actions/index'

import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
    video: {
      width: '100%',
      paddingTop: '13px'
    }
})

export class Video extends Component {
    constructor(props) {
        super(props)
        this.init()
        this.index = 1
        const {startTime, videoIndexToPlay} = this.findStartVideoAndTime(this.props.channel)
        this.videoIndexToPlay = videoIndexToPlay
        window['onYouTubeIframeAPIReady'] = (e) => {
            this.YT = window['YT']
            this.player = new window['YT'].Player('player', {
                videoId: this.props.channel.videos[this.videoIndexToPlay].videoId,
                playerVars: {
                    // playlist:videoIdList.join(','), 
                    start: startTime, 
                    controls:1, 
                    iv_load_policy:3, 
                    modestbranding:1
                },
                width: 1088,
                height: 663,
                events: {
                'onStateChange': this.onPlayerStateChange,
                'onReady': () => this.onPlayerReady(this.props.channel.videos[this.videoIndexToPlay])
                //   (e) => {
                //     if (!this.reframed) {
                //       this.reframed = true;
                //       reframe(e.target.a);
                //       this.onPlayerReady
                //     }
                //   }
                }
            })
        }
    }

    init = () => {
        var tag = document.createElement('script')
        tag.src = 'https://www.youtube.com/iframe_api'
        var firstScriptTag = document.getElementsByTagName('script')[0]
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
    }

    onPlayerReady = (title) => {
        this.props.setVideo(title)
        this.player.playVideo()
    }

    onPlayerStateChange = (e) => {
        // let done = false
        // if (e.data === this.YT.PlayerState.PLAYING && !done) {
        //     setTimeout(this.stopVideo, 1000);
        //     done = true;
        // }
        if (e.data === this.YT.PlayerState.ENDED) {    
            if (this.index+this.videoIndexToPlay === this.props.channel.videos.length) {
                this.index = 0
                this.videoIndexToPlay = 0
            } 
            this.player.loadVideoById({
                videoId:this.props.channel.videos[this.videoIndexToPlay+this.index].videoId
                
            })
            this.index++
        }
    }

    stopVideo = () => {
        this.player.stopVideo()
    }

    findStartVideoAndTime = (channel) => {
        const currentTime = Math.floor(new Date().getTime()/1000)
        const startPlaylistTime = currentTime % channel.totalDuration
        let timeIntoPlaylist = 0
        let i = 0
        let vidDuration
        while (timeIntoPlaylist <= startPlaylistTime) {
            vidDuration = moment.duration(channel.videos[i].duration)/1000
            timeIntoPlaylist += moment.duration(channel.videos[i].duration)/1000
            i++
        }
        timeIntoPlaylist -= vidDuration
        const startTime = startPlaylistTime - timeIntoPlaylist
        const videoIndexToPlay = i-1
        return {startTime, videoIndexToPlay}
    }

    loadNewChannel = () => {
        const {startTime, videoIndexToPlay} = this.findStartVideoAndTime(this.props.channel)
        this.videoIndexToPlay = videoIndexToPlay
        this.index = 1
        this.props.setVideo(this.props.channel.videos[videoIndexToPlay])

        this.player.loadVideoById({
            videoId:this.props.channel.videos[this.videoIndexToPlay].videoId,
            startSeconds: startTime
        })
    }

    render() {     
        const { classes } = this.props
        return (
            <Fragment >
                {this.props.channelId ? this.loadNewChannel() : ''}
                <div id="player" className={classes.video}></div>
            </Fragment>
        )
    }    
}

const mapStateToProps = state => ({
    channels: state.channels, 
    channelId: state.channelId,
    channel: state.channel
})

const mapDispatchToProps = dispatch => ({
    setVideo: (video) => dispatch(setVideo(video))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Video))