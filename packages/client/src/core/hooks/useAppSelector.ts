import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { TRootState } from '@core/store/store'

export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector
