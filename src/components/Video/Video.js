import React, { Component } from 'react';
import { connect } from 'react-redux'
import { timingSafeEqual } from 'crypto';

// import { getInfo } from '../../actions/index'

// import { Paper, Grid, Card, CardMedia } from '@material-ui/core'
// import PlayArrowIcon from '@material-ui/icons/PlayArrow'
// import { withStyles } from '@material-ui/core/styles'

let loadYT

export class Video extends Component {
    constructor(props) {
        super(props)
        this.init()
        const videoIdList = this.props.channel.videos.map((vid)=>{
            return vid.videoId
        })

        window['onYouTubeIframeAPIReady'] = (e) => {
            this.YT = window['YT']
            this.player = new window['YT'].Player('player', {
                videoId: videoIdList.splice(0,1)[0],
                playerVars: {playlist:videoIdList.join(',')},
                events: {
                // 'onStateChange': this.onPlayerStateChange,
                'onReady': this.onPlayerReady
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

    onPlayerReady = (event) => {
        event.target.playVideo();
    }

    onPlayerStateChange = (e) => {
        let done = false
        if (e.data === this.YT.PlayerState.PLAYING && !done) {
            setTimeout(this.stopVideo, 3000);
            done = true;
        }
    }

    stopVideo = () => {
        this.player.stopVideo()
    }

    loadPlaylist = (channel) => {
        const videoIdList = channel.videos.map((vid)=>{
            return vid.videoId
        })

        this.player.loadPlaylist({
            playlist:videoIdList
            // listType:'playlist',
            // index:Number,
            // startSeconds:Number,
            // suggestedQuality:String
        })
    }

    render() {     
        return (
            <div className="Video">
                <h1>{this.props.channel.channelTitle}</h1>
                {this.props.channelId ? this.loadPlaylist(this.props.channel) : ''}
                <div id="player"></div>
            </div>
        )
    }    
}

const mapStateToProps = state => ({
    channels: state.channels, 
    channelId: state.channelId,
    channel: state.channel
})

const mapDispatchToProps = dispatch => ({
//   getInfo: () => dispatch(getInfo())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Video)