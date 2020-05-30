export default {
  CATEGORY_VIDEO: 'video',
  CATEGORY_AUDIO: 'audio',
  CATEGORY_IMAGES: 'images',
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
    }
    return this.gameAssets[category + '/' + assetName]
  },

  loadAssets () {
    return new Promise((resolve, reject) => {
      this.loadGameAssetsDictionary()
        .then(res => {
          console.log('gameVideosDictionary:', res)
          this.gameAssets = res
          resolve(res)
        })
        .catch(reason => {
          reject(reason)
        })
    })
  },

  async loadGameAssetsDictionary () {
    const requireContext = require.context('@/assets/', true, /\.(mp3|mp4|jpg|png)(\?.*)?$/)
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
    for (const item of array) {
      // console.log(item)
      let name = item[0]
      let url = require('@/assets/' + name)
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
