import {
  setPageHasBeenInitializedOnServer,
  selectPageHasBeenInitializedOnServer,
} from '@core/store/reducers/ssr.reducer'
import { TAppDispatch, TRootState } from '@core/store/store'
import { useEffect } from 'react'
import { useAppSelector } from '@core/hooks/useAppSelector'
import { useDispatch, useStore } from 'react-redux'

const getCookie = (name: string): string | undefined => {
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

// Определение контекста страницы для инициализации
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
  const dispatch = useDispatch<TAppDispatch>()
  const pageHasBeenInitializedOnServer = useAppSelector(
    selectPageHasBeenInitializedOnServer
  )
  const store = useStore<TRootState>()

  useEffect(() => {
    const initializePage = async () => {
      if (pageHasBeenInitializedOnServer) {
        dispatch(setPageHasBeenInitializedOnServer(false))
        return
      }

      try {
        await initPage({
          dispatch,
          state: store.getState(),
          ctx: createContext(),
        })
      } catch (error) {
        console.error('Error during page initialization:', error)
      }
    }

    initializePage()
  }, [dispatch, initPage, store, pageHasBeenInitializedOnServer])
}
