export default class Song {
    constructor({id, mid, singer, name, album, duration, image, url}) {
        this.id = id;
        this.mid = mid;
        this.singer = singer;
        this.name = name;
        this.album = album;
        this.duration = duration;
        this.image = image;
        this.url = url;
    }
}

export function createSong(musicData) {
    return new Song({
        id: musicData.songmid,
        mid: musicData.songmid,
        singer: filterSinger(musicData.singer),
        name: musicData.songname,
        album: musicData.albumname,
        duration: musicData.interval,
        image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albumnid}.jpg?max_age=2592000`,
        // url: `https://thirdparty.gtimg.com/${musicData.songid}.m4a?fromtag=38`
        url: `http://ws.stream${musicData.songid}.m4a?fromtag=38`
    })
}

function filterSinger(singer) {
    let ret = [];
    if(!singer) {
        return ''
    }
    singer.forEach((s)=> {
        ret.push(s.name)
    })
    return ret.join('/')
}