export default class Singer {
    constructor({id, name}) {
        this.id = id
        this.name = name
        this.avatar = `https://y.gtimg.cn/music/photo_new/${id}.jpg?max_age=2592000`
    }
}