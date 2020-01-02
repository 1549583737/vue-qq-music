import {playMode} from 'common/js/config'
const state = {
  singer: {},
  playing: false, // 播放和暂停
  fullScreen: false, // 播放器展开和收起
  playlist: [], // 前进后退列表
  sequenceList: [], // 顺序列表
  mode: playMode.sequence,
  currentIndex: -1
}

export default state