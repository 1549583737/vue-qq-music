import jsonp from 'common/js/jsonp'
import axios from 'axios'
import {commonParams, options} from './config'

export function getSingerList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
  const data = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    g_tk: 1664029744
  })
  return jsonp(url, data, options)
}

export function getSingerDetail(singerId) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'

  const data = Object.assign({}, commonParams, {
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    order: 'listen',
    begin: 0,
    num: 100,
    songstatus: 1,
    g_tk: 1664029744,
    singermid: singerId
  })
  return jsonp(url, data, options)
}

export function getSongVkey(songmid) { // 获取歌曲的vkey
  const url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg'
  const data = Object.assign({}, {
    callback: 'musicJsonCallback',
    loginUin: 3051522991,
    format: 'jsonp',
    platform: 'yqq',
    needNewCode: 0,
    cid: 205361747,
    uin: 3051522991,
    guid: 5931742855,
    songmid: songmid,
    filename: `C400${songmid}.m4a`
  })
  return jsonp(url, data)
}

// http://58.216.6.143/amobile.music.tc.qq.com/C400001PLl3C4gPSCI.m4a?guid=9286344512&vkey=&uin=0&fromtag=66

export function getMusic(songmid) {
  const url = '/api/music'
  const data = Object.assign({}, commonParams, {
    callback: 'musicJsonCallback',
    loginUin: 3051522991,
    hostUin: 0,
    format: 'json',
    platform: 'yqq',
    needNewCode: 0,
    cid: 205361747,
    uin: 3051522991,
    guid: 5931742855,
    songmid: songmid,
    filename: `C400${songmid}.m4a`
  })
  // options.prefix = 'musicJsonCallback'
  // return jsonp(url, data, options)
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getplaysongvkey(songmid) {
  const url = '/api/getplaysongvkey'
  const data = Object.assign({}, commonParams, {
    g_tk: 5381,
    loginUin: 0,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: ' yqq.json',
    needNewCode: 0,
    data: {
      'req': {
        'module': 'CDN.SrfCdnDispatchServer',
        'method': 'GetCdnDispatch',
        'param': {'guid': '3309754632', 'calltype': 0, 'userip': ''}
      },
      'req_0': {
        'module': 'vkey.GetVkeyServer',
        'method': 'CgiGetVkey',
        'param': {
          'guid': '3309754632',
          'songmid': ['' + songmid + ''],
          'songtype': [0],
          'uin': '0',
          'loginflag': 1,
          'platform': '20'
        }
      },
      'comm': {'uin': 0, 'format': 'json', 'ct': 24, 'cv': 0}
    }
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data.req_0.data.midurlinfo[0].purl)
  })
}

export function getvkey(songmid, callback) {
  axios.defaults.transformRequest = [function (data) {
    let ret = ''
    for (let it in data) {
      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    return ret
  }]
  let date = new Date().getTime()
  axios({
    url: '/vkey/cgi-bin/musicu.fcg?_=' + date,
    method: 'post',
    data: {},
    transformRequest: [function () {
      return `{
        'req_0': {
          'module': 'vkey.GetVkeyServer',
          'method': 'CgiGetVkey',
          'param': {
            'guid': '8326724064',
            'songmid': ${songmid},
            'songtype': [],
            'uin': '0',
            'loginflag': 0,
            'platform': '23',
            'h5to': 'speed'
          }
        },
        'comm': {'g_tk': 5381, 'uin': 0, 'format': 'json', 'ct': 23, 'cv': 0}
      }`
    }
    ]
    // headers: {
    //   'Content-Type':
    //     'application/x-www-form-urlencoded'
    // }
  }).then(response => {
    callback(response)
  }).catch(error => {
    callback(error)
  })
}
