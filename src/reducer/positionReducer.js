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
    updatePosition(state, action) {
      const { index, position } = action.payload
      if (state.selectedPosition[index]) {
        state.selectedPosition[index] = position
      }
    }
  },
})

export const {
  setSelectedPosition,
  setLabelSelection,
  addPosition,
  addLabel,
  setCurrent,
  updatePosition
} = positionSlice.actions


export default positionSlice.reducer
