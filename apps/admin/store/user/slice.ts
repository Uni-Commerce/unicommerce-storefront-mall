import { createSlice, Slice } from '@reduxjs/toolkit'

import { getUserDetails } from './actions'

const initialState = {
  isLogin: false,
  token: null,
  userDetail: null,
  userRole: null
}

export const slice: Slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserToken: (state: any, { payload }) => {
      state.isLogin = !!payload
      state.token = payload
    },
    setUserDetail: (state: any, { payload }) => {
      const { token, ...rest } = payload
      state.token = token
      state.userDetail = rest
      state.userRole = rest.role
    },
    setInitialState: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserDetails.fulfilled, (state, { payload }) => {
        state.userDetail = payload || null
      })
      .addCase(getUserDetails.rejected, (state) => {
        state.isLogin = false
        state.token = null
        state.userDetail = null
      })
  }
})
