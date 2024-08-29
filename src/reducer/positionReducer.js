import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  selectedPosition: [],
  labelSelection: [],
  currentSelection: [],
}

const positionSlice = createSlice({
  name: "position",
  initialState,
  reducers: {
    setSelectedPosition(state, action) {
      state.selectedPosition = action.payload
    },
    setLabelSelection(state, action) {
      state.labelSelection = action.payload
    },
    addPosition(state, action) {
      state.selectedPosition.push(action.payload)
    },
    addLabel(state, action) {
      state.labelSelection.push(action.payload)
    },
    setCurrent(state, action) {
      state.currentSelection = action.payload
    },
  },
})

export const {
  setSelectedPosition,
  setLabelSelection,
  addPosition,
  addLabel,
  setCurrent,
} = positionSlice.actions
export default positionSlice.reducer
