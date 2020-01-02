export default class Singer {
    constructor({id, name}) {
        this.id = id
        this.name = name
        console.log(this.avatar)
        this.avatar = `https://y.gtimg.cn/music/photo_new/T001R300x300M000000${id}.jpg?max_age=2592000`
    }
}