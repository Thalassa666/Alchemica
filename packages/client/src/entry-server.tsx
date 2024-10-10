import { routes } from '@core/router'
import { setPageHasBeenInitializedOnServer } from '@core/store/reducers/ssr.reducer'
import { reducer } from '@core/store/store'
import { configureStore } from '@reduxjs/toolkit'
import { Request as ExpressRequest } from 'express'
import ReactDOM from 'react-dom/server'
import { Provider } from 'react-redux'
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from 'react-router-dom/server'
import { createFetchRequest } from './entry-server.utils'
import './index.css'

export const render = async (req: ExpressRequest) => {
  // 1.
  const { query, dataRoutes } = createStaticHandler(routes)
  // 2.
  const fetchRequest = createFetchRequest(req)
  // 3.
  const context = await query(fetchRequest)

  // 4.
  if (context instanceof Response) {
    throw context
  }

  // 5.
  const store = configureStore({
    reducer,
  })

  store.dispatch(setPageHasBeenInitializedOnServer(true))

  // 6.
  const router = createStaticRouter(dataRoutes, context)

  // 7.
  return {
    html: ReactDOM.renderToString(
      <Provider store={store}>
        <StaticRouterProvider router={router} context={context} />
      </Provider>
    ),
    initialState: store.getState(),
  }
}
