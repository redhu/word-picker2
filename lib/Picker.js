/**
 * Created by red.hu on 1/21 0021.
 */
var _ = require('underscore');
var fs = require('fs');
var path = require('path')

var Picker = function(option){

    var defaultParam = {
        wordMaxLen : 20,
        wordMinLen : 2
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
        if(len >= d.wordMinLen && len <= d.wordMaxLen){
            t.wordMap[word] = null;
        }
    });
};

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
        , map = t.wordMap
        , retMap = {};

    for(var i = d.wordMinLen; i<=d.wordMaxLen; i++){
        for(var j= 0; j < len; j++){
            var word = str.substr(j, i);
            if(word && (word in map)) retMap[word] = null;
        }
    }

    return _.keys(retMap);
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
    this.wordMap = {}
    this.addLib(filename)
}

module.exports = Picker;