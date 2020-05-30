export default {
  gameVideos: {},

  getVideoBlobByName (name) {
    let vname = name + '.mp4'
    // console.log('gameVideosDictionary:', this.gameVideos)
    // console.log('CacheController::', vname, this.gameVideos[vname])
    return this.gameVideos[vname]
  },

  loadAssets () {
    return new Promise((resolve, reject) => {
      this.loadGameVideosDictionary()
        .then(res => {
          // console.log('gameVideosDictionary:', res)
          this.gameVideos = res
          resolve(res)
        })
        .catch(reason => {
          reject(reason)
        })
    })
  },

  async loadGameVideosDictionary () {
    const requireContext = require.context('@/assets/video', true, /\.(mp4)(\?.*)?$/)
    let arr = requireContext.keys().map(file =>
      [file.replace('./', ''), requireContext(file)]
    )
    // console.log('>>>>>>>', arr)
    let result = await this.processArray(arr)
    // console.log('>>>>>>>>>>>>', result)

    return new Promise((resolve, reject) => {
      resolve(result)
    })
  },

  async processArray (array) {
    let result = {}
    for (const item of array) {
      // console.log(item)
      let name = item[0]
      let url = require('@/assets/video/' + name)
      // console.log(url)
      await fetch(url).then(response => {
        response.blob().then(blob => {
          // console.log(blob)
          result[name] = blob
        })
      })
    }
    return result
  }
}
