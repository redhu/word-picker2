util = require('./util')

class Picker
  constructor: (option = {})->
    @data = {
      wordMaxLen: option.wordMaxLen or 20
      wordMinLen: option.wordMinLen or 2
      likeSymbol: option.likeSymbol or '%'
    }
    @_init()


  _init: ->
    @wordMap = {}
    @wordLikeMap = {}
    @wordLikeTree = {}


  _loadWordLib: (lib)->
    if typeof  lib is 'string'
      @_loadLibFromFile(lib)
    else if lib instanceof Array
      @_loadLibFromArray(lib)


  _loadLibFromFile: (filename)->
    try
      wordList = require('fs')
      .readFileSync(filename)
      .toString('utf-8')
      .split('\n')
      @_loadLibFromArray(wordList)


  _loadLibFromArray: (wordList = [])->
    likeSymbol = @data.likeSymbol

    for word in wordList
      word = word.replace(/\s/, '')
      len = word.length

      if len < @data.wordMinLen or len > @data.wordMaxLen
        continue

      if word.indexOf(likeSymbol) is -1
        @wordMap[word] = true
        continue

      (=>
        tmp = @wordLikeTree
        words = word.split(likeSymbol)
        words = util.unique(words).sort()

        while(words.length > 0)
          word = words.shift()
          @wordLikeMap[word] = true

          unless tmp[word]
            tmp[word] = {
              branch: {}
            }

          if words.length is 0
            tmp[word].isLeaf = true

          tmp = tmp[word].branch
      )()


  _doPicker: (str = '')->
    str = str.replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, '')
    strLen = str.length
    retWordMap = {}
    retWordLikeMap = {}
    wordMaxLen = if @data.wordMaxLen - strLen > 0 then strLen else @data.wordMaxLen

    for i in [@data.wordMinLen..wordMaxLen]
      for j in [0..strLen - i]
        word = str.substr(j, i)
        if word and @wordMap[word]
          retWordMap[word] = true

    for i in [1..wordMaxLen]
      for j in [0..strLen - i]
        word = str.substr(j, i)
        if word and @wordLikeMap[word]
          retWordLikeMap[word] = true
    leafArr = util.keys(retWordLikeMap).sort()
    wordLikeArr = @_findExistsPath(leafArr)
    return util.unique(util.keys(retWordMap).concat(wordLikeArr))


  _findExistsPath: (leafArr, map = @wordLikeTree, parent = '')->
    tmp = []
    ifRoot = not parent
    likeSymbol = @data.likeSymbol

    for leaf in leafArr
      do()=>
        if ifRoot
          _parent = leaf
        else
          _parent = parent + likeSymbol + leaf

        if map[leaf]
          if map[leaf].isLeaf
            tmp.push(_parent)

          branch = map[leaf].branch

          if util.keys(branch).length > 0
            tmp = tmp.concat(@_findExistsPath(leafArr, branch, _parent))

    return tmp


  doPicker: (str)->
    return @_doPicker(str)


  addLib: (lib)->
    @_loadWordLib(lib)


  addlib: (lib)->
    @addLib(lib)


  reloadLib: (lib)->
    @_init()
    @addLib(lib)

module.exports = Picker
