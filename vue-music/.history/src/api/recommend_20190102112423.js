import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'

export function getRecommend() {
    const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

    const data = Object.assign({}, commonParams, {
        // platform: 'h5',
        platform: 'yqq.json',
        uin: 0,
        needNewCode: 0
    })

    return jsonp(url, data, options)

}

export function test() {
    const url = 'https://www.ttex.com/public/stock/findByName?name=USDT'

    return jsonp(url);
}