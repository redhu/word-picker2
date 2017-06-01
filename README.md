## 特性
* 效率非常高
* 支持第三方词库，例如[搜狗词库](http://pinyin.sogou.com/dict/download_txt.php?id=11640),您只需要下载后利用接口导入即可
* 支持**模糊关键词**匹配，例如关键词为：‘互联网%开发者’，那么‘互联网公司的开发者’可分词为：‘互联网%开发者’
* 示例
    
    作为一个互联网从业人员和一个普通开发者，我认为本质上互联网公司还是要回到如何解决人们生活中遇到的问题。
    =>
    作为,一个,联网,从业,人员,普通,开发,认为,本质,公司,还是,要回,回到,如何,解决,人们,生活,遇到,问题,互联网,开发者,我认为,本
    质上,从业人员,互联网%公司,互联网%公司%开发者

## 安装:
	npm install word-picker2

## 模块暴露类
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

    picker.addLib(['互联网', '开发人员', '互联网公司%开发人员', '公司开发人员'])

    var ret = picker.doPicker('互联网公司的开发人员都有一个普遍的特点，就是帅')
    console.log(ret)

    # 打印结果：['互联网', '开发人员', '互联网公司%开发人员']


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

