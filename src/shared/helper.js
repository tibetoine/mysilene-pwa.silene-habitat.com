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

function forceFileDownload(response, fileName) {
  // console.log('forceFileDownload - response : ', response)
  // console.log(response.headers.map['content-type'])
  let blobData = new Blob([response.data], {
    type: 'application/vnd.ms-excel'
  })
  if (navigator.appVersion.toString().indexOf('.NET') > 0) {
    window.navigator.msSaveBlob(blobData, 'data.xlsx')
  } else {
    const url = window.URL.createObjectURL(blobData)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', fileName) // or any other extension
    document.body.appendChild(link)
    link.click()
  }
}
/*
function _s2ab(s) {
  var buf = new ArrayBuffer(s.length)
  var view = new Uint8Array(buf)
  for (var i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff
  return buf
}
*/

export { removeAccent, getShiftTypeById, getShiftIconById, forceFileDownload }
