/**
 * Created by red.hu on 1/21 0021.
 */
var _ = require('underscore');
var fs = require('fs');

var Picker = function(option){

    var defaultParam = {
        wordMaxLen : 20,
        wordMinLen : 1,
        likeSymbol: '%'
    };

    this.data = _.extend(defaultParam, option);
    this._init();
};

var _fpr = Picker.prototype;

/**
 * 初始化，只会调用一次
 * @private
 */
_fpr._init = function(){
    this.wordMap = {};
    this.wordLikeTree = {};
    this.wordLikeMap = {}
};

/**
 * 载入词库
 * @param fileName
 * @private
 */
_fpr._loadWordLib = function(fileName){
    if(typeof fileName === 'string'){
        this._loadLibFromFile(fileName)
    }
    else if (fileName instanceof Array){
        this._loadLibFromArray(fileName)
    }
};

/**
 * 从文件路径导入词库
 * @param filename
 * @private
 */
_fpr._loadLibFromFile = function(filename){
    var t = this,
        wordList = [];

    try{
        wordList = fs.readFileSync(filename).toString('utf-8').split('\n');
    }catch (e){
        throw e;
    }
    t._loadLibFromArray(wordList)
};

/**
 *
 * @param wordList
 * @private
 */
_fpr._loadLibFromArray = function(wordList){
    var t = this
      , d = t.data;

    _.each(wordList, function(word){
        word = word.replace('\r','').trim();

        var len = word.length;
        var words = []
        if(len >= d.wordMinLen && len <= d.wordMaxLen){
            if(word.indexOf(d.likeSymbol) > -1){
                words = _.filter(word.split(d.likeSymbol), function(item){
                    return !!item
                })
                words = _.unique(words)
                if(words.length == 1){
                    t.wordMap[words[0]] = true;
                }else if(words.length > 1){
                    (function(){
                        var tmp = t.wordLikeTree;
                        while(words.length > 0){
                            var w = words.shift()
                            t.wordLikeMap[w] = true
                            if(words.length == 0){
                                tmp[w] = true;
                                break;
                            }
                            tmp[w] = {}
                            tmp = tmp[w]
                        }
                    })(words)
                }
            }else{
                t.wordMap[word] = true;
            }
        }
    });

};

_fpr.findExistsPath = function(leafArr, map, parent){
    var tmp = [];
    var t = this;
    var ifRootNode = !parent;

    if(!parent){
        parent = ''
    }

    var len = leafArr.length;
    for(var i = 0; i < len; i++){
        (function(){
          var leaf = leafArr[i];
          var _parent = '';
          if(ifRootNode){
            _parent = leaf
          }else{
            _parent = parent + t.data.likeSymbol + leaf
          }

          if(map[leaf] === true) {
              tmp.push(_parent)
          }else if(typeof map[leaf] == 'object'){
              tmp =
                tmp.concat(
                  t.findExistsPath(leafArr, map[leaf], _parent))
          }
        })()
    }

    if(ifRootNode)
        for (var i = 0; i < tmp.length; i++){
            tmp[i] = tmp[i].split(t.data.likeSymbol).sort().join(t.data.likeSymbol)
        }
    return tmp
}

/**
 * 执行分词
 * @param str
 * @returns {*}
 * @private
 */
_fpr._doPicker = function(str){
    var t = this
        , d = t.data
        , len = str.length
        , retWordMap = {}
        , wordLikeMap = {};
    str = str || '';
    str = str.replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, '');

    for(var i = d.wordMinLen; i<=d.wordMaxLen; i++){
        for(var j = 0; j < len - d.wordMinLen; j++){
            var word = str.substr(j, i);
            if(word && (word in this.wordMap)) retWordMap[word] = true;
        }
    }

    for(var i = 1; i<=d.wordMaxLen; i++){
        for(var j = 0; j < len - i; j++){
            var word = str.substr(j, i);
            if(word && (word in this.wordLikeMap)){
                wordLikeMap[word] = true
            }
        }
    }
    var wordLeafArr = _.keys(wordLikeMap);
    var wordLikeArr = this.findExistsPath(wordLeafArr, this.wordLikeTree)

    return _.unique(_.keys(retWordMap).concat(wordLikeArr));
};

/**
 * 执行分词，公有方法
 * @param str
 * @returns {*}
 */
_fpr.doPicker = function(str){
    return this._doPicker(str);
};


/**
 * 载入自定义词库
 * @param fileName
 */
_fpr.addlib = _fpr.addLib = function(fileName){
    this._loadWordLib(fileName);
};

_fpr.reloadLib = function(filename){
    this._init();
    this.addLib(filename)
}

module.exports = Picker;