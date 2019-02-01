package com.zukoff.youtubetv;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@SpringBootApplication
public class YoutubeTvApplication {
	static List<Channel> channelList;

	public static List<Channel> getChannelList() {
		return channelList;
	}

	public static void main(String[] args) {
		try {
			Channel[] channels = new ObjectMapper().readValue(new FileReader("./src/main/resources/static/data.json"), Channel[].class);
			channelList = new ArrayList<>(Arrays.asList(channels));
		}
		catch (FileNotFoundException fe) {
			fe.printStackTrace();
		}
		catch (IOException e) {
			e.printStackTrace();
		}

		SpringApplication.run(YoutubeTvApplication.class, args);
	}

}

