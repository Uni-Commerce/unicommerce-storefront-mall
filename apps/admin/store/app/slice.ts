import { createSlice, Slice } from '@reduxjs/toolkit'

export const slice: Slice = createSlice({
  name: 'app',
  initialState: {
    i18n: null,
    loading: false,
    isWechat: false
  },
  reducers: {
    setAppConfig: (state: any, { payload }) => {
      const { i18n } = payload
      state.i18n = i18n
    },
    setIsWechat: (state, { payload }) => {
      state.isWechat = payload
    },
    setLoading: (state, { payload }) => {
      state.loading = payload
    }
  }
})
