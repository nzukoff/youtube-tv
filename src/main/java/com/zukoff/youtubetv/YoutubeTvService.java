package com.zukoff.youtubetv;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class YoutubeTvService {
    public Channel getChannel(String channelId) {
        List<Channel> channelList = YoutubeTvApplication.getChannelList();

        return channelList.stream()
                    .filter(c -> c.getChannelId().equals(channelId)).findAny().orElse(null);
    }

    public ArrayList<String[]> getChannels() {
        List<Channel> channelList = YoutubeTvApplication.getChannelList();

        Map<String,String> map = new HashMap<>();
        ArrayList<String[]> list = new ArrayList<>();
        String[] myStringArray;
        channelList.forEach(c->
                list.add(new String[]{c.getChannelTitle(), c.getChannelId()}));
        return list;
    }
}
