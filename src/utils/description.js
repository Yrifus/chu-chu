
export default (description) => {
    return limitCharactersTo2000(truncateAfterHashtags(description.split("<br")[0]), "... (truncated)");
}

function truncateAfterHashtags(description) {
    if(!description.includes("#")) return description;

    let encounteredHashtag = false;

    for(let index in description) {
        
        if(encounteredHashtag && ![" ", "\n"].includes(description[index])) continue;
        else if(encounteredHashtag && [" ", "\n"].includes(description[index]) && description[Number(index) + 1] == "#") continue;
        else if(encounteredHashtag && [" ", "\n"].includes(description[index]) && description[Number(index) + 1] != "#") return description.substring(0, index);
        else encounteredHashtag = description[index] == "#";
    }

}

function limitCharactersTo2000(description, toBeAppended) {
    if(description.length >= 2000) return description.substring(0, description.length - toBeAppended.length - 1) + toBeAppended;
    else return description;
}
