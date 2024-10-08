import {
  setPageHasBeenInitializedOnServer,
  selectPageHasBeenInitializedOnServer,
} from '@core/store/reducers/ssr.reducer'
import { TAppDispatch, TRootState } from '@core/store/store'
import { useEffect } from 'react'
import { useAppSelector } from '@core/hooks/useAppSelector'
import { useDispatch, useStore } from 'react-redux'

const getCookie = (name: string) => {
  const matches = document.cookie.match(
    new RegExp(
      '(?:^|; )' +
        // eslint-disable-next-line
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
        '=([^;]*)'
    )
  )
  return matches ? decodeURIComponent(matches[1]) : undefined
}

export type PageInitContext = {
  clientToken?: string
}

export type PageInitArgs = {
  dispatch: TAppDispatch
  state: TRootState
  ctx: PageInitContext
}

const createContext = (): PageInitContext => ({
  clientToken: getCookie('token'),
})

type PageProps = {
  initPage: (data: PageInitArgs) => Promise<unknown>
}

export const usePage = ({ initPage }: PageProps) => {
  const dispatch = useDispatch()
  const pageHasBeenInitializedOnServer = useAppSelector(
    selectPageHasBeenInitializedOnServer
  )
  const store = useStore()

  useEffect(() => {
    if (pageHasBeenInitializedOnServer) {
      dispatch(setPageHasBeenInitializedOnServer(false))
      return
    }
    initPage({ dispatch, state: store.getState(), ctx: createContext() })
  }, [])
}
