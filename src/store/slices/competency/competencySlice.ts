import { Competency } from '@/@types/competency'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type CompetencyState = {
  loading: boolean
  data: Competency[]
}

const initialState: CompetencyState = {
  loading: false,
  data: [],
}

export const competencySlice = createSlice({
  name: 'competency',
  initialState,
  reducers: {
    getCompetenciesActions: (state) => {
      state.loading = true
    },
    getCompetenciesSuccessActions: (
      state,
      action: PayloadAction<Competency[]>,
    ) => {
      state.loading = false
      state.data = action.payload
    },
    setFailedAction: (state) => {
      state.loading = false
    },
  },
})

export const competencyActions = competencySlice.actions

export default competencySlice.reducer
