import { combineReducers, CombinedState, AnyAction, Reducer } from 'redux'
import auth, { AuthState } from './slices/auth'
import base, { BaseState } from './slices/base'
import locale, { LocaleState } from './slices/locale/localeSlice'
import theme, { ThemeState } from './slices/theme/themeSlice'
import { select } from 'redux-saga/effects'
import evaluation, { EvaluationState } from './slices/evaluation'
import scale, { ScaleState } from './slices/scale/scaleSlice'

export type RootState = CombinedState<{
  auth: CombinedState<AuthState>
  base: CombinedState<BaseState>
  locale: LocaleState
  theme: ThemeState
  evaluation: CombinedState<EvaluationState>
  scale: ScaleState
}>

export interface AsyncReducers {
  [key: string]: Reducer<any, AnyAction>
}

const staticReducers = {
  auth,
  base,
  locale,
  theme,
  evaluation,
  scale,
}

const rootReducer =
  (asyncReducers?: AsyncReducers) => (state: RootState, action: AnyAction) => {
    const combinedReducer = combineReducers({
      ...staticReducers,
      ...asyncReducers,
    })
    return combinedReducer(state, action)
  }

export default rootReducer

export function* appSelect<TSelected>(
  selector: (state: RootState) => TSelected,
): Generator<any, TSelected, TSelected> {
  return yield select(selector)
}
