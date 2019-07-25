const fetch = require('node-fetch')
const fs = require('fs')
const moment = require('moment')

const getData = async (channels) => {

    const key = process.env.REACT_APP_YT_KEY
    // let channelFetchErrors = []
    // let channelJsonErrors = []
    // let videoFetchErrors = []
    // let videoJsonErrors = []
    let errors = []

    async function getChannelInfo(channelId) {

        const channelURL = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=50&order=viewCount&key=${key}&type=video`
            console.log("CU ", channelURL)
            const channelResponse = await fetch(channelURL)
            const channelInfo = await channelResponse.json()
            // let channelResponse
            // try {
            //     channelResponse = await fetch(channelURL)
            // } catch (error) {
            //     channelFetchErrors.push(error)
            // }
            // let channelInfo 
            // try {
            //     channelInfo = await channelResponse.json()
            // } catch (error) {
            //     channelJsonErrors.push(error)
            // }
            // console.log("cr", channelInfo)
            const channelTitle = channelInfo.items[0].snippet.channelTitle
            
            let videos = []
    
            channelInfo.items.map((item) => {
                if (item.id.kind === 'youtube#video'){
                    videos.push(item)
                } 
            })
        

        async function getData(videos, nextPageToken) {
            const nextPageResponse = await fetch(channelURL+`&pageToken=${nextPageToken}`)
            const nextPageInfo = await nextPageResponse.json()
            nextPageInfo.items.map((item) => {
                if (item.id.kind === 'youtube#video'){
                    videos.push(item)
                } 
            })
            return (nextPageInfo.items.length === 50) ? await getData(videos, nextPageInfo.nextPageToken) : videos
        }

        if (channelInfo.nextPageToken) {
            videos = await getData(videos, channelInfo.nextPageToken)
        }

        const numVideos = videos.length

        let videosFromChannel  = await Promise.all(videos.map(async (item) => {
            const videoId = item.id.videoId
            const videoURL = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=contentDetails&key=${key}`
            const videosResponse = await fetch(videoURL)
            const videoInfo = await videosResponse.json()
            // let videosResponse
            // try {
            //     videosResponse = await fetch(videoURL)
            // } catch (error) {
            //     // console.log(error, videoURL)
            //     videoFetchErrors.push(error)
            // }
            // let videoInfo
            // try {
            //     videoInfo = await videosResponse.json()
            // } catch (error) {
            //     // console.log(error, videoURL)
            //     videoJsonErrors.push(error)
            // }
            // const videoInfo = await videosResponse.json()
            return {
                videoId,
                title: item.snippet.title.replace("&#39;", "\'")
                    .replace(/&quot;/g, "\'")
                    .replace("&amp;", "\&"),
                thumbnail: item.snippet.thumbnails.high,
                duration: videoInfo.items[0].contentDetails.duration
            }
        }))

        


        const totalDuration = videosFromChannel.reduce((acc, video) => {
            acc+=moment.duration(video.duration)._milliseconds/1000
            return acc
        },0)

        function shuffleArray(array) {
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
        }

        shuffleArray(videosFromChannel)

        

        return {
            channelTitle,
            channelId, 
            numVideos, 
            totalDuration,
            videos: videosFromChannel
        }
    }

    const channelIds = []
    for (let key in channels) {
        channelIds.push(channels[key])
    }

    const channelsInfo = await Promise.all(channelIds.map(async (channelId) => {
        try {
            return await getChannelInfo(channelId)
        } catch (error) {
            errors.push(error)
        }
    }))

    filteredChannelsInfo = channelsInfo.filter(channel => channel)

    const JSONChannelsInfo = JSON.stringify(filteredChannelsInfo, null, 2)

    // console.log("CHANNEL FETCH ERRORS ", channelFetchErrors)
    // console.log("CHANNEL JSON ERRORS ", channelJsonErrors)
    // console.log("VIDEO FETCH ERRORS ", videoFetchErrors)
    // console.log("VIDEO JSON ERRORS ", videoJsonErrors)
    console.log("ERRORS ", errors)
    
    fs.writeFile('./src/main/resources/static/data.json', JSONChannelsInfo, function(err) {
        if(err) {
            return console.log(err);
        }
    
        console.log("The file was saved!");
    }); 


}

