export default class Singer {
    constructor({id, name}) {
        this.id = id
        this.name = name
        this.avatar = `https://y.gtimg.cn/music/photo_new/T001R300x300M00000{id}.jpg?max_age=2592000`
        console.log(this.avatar)
    }
}