// @ts-nocheck
import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Hex } from 'viem';

import { dataStatuses } from './commonTypes';

import { rairSDK } from '../components/common/rairSDK';
import {
  ApiCallResponse,
  CatalogVideoItem,
  PaginatedApiCall
} from '../types/commonTypes';

interface VideoQueryResponse extends ApiCallResponse {
  list: Array<CatalogVideoItem>;
  totalNumber: number;
}

interface VideoQueryParams extends Partial<PaginatedApiCall> {
  blockchain?: Array<Hex>;
  category?: Array<string>;
  userAddress?: Hex;
  mediaTitle?: string;
}

interface VideoState {
  videoListStatus: dataStatuses;
  videos: Array<CatalogVideoItem>;
  totalVideos: number;
}

const initialState: VideoState = {
  videoListStatus: dataStatuses.Uninitialized,
  videos: [],
  totalVideos: 0
};

export const loadVideoList = createAsyncThunk(
  'video/loadVideoList',
  async (searchParams: VideoQueryParams) => {
    const response = await rairSDK?.files?.listMedia({
      author: searchParams.userAddress
    });
    return response;
  }
);

export const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadVideoList.pending, (state) => {
        state.videoListStatus = dataStatuses.Loading;
      })
      .addCase(
        loadVideoList.fulfilled,
        (state, action: PayloadAction<VideoQueryResponse>) => {
          state.videoListStatus = dataStatuses.Complete;
          state.totalVideos = action.payload.totalNumber;
          state.videos = action.payload.list;
        }
      )
      .addCase(loadVideoList.rejected, (state) => {
        state.videoListStatus = dataStatuses.Failed;
      });
  }
});

export default videoSlice.reducer;
