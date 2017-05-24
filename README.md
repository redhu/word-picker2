## 特性
* 使用方便，一个方法搞定分词
* 效率非常高，文本长短不是问题
* 支持第三方词库，例如[搜狗词库](http://pinyin.sogou.com/dict/download_txt.php?id=11640),您只需要下载后利用接口导入即可
* 如有疑问，请email至gzhmj@foxmail.com

## 安装:
	npm install word-picker2

## 模块暴露接口
    module.exports = Picker

## method
    picker.doPicker(str) // 执行分词 return ['word1', 'word2']
    picker.addLib(filename/array)  // 载入其它文件夹下词库
    picker.reloadLib(filename/array)  // 重新加载词库


## 用法：
    var Picker = require('word-picker2')

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

打印结果：

    ['其实','也是','可以','理解','可能','觉得','感情','八字','通知','时候','那时','有些','城里','怎么','只能','这样','的话','八字没一撇']
    ['其实',''理解']


## 词库文件格式示例（存储为文本格式，每个词根之间回车换行）：
    八八
    八比特组
    八叉树
    八皇后问题
    八进制
    八进制数字
    八位
    巴克斯
    巴克斯范式
    吧主
    霸王大陆
    白板服务
    白鹿书院
    白消耗周期
    白噪声发生器
    百度
    百堂互联
    百阅
    百兆网卡
    版本编程
    版本管理
    版本号
    版本控制
    版本升级
    版权

