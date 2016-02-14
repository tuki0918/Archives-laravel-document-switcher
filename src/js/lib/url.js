import url from 'url'

const FLG_ENG_DOC = 2
const FLG_JPN_DOC = 1
const FLG_NOT_DOC = 0

const REGEX_LARAVEL_ENG_DOC_URL = /^https?:\/\/laravel\.com\/docs\/.*$/
const REGEX_LARAVEL_JPN_DOC_URL = /^https?:\/\/readouble\.com\/laravel\/.+\/ja\/.*$/

const KEY_VERSION = '##VERSION##'
const KEY_PATH    = '##PATH##'
const TEMPLATE_JPN_DOC_URL = 'http://readouble.com/laravel/'+KEY_VERSION+'/ja/'+KEY_PATH

exports.convert = function(str, version) {
  let current = this.parse(str)
  let pattern = this.check(str)

  if (pattern === FLG_ENG_DOC) {
    let path = current.path.replace(/^.*\//, '') + '.html'
    let hash = current.hash ? current.hash : ''
    let url  = TEMPLATE_JPN_DOC_URL
    url = url.replace(KEY_VERSION, version)
    url = url.replace(KEY_PATH, path+hash)
    return url
  }

  if (pattern === FLG_JPN_DOC) {
    return false
  }

  return false
}

exports.parse = function(str) {
  return url.parse(str)
}

exports.check = function(str) {
  if (REGEX_LARAVEL_ENG_DOC_URL.test(str)) {
    return FLG_ENG_DOC
  }

  if (REGEX_LARAVEL_JPN_DOC_URL.test(str)) {
    return FLG_JPN_DOC
  }

  return FLG_NOT_DOC
}
