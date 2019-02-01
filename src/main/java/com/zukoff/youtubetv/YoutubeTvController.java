package com.zukoff.youtubetv;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class YoutubeTvController {
    @Autowired
    YoutubeTvService service;

    @GetMapping("/api/channels/{id}")
    public Channel getChannel(@PathVariable String id) {
        return service.getChannel(id);
    }

    @GetMapping("/api/channels")
    public ArrayList<String[]> getChannels() {
        return service.getChannels();
    }
}
