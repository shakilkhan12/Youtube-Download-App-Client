import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { formatType } from '@/types/video'

// Define a type for the slice state
interface DownloadState {
  processing: boolean,
  formats: formatType[]
}

// Define the initial state using that type
const initialState: DownloadState = {
  processing: false,
  formats: []
}

export const downloadSlice = createSlice({
  name: 'download',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setProcessing: (state, {payload}) => {
      state.processing = payload
    },
    setFormats: (state, {payload}) => {
      state.formats = payload;
    }
  },
})

export const { setProcessing, setFormats } = downloadSlice.actions


export default downloadSlice.reducer