import { createAsyncThunk } from '@reduxjs/toolkit'

export const getUserDetails = createAsyncThunk('user/getUserDetails', async (payload: any) => {
  const { fetchUser } = payload

  try {
    const { data } = await fetchUser()
    const customer = data.customer ?? {}
    return customer
  } catch (error: any) {
    return Promise.reject(error)
  }
})
