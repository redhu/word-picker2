/**
 * Created by red.hu on 5/5 0005.
 */

var Picker = require('../index')

var picker = new Picker({
  wordMinLen: 2,
  wordMaxLen: 10
})

picker.addLib('../word/common.txt')
picker.addLib(['这段感情', '瞒着我'])

var ret = picker.doPicker('其实她瞒着我也是可以理解的，可能她觉得这段感情还八字没一撇呢，没到通知我的时候。我那时就跟她说，去山里有些远了，在城里怎么玩都行，当爹的只能说这样的话了。')
console.log(ret)


picker.reloadLib(['其实', '理解', '万岁', '理解万岁'])
ret = picker.doPicker('其实她瞒着我也是可以理解的，可能她觉得这段感情还八字没一撇呢，没到通知我的时候。我那时就跟她说，去山里有些远了，在城里怎么玩都行，当爹的只能说这样的话了。')
console.log(ret)
