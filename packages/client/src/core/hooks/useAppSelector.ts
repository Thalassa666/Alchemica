import { TRootState } from '@core/store/store'
import { TypedUseSelectorHook, useSelector } from 'react-redux'

export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector
