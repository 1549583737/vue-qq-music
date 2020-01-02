import jsonp from 'common/js/jsonp'
import { commomParams, options } from './config'

export function getSingerList() {
    const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'

    const data = Object.assign({}, commomParams, {
        channel: 'singer',
        page； 'list',
        
    })
    return jsonp(url, data, options)
}
