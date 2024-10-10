import { useAppSelector } from '@core/hooks'
import { getLeaderboard } from '@core/store/reducers/leaderboard.reducer'
import { TAppDispatch } from '@core/store/store'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

export const useFetch = () => {
  const { data, isLoading, isError, errorMessage } = useAppSelector(
    state => state.leaderboardReducer.leaderboardApi
  )
  const dispatch = useDispatch<TAppDispatch>()

  useEffect(() => {
    dispatch(getLeaderboard({ cursor: 0, limit: 10 }))
  }, [])

  return {
    data,
    isLoading,
    isError,
    errorMessage,
  }
}
