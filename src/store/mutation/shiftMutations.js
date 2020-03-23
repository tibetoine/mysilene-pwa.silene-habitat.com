import Do from '../../const/do'

export default {
  [Do.SET_CURRENT_SHIFT]: (state, shift) => {
    state.shift.currentShift = shift
  },
  [Do.SET_SHIFTS]: (state, shifts) => {
    state.shift.allShifts = shifts
  }
}
