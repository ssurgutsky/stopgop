export default {
  CATEGORY_VIDEO: 'video',
  CATEGORY_AUDIO: 'audio',
  CATEGORY_IMAGES: 'images',
  CATEGORY_SCRIPTS: 'scripts',
  gameAssets: {},

  getAssetBlobByName (category, name) {
    let assetName = name
    switch (category) {
      case this.CATEGORY_VIDEO:
        if (assetName.indexOf('.mp4') < 0) {
          assetName = name + '.mp4'
        }
        break
      case this.CATEGORY_AUDIO:
        if (assetName.indexOf('.mp3') < 0) {
          assetName = name + '.mp3'
        }
        break
      case this.CATEGORY_IMAGES:
        break
      case this.CATEGORY_SCRIPTS:
        if (assetName.indexOf('.qsp') < 0) {
          assetName = name + '.qsp'
        }
        break
    }
    let path = category + '/' + assetName
    console.log(path)
    return this.gameAssets[path]
  },

  loadAssets () {
    return new Promise((resolve, reject) => {
      this.loadGameAssetsDictionary()
        .then(res => {
          // console.log('gameAssets:', res)
          this.gameAssets = res
          resolve(res)
        })
        .catch(reason => {
          reject(reason)
        })
    })
  },

  async loadGameAssetsDictionary () {
    const requireContext = require.context('@/assets/', true, /\.(mp3|mp4|jpg|png|qsp|json)(\?.*)?$/)
    let arr = requireContext.keys().map(file =>
      [file.replace('./', ''), requireContext(file)]
    )
    // console.log('>>>>>>>', arr)
    let result = await this.processAssetsArray(arr)
    // console.log('>>>>>>>>>>>>', result)

    return new Promise((resolve, reject) => {
      resolve(result)
    })
  },

  async processAssetsArray (array) {
    let result = {}
    let counter = 0
    for (const item of array) {
      // console.log(item)
      let name = item[0]
      let url = require('@/assets/' + name)
      // console.log(url)
      await fetch(url).then(response => {
        response.blob().then(blob => {
          // console.log(blob)

          // Update progress bar
          console.log('cachedAsset', {'current': counter, 'total': array.length})
          counter++

          if (name.indexOf('scripts') >= 0) {
            result[name] = item[1]
          } else {
            result[name] = blob
          }
        })
      })
    }
    return result
  }
}
