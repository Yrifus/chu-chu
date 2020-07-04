import axios from "axios";
import xml2js from "xml2js";

import config from "../storage/config.json"
import handleDescription from "../utils/description";
import {readIDList, saveIDList} from "../controllers/storage";

export default async () => {
    return new Promise((resolve, reject) => {
        axios.get(config.fetchRss)
        .then(resp => {
            xml2js.parseString(resp.data, async (err, res) => {
                if(res && res.rss) {

                    try {
                        const IDList = await readIDList();
                        const items = [];

                        const feed = res.rss.channel[0].item.sort((a, b) => new Date(a.pubDate[0]) - new Date(b.pubDate[0]));
                        const feedFromLink = res.rss.channel[0].link[0];


                        for(let item of feed) {
                            let id = item.link[0].replace("https://www.facebook.com/", "");

                            if(IDList.includes(id)) {
                                continue;
                            } else {
                                items.push({
                                    id: id,
                                    feedFromLink: feedFromLink,
                                    url: item.link[0],
                                    date: new Date(item.pubDate[0]),
                                    body: handleDescription(item.description[0]),
                                    media: item["media:content"][0]["$"] ? item["media:content"][0]["$"] : null
                                })

                                if(IDList.length >= 5) {
                                    IDList.shift();
                                    IDList.push(id)
                                }
                                else IDList.push(id);
                            }
                            
                        }

                        await saveIDList(IDList);

                        resolve(items);
                    } catch (err) {
                        reject(err);
                    }

                }
                else if(err) reject(err);
                else reject("Unsupported RSS feed.");
            });
        }).catch(err => reject(err))
    });
    
}
