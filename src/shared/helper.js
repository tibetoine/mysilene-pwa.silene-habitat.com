const accentMap = {
  'à': 'a', 'á': 'a', 'ê': 'e', 'ë': 'e', 'é': 'e', 'è': 'e', 'î': 'i', 'ï': 'i', 'í': 'i', 'ó': 'o', 'ú': 'u'
}

function removeAccent (s) {
  if (!s) { return '' }
  var ret = ''
  for (var i = 0; i < s.length; i++) {
    ret += accentMap[s.charAt(i)] || s.charAt(i)
  }
  return ret
}

export {removeAccent}
