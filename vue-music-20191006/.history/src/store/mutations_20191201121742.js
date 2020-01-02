import * as types from './mutation-types'

const mutations = {
    [types.SET_SINGER](state, singer) {
        console.log(singer)
        state.singer = singer
    }
}

export default mutations