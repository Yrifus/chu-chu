import fs from "fs";
import path from "path";

export async function readIDList() {
    return new Promise(async (resolve, reject) => {
        if(await fs.existsSync(path.join(__dirname, "../storage/IDList.json"))) {
            fs.readFile(path.join(__dirname, "../storage/IDList.json"), (err, data) => {
                if(err) reject(err)
                else resolve(JSON.parse(data));
            })
        } else {
            fs.writeFile(path.join(__dirname, "../storage/IDList.json"), "[]", (err) => {
                if(err) reject(err);
                else resolve([]);
            })
        }
    });
}

export async function saveIDList(data) {
    return new Promise(async (resolve, reject) => {
        fs.writeFile(path.join(__dirname, "../storage/IDList.json"),
            JSON.stringify(data, null, 2),
            (err) => {
                if(err) reject(err);
                else resolve();
            }
        )
    });
}
