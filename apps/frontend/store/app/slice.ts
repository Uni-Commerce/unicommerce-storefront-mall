import { createSlice, Slice } from '@reduxjs/toolkit'

export const slice: Slice = createSlice({
  name: 'app',
  initialState: {
    i18n: null,
    loading: false,
    industryList: [],
    location: null,
    isWechat: false
  },
  reducers: {
    setAppConfig: (state: any, { payload }) => {
      const { i18n, industryList, location } = payload
      state.i18n = i18n
      state.industryList = industryList
      state.location = location
    },
    setIsWechat: (state, { payload }) => {
      state.isWechat = payload
    },
    setLoading: (state, { payload }) => {
      state.loading = payload
    }
  }
})
