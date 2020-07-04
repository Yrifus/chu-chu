import axios from "axios";

import config from "../storage/config.json";
import fetchRss from "./fetchRss";

export default async () => {
    let feed = await fetchRss();


    for(let item of feed) {
        const descLines = item.body.split("\n");
        const title = descLines[0];
        const requestBody = { embeds: [] };

        descLines.shift();

        const embed = {
            title:  title,
            description: descLines.join("\n"),
            timestamp: item.date,
            url: item.url,
            author : {
                name: config.author,
                icon_url: config.icon,
                url: item.feedFromLink
            }

        }

        if(item.media && ["image", "video"].includes(item.media.medium) && item.media.url) {
            embed[item.media.medium] = {
                url: item.media.url
            }
        }

        requestBody.embeds.push(embed);
        
        await axios.post(config.discordWebhook, requestBody)
    }

}
