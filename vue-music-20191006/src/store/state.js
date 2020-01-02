import {playMode} from 'common/js/config'

const state = {
  singer: {},
  playing: false,
  fullScreen: false,
  playlist: [], // 播放前进后退
  sequenceList: [],
  mode: playMode.sequence,
  currentIndex: -1
}
export default state
