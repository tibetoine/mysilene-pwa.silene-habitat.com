import shiftsDataRef from '../data/shifts.json'

const myShiftsDataRef = shiftsDataRef

/**
 * Retourne le type de shift (voir shifts.json) à partir d'un id de shift
 * @param {*} shiftTypeId
 */
function getShiftTypeById(shiftTypeId) {
  return myShiftsDataRef.time_types[shiftTypeId].type
}

/**
 * Retourne icon
 * @param {*} shiftTypeId
 */
function getShiftIconById(shiftTypeId) {
  return myShiftsDataRef.time_types[shiftTypeId].icon
}

const accentMap = {
  à: 'a',
  á: 'a',
  ê: 'e',
  ë: 'e',
  é: 'e',
  è: 'e',
  î: 'i',
  ï: 'i',
  í: 'i',
  ó: 'o',
  ú: 'u'
}

function removeAccent(s) {
  if (!s) {
    return ''
  }
  var ret = ''
  for (var i = 0; i < s.length; i++) {
    ret += accentMap[s.charAt(i)] || s.charAt(i)
  }
  return ret
}

export { removeAccent, getShiftTypeById, getShiftIconById }
