import Url from 'url'

const KEY_VERSION = '##VERSION##'
const KEY_PATH    = '##PATH##'

const JP_DOC_URL  = 'http://readouble.com/laravel/'+KEY_VERSION+'/ja/'+KEY_PATH

const REGEX_LARAVEL_DOC_URL = /^https?:\/\/laravel\.com\/docs\/.*$/

class UrlBuilder {

  static create(u, version) {
    let current = this.parse(u)
    let path = current.path
    path = path.replace(/^.*\//, '') + '.html'
    let hash = current.hash ? current.hash : ''
    let url = JP_DOC_URL
    url = url.replace(KEY_VERSION, version)
    url = url.replace(KEY_PATH, path+hash)
    return url
  }

  static parse(url) {
    return Url.parse(url)
  }

  static check(url) {
    return REGEX_LARAVEL_DOC_URL.test(url)
  }

}

export default UrlBuilder