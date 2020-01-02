import * as types from './mutation-types'

const mutations = {
    [types.SET_SINGER](state, singer) {
        debugger
        state.singer = singer
    }
}

export default mutations