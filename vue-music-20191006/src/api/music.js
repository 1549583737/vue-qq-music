import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'

export function getMusic(mid) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
  const data = Object.assign({}, commonParams, {
    songmid: mid,
    filename: 'C400' + mid + '.m4a',
    guid: 9286344512,
    platform: 'yqq',
    loginUin: 0,
    hostUin: 0,
    needNewCode: 0,
    g_tk: 5381,
    uin: 0,
    cid: 205360410,
    format: 'json'
  })
  return jsonp(url, data, options)
}
