/**
 * Created by red.hu on 5/5 0005.
 */

var Picker = require('../index')

var picker = new Picker({
  wordMinLen: 2,
  wordMaxLen: 10
})

var article = require('fs').readFileSync('./ai.txt').toString()
var ret = ''

picker.addLib('../word/common.txt')
ret = picker.doPicker(article)
console.log('分词结果', ret)
console.log('=================================')

picker.addLib(['互联网%公司'])
ret = picker.doPicker(article)
console.log('分词结果', ret)
console.log('=================================')

picker.reloadLib(['开发者%互联网'])
ret = picker.doPicker('开发者_互联网公司')
console.log('分词结果', ret)
console.log('=================================')

picker.addLib('../word/网络术语.txt')
picker.addLib('../word/common.txt')
// 运行一千次
var d1 = new Date()
var times = 1000
for(var i = 0; i < times; i++){
  ret = picker.doPicker(article)
}
var d2 = new Date()
console.log('运行长文本' + times + '次', '费时：', d2 - d1, 'ms')
console.log('=================================')

// 运行一千次短文本
var d1 = new Date()
var times = 1000
for(var i = 0; i < times; i++){
  ret = picker.doPicker('作为一个互联网公司开发者,我认为远程办公是一个必备技能')
}
var d2 = new Date()
console.log('运行短文本' + times + '次', '费时：', d2 - d1, 'ms')
console.log('=================================')


console.info('success!')

