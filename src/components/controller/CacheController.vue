<template>
  <div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      gameVideos: {}
    }
  },
  mounted () {
    this.initialize()
  },
  methods: {

    initialize () {
      this.loadGameVideosDictionary().then(res => {
        console.log('gameVideosDictionary:', res)
        this.gameVideos = res

        this.$emit('assetsCached')
      })
    },

    getVideoBlobByName (name) {
      console.log('CacheController::', name, this.gameVideos[name])
      return this.gameVideos[name]
    },

    async loadGameVideosDictionary () {
      const requireContext = require.context('@/assets/video', false, /\.(mp4)(\?.*)?$/)
      let arr = requireContext.keys().map(file =>
        [file.replace(/(^.\/)|(\.(mp4)(\?.*)?$)/g, ''), requireContext(file)]
      )
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
        let url = require('@/assets/video/' + name + '.mp4')
        // console.log(url)
        await fetch(url).then(response => {
          response.blob().then(blob => {
            // console.log(blob)
            result[name] = blob
          })
        })
      }
      console.log('Done!')
      return result
    }
  }
}
</script>