const channels = { 
    destinws2: 'UC6107grRI4m0o2-emgoDnAA',
    theslowmoguys: 'UCUK0HBIBWgM2c4vsPhkYY4w',
}
    // Kurzgesagt: 'UCsXVk37bltHxD1rDPwtNM8Q',
    // enyay: 'UCBa659QWEk1AI4Tg--mrJ2A',
    // TEDEducation: 'UCsooa4yRKGN_zEE8iknghZA',
    // TEDtalksDirector: 'UCAuUUnT6oDeKwE6v1NGQxug',
    // wired: 'UCftwRNsjfRo08xYE31tkiyw',
    // vice: 'UCn8zNIfYAQNdrFRrr8oibKw',
    // BonAppetitDotCom: 'UCbpMy0Fg74eXXkvxJrtEn3w',
    // corycotton: 'UCRijo3ddMTht_IHyNSNXpNQ',
    // Vsauce: 'UC6nSFpj9HTCZ5t-N3Rm3-HA',
    // numberphile: 'UCoxcjq-8xIDTYp3uz647V5A',
    // AsapSCIENCE: 'UCC552Sd-3nyi_tk2BudLUzA',
    // keeroyz: 'UCbfYPyITQ-7l4upoX8nvctg',
    // veritasium: 'UCHnyfMqiRRG1u-2MsSQLbXA',
//     minutephysics: 'UCUHW94eEFW7hkUMVaZz4eDg',
//     DJparadiddle: 'UCtWuB1D_E3mcyYThA9iKggQ',
//     PomplamooseMusic: 'UCSiPjfAJBgbFlIUsxOWpK0w',
//     FirstWeFeast: 'UCPD_bxCRGpmmeQcbe2kpPaA',
//     testedcom: 'UCiDJtJKMICpb9B1qf7qjEOA',
//     bgfilms: 'UCJHA_jMfCvEnv-3kRjTCQXw',
//     voxdotcom: 'UCLXo7UDZvByw2ixzpQCufnA',
//     BreakingTrail: 'UC6E2mP01ZLH_kbAyeazCNdg',
//     Webzwithaz: 'UCNIuvl7V8zACPpTmmNIqP2A',
//     PowerfulJRE: 'UCzQUP1qoWDoEbmsQxvdjxgQ',
//     BuzzFeedVideo: 'UCpko_-a4wgz2u_DgDgd9fqA',
//     failarmy: 'UCPDis9pjXuqyI7RYLJ-TTSA',
//     videogamedunkey: 'UCsvn_Po0SmunchJYOWpOxMg',
//     StuntsAmazing1: 'UC0OnAjC52vtL_N3f76BU9dw',
//     ThrasherMagazine: 'UCt16NSYjauKclK67LCXvQyA',
//     unboxtherapy: 'UCsTcErHg8oDvUnTzoqsYeNw',
//     gordonramsay: 'UCIEv3lZ_tNXHzL3ox-_uUGQ',
//     AmericasGotTalent: 'UCT2X19JJaJGUN7mrYuImANQ',
//     NBCTheVoice: 'UCpdK1NLHxEUGXc1gq2NxkTw',
//     TheLateLateShow: 'UCJ0uqCI0Vqr2Rrt1HseGirg',
//     americastestkitchen: 'UCxAS_aK7sS2x_bqnlJHDSHw',
//     kingOfRandom: 'UC1zZE_kJ8rQHgLTVfobLi_g',
//     businessinsider: 'UCcyq283he07B7_KUX07mmtA',
//     PTXofficial: 'UCmv1CLT6ZcFdTJMHxaR9XeA',
//     ScaryPockets: 'UC-2JUs_G21BrJ0efehwGkUw',
//     SimoneGiertz: 'UC3KEoMzNz8eYnwBC34RaKCQ',
//     JacobCollier: 'UCtmY49Zn4l0RMJnTWfV7Wsg',
//     conan: 'UCi7GJNg51C3jgmYTUwqoUXA',
//     epicurious: 'UCcjhYlL1WRBjKaJsMH_h7Lg',
//     tryGuys: 'UCpi8TJfiA4lKGkaXs__YdBA',
//     insideEdition: 'UC9k-yiEpRHMNVOnOi_aQK8w',
//     vergeScience: 'UCtxJFU9DgUhfr2J2bveCHkQ',
//     practicalEngineering: 'UCMOqf8ab-42UUQIdVoKwjlQ',
//     infoGraphicsShow: 'UCfdNM3NAhaBOXCafH7krzrA',
//     wendoverProductions: 'UC9RM-iSvTu1uPJb8X5yp3EQ',
//     make: 'UChtY6O8Ahw2cz05PS2GhUbg',
//     DIYEngineering: 'UCkgxMWPImqt1VxMaI9d79LA',
//     SciShow: 'UCZYTClx2T1of7BRZ86-8fow',
//     FoodInsider: 'UCwiTOchWeKjrJZw7S1H__1g',
//     Computerphile: 'UC9-y-6csu5WGm29I7JiwpnA',
//     ThreeBlueOneBrown: 'UCYO_jab_esuFRV4b17AJtAw',
//     Munchies: 'UCaLfMkkHhSA_LaCta0BzyhQ',
//     KennyHotz: 'UCDbtWmkS6hyey4IBE1kaqrQ',
//     RealStories: 'UCu4XcDBdnZkV6-5z2f16M0g',
//     JourneyToTheMicrocosmos: 'UCBbnbBWJtwsf0jLGUwX5Q3g'
// }

getData(channels)