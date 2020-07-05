import axios from "axios";
import xml2js from "xml2js";

import config from "../storage/config.json";

export default async () => {
    return new Promise((resolve, reject) => {
        axios.get(config.youtube_RSS)
        .then(resp => {
            xml2js.parseString(resp.data, async (err, res) => {
                if(res && res.rss) {

                    try {
                        resolve(res.rss.channel[0].item.map(elem => {
                            return {
                                title: elem.title[0],
                                url: elem.link[0],
                                icon: res.rss.channel[0].image[0].url[0]
                            };
                        }));
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
