import { forumApi } from '@core/api'
import { forumApi1, forumApi2 } from '@core/api/Forum'
import {
  IForumGetTopics,
  IForumGetTopic,
  ITopic,
  ITopicResponse,
  IComment,
  /*IForumGetMessages,
  IForumMessage,*/
} from '@core/utils/interfaces/Forum'
import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from '@reduxjs/toolkit'

export interface IForumState {
  data?: any | null
  topics: any | null
  currentTopic: any | null
  isLoading: boolean
  isError: boolean
  errorMessage: string | null
  createdTopic: ITopicResponse | null
  createdComment: any | null
}

const initialState: IForumState = {
  topics: null,
  currentTopic: null,
  isLoading: false,
  isError: false,
  errorMessage: null,
  createdTopic: null,
  createdComment: null,
}

const getTopicsData = createAsyncThunk('/topics', async () => {
  return await forumApi.getTopics()
})

const createNewTopic = createAsyncThunk('topic', async (data: ITopic) => {
  return await forumApi1.createTopic(data)
})

const createNewComment = createAsyncThunk('comment', async (data: IComment) => {
  return await forumApi2.createComment(data)
})

export const forumSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(getTopicsData.pending, state => {
        state.isLoading = true
      })
      .addCase(
        getTopicsData.fulfilled,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any

        (state, action: PayloadAction<any>) => {
          console.log(action.payload)
          state.topics = action.payload
          state.isError = false
          state.errorMessage = ''
        }
      )
      .addCase(getTopicsData.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.errorMessage =
          (action.payload as SerializedError)?.message ||
          'Произошла ошибка при получении Forum topics'
      })
      .addCase(createNewTopic.pending, state => {
        state.isLoading = true
      })
      .addCase(
        createNewTopic.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false
          state.isError = false
          state.errorMessage = ''
          state.createdTopic = action.payload
        }
      )
      .addCase(createNewTopic.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.errorMessage =
          (action.payload as SerializedError)?.message ||
          'Произошла ошибка при создании Forum topic'
      })
      .addCase(createNewComment.pending, state => {
        state.isLoading = true
      })
      .addCase(
        createNewComment.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false
          state.isError = false
          state.errorMessage = ''
          state.createdComment = action.payload
        }
      )
      .addCase(createNewComment.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.errorMessage =
          (action.payload as SerializedError)?.message ||
          'Произошла ошибка при создании Forum comment'
      }),
})

export const { reducer: forumReducer } = forumSlice

export { getTopicsData, createNewTopic, createNewComment }
