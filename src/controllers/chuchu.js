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

        if(item.media && item.media.medium === "image" && item.media.url) {
            embed.image = {
                url: item.media.url
            }
        }

        if(item.video) {
            embed.fields = [{
                name: "YouTube video",
                value: `[${item.video.title}](${item.video.url})`
            }]
        }

        requestBody.embeds.push(embed);
        console.log(
            JSON.stringify(
                requestBody, null, 2
            )
        )
        await axios.post(config.discordWebhook, requestBody)
    }

}
