module.exports = {
  each: (arr = [], fn)->
    for item in arr
      fn(item)

  filter: (arr = [], fn)->
    tmp = []
    for item in arr
      tmp.push item if fn(item)

  unique: (arr = [], fn)->
    map = {}
    tmp = []

    for item in arr
      if fn
        ret = fn(item)
      else
        ret = item

      if map[ret]
        continue
      else
        tmp.push(ret)
        map[ret] = true

    return tmp

  keys: (obj)->
    tmp = []
    for k, v of obj
      tmp.push(k)

    return tmp
}