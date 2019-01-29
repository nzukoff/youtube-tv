const fetch = require('node-fetch')
const fs = require('fs')
const moment = require('moment')
// import moment from 'moment';

const getData = async (channels) => {

        const key = process.env.YT_KEY

        async function getChannelInfo(channelName) {
            let data 
            const channelURL = `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forUsername=${channelName}&key=${key}`
            const channelResponse = await fetch(channelURL)
            const channelInfo = await channelResponse.json()
            const channelId = channelInfo.items[0].id
            const uploadsPlaylistId = channelInfo.items[0].contentDetails.relatedPlaylists.uploads
            const uploadsURL = `https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${uploadsPlaylistId}&key=${key}&part=snippet&maxResults=50`
            const uploadsResponse = await fetch(uploadsURL)
            const uploadsInfo = await uploadsResponse.json()
            const numVideos = uploadsInfo.pageInfo.totalResults
            const channelTitle = uploadsInfo.items[0].snippet.channelTitle
            
            data = uploadsInfo.items

            async function getData(videos, nextPageToken) {
                const nextPageResponse = await fetch(uploadsURL+`&pageToken=${nextPageToken}`)
                const nextPageInfo = await nextPageResponse.json()
                videos = videos.concat(nextPageInfo.items)
                return (nextPageInfo.items.length === 50) ? await getData(videos, nextPageInfo.nextPageToken) : videos
            }

            if (uploadsInfo.nextPageToken) {
                data = await getData(data, uploadsInfo.nextPageToken)
            }
            
            let videosFromChannel  = await Promise.all(data.map(async (item) => {
                const videoId = item.snippet.resourceId.videoId
                const videoURL = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=contentDetails&key=${key}`
                const videosResponse = await fetch(videoURL)
                const videoInfo = await videosResponse.json()
                return {
                    videoId,
                    title: item.snippet.title,
                    description: item.snippet.description,
                    thumbnail: item.snippet.thumbnails.standard,
                    duration: videoInfo.items[0].contentDetails.duration
                }
            }))

            const totalDuration = videosFromChannel.reduce((acc, video) => {
                acc+=moment.duration(video.duration)._milliseconds/1000
                return acc
            },0)

            return {
                channelTitle,
                channelName, 
                channelId, 
                numVideos, 
                totalDuration,
                // data,
                videos: videosFromChannel,
            }
        }

        const channelsInfo = await Promise.all(channels.map(async (channelName) => {
            return await getChannelInfo(channelName)
        }))

        const JSONChannelsInfo = JSON.stringify(channelsInfo, null, 2)
        
        fs.writeFile('./src/data.json', JSONChannelsInfo, function(err) {
            if(err) {
                return console.log(err);
            }
        
            console.log("The file was saved!");
        }); 
    }
  
const channels = [`destinws2`, `theslowmoguys`, `Kurzgesagt`, `enyay`, `TEDEducation`, `TEDtalksDirector`, `wired`, `vice`, `BonAppetitDotCom`, `corycotton`, `Vsauce`, `numberphile`, `AsapSCIENCE`, `keeroyz`, `1veritasium`, `minutephysics`, `DJparadiddle`, `PomplamooseMusic`]
// const channels = [`nzukoff`]

getData(channels)