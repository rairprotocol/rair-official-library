//@ts-nocheck
import { ListNotificationsResult } from '@rair-protocol/sdk/src/types/notifications';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { dataStatuses } from './commonTypes';

import { rairSDK } from '../components/common/rairSDK';

interface NotificationState {
  notifications: Array<any>;
  totalCount: number;
  totalUnreadCount: number;
  notificationsStatus: dataStatuses;
}

const initialState: NotificationState = {
  notifications: [],
  totalCount: 0,
  totalUnreadCount: 0,
  notificationsStatus: dataStatuses.Uninitialized
};

interface NotificationsResponse {
  data?: ListNotificationsResult;
  unreadData?: ListNotificationsResult;
}

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchData',
  async (pageNum?: number) => {
    const responseData = await rairSDK.notifications?.listNotifications({
      pageNum: Number(pageNum) || 0
    });

    const responseUnreadData = await rairSDK.notifications?.listNotifications({
      onlyUnread: true
    });

    return {
      data: responseData,
      unreadData: responseUnreadData
    };
  }
);

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    clearResults: (state) => {
      state.notificationsStatus = dataStatuses.Uninitialized;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.notificationsStatus = dataStatuses.Loading;
      })
      .addCase(
        fetchNotifications.fulfilled,
        (state, action: PayloadAction<NotificationsResponse>) => {
          state.notificationsStatus = dataStatuses.Complete;
          if (action.payload?.data?.success) {
            const sortedNotifications = action.payload.data.notifications.sort(
              (a, b) => {
                if (!a.read && b.read) return -1;
                if (a.read && !b.read) return 1;

                const dateA = new Date(a.createdAt).getTime();
                const dateB = new Date(b.createdAt).getTime();

                return dateB - dateA;
              }
            );
            state.notifications = sortedNotifications;
            state.totalCount = action.payload.data.totalCount;
          }
          if (action.payload.unreadData) {
            state.totalUnreadCount = action.payload.unreadData.totalCount;
          }
        }
      )
      .addCase(fetchNotifications.rejected, (state) => {
        state.notificationsStatus = dataStatuses.Failed;
      });
  }
});

export const { clearResults } = notificationsSlice.actions;
export default notificationsSlice.reducer;
