import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'
import axios from 'axios'

export function getRecommend() {
    const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

    const data = Object.assign({}, commonParams, {
        platform: 'h5',
        // platform: 'yqq.json',
        // loginUin: 0,
        // hostUin: 0,
        uin: 0,
        needNewCode: 0
    })

    return jsonp(url, data, options)

}

export function getDiscList() {
    // const url = '/api/getDiscList';
    const url = '/api/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg';
    const data = Object.assign({}, commonParams, {
        platform: 'yqq',
        hostUin: 0,
        sin: 0,
        ein: 29,
        sortId: 5,
        needNewCode: 0,
        categoryId: 10000000,
        rnd: Math.random(),
        format: 'json'
    })
    return axios.get(url, {
        params: data
    }).then((res)=> {
        console.log(res.data);
        console.log(Promise.resolve(res.dta))
        return Promise.resolve(res.data);
    })
}

export function test() {
    const url = 'https://www.ttex.com/public/stock/findByName?name=USDT'

    return jsonp(url);
}