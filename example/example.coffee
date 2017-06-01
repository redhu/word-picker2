Picker = require('../index')

picker = new Picker({
  wordMinLen: 2,
  wordMaxLen: 10
})

article = require('fs').readFileSync('./article.txt').toString()
ret = ''

picker.addLib('../word/网络术语.txt')
picker.addLib('../word/common.txt')
picker.addLib('../word/网络安全及黑客词库.txt')
picker.addLib(['互联网%公司'])
picker.addLib(['开发者%互联网%公司'])

ret = picker.doPicker(article)
console.log(article)
console.log('=>')
console.log(ret.toString())


