import axios from 'axios'
// 核心库
import '../../assets/js/live2d.min.js'
// tool 工具图标
import 'font-awesome/css/font-awesome.min.css'
// 事件提示
import tips from '../../utils/tips.js'
import { mapGetters } from 'vuex'

export default {
  name: 'Live2d',
  props: {
    // 模型方位（左或者右）
    direction: {
      default: 'right',
      type: String
    },
    // 自定义 id
    customId: {
      default: '',
      type: String
    },
    // 模型api
    apiPath: {
      // default: 'https://live2d.fghrsh.net/api',
      default: 'https://www.resetday.top/live2d_api',
      type: String
    },
    // 模型初始化参数[编码，衣服号]
    model: {
      default: () => [1, 51],
      type: Array
    },
    // 关于信息
    homePage: {
      default: 'https://github.com/evgo2017/vue-live2d',
      type: String
    },
    // 在触发某些事件时模型说出的话
    tips: {
      default: () => tips,
      type: Object
    },
    // 模型宽度
    width: {
      default: 0,
      type: Number
    },
    // 模型高度
    height: {
      default: 0,
      type: Number
    },
    // 模型大小
    size: {
      default: 255,
      type: Number
    }
  },
  data () {
    return {
      messageTimer: null,
      mainShow: true,
      tipText: '',
      tipShow: false,
      toolShow: false,
      modelId: 1,
      modelTexturesId: 53,
      tools: [{
        name: 'fa-comment',
        click: this.showHitokoto
      }, {
        name: 'fa-user-circle',
        click: this.loadRandModel
      }, {
        name: 'fa-street-view',
        click: this.loadRandTextures
      }, {
        name: 'fa-camera-retro',
        click: this.takePhoto
      }, {
        name: 'fa-info-circle',
        click: this.openHomePage
      }, {
        name: 'fa-times',
        click: this.close
      }],
      offsetLeft: 0,
      offsetTop: 0
    }
  },
  mounted () {
    this.modelId = this.model[0]
    this.modelTexturesId = this.model[1]
    this.loadModel()
    this.setDirection()
    this.$nextTick(function () {
      this.loadEvent()
    })
  },
  computed: {
    live2dMainId () {
      const defaultId = 'vue-live2d-main'
      const customId = this.customId
      if (!customId) return defaultId
      return customId
    },
    live2dWidth () {
      return this.width ? this.width : this.size
    },
    live2dHeight () {
      return this.height ? this.height : this.size
    },
    ...mapGetters({
      live2dMsg: 'live2d/msg'
    })
  },
  watch: {
    mainShow () {
      const containers = ['vue-live2d']
      const refs = this.$refs
      containers.forEach(containerName => {
        refs[containerName].classList.toggle(`${containerName}-on-${this.direction}`)
      })
    },
    direction () {
      this.setDirection()
    },
    width () {
      this.changeLive2dSize()
    },
    height () {
      this.changeLive2dSize()
    },
    size () {
      if (this.width || this.height) return
      this.changeLive2dSize()
    },
    live2dMsg (v) {
      console.log(v)
      if (v) {
        this.showMessage(v, 4000)
      }
    }
  },
  methods: {
    // 切换模型大小
    changeLive2dSize () {
      const { live2dMainId, live2dWidth: width, live2dHeight: height } = this
      // 不知还有调整宽高的好方法没？
      document.querySelector(`#${live2dMainId}`).outerHTML = `<canvas id=${live2dMainId} width="${width}" height="${height}" class="vue-live2d-main"></canvas>`
      this.loadModel()
    },
    // 设置模型方位
    setDirection () {
      const containers = ['vue-live2d', 'vue-live2d-tool', 'vue-live2d-toggle']
      const refs = this.$refs
      const addClassPostFix = this.direction
      const removeClassPostFix = this.direction === 'left' ? 'right' : 'left'
      containers.forEach(containerName => {
        refs[containerName].classList.remove(`${containerName}-on-${removeClassPostFix}`)
        refs[containerName].classList.add(`${containerName}-on-${addClassPostFix}`)
      })
    },
    // 加载模型
    loadModel () {
      const { apiPath, modelId, modelTexturesId, live2dMainId } = this
      const url = `${apiPath}/get/?id=${modelId}-${modelTexturesId}`
      console.log('live2dMainId', live2dMainId, 'url', url)
      window.loadlive2d(live2dMainId, url)
      // window.loadlive2d(1, '/live2d/hijiki/hijiki.model.json')
      console.log(`Live2D 模型 ${modelId}-${modelTexturesId} 加载完成`)
    },
    // 随机获取模型ID
    loadRandModel () {
      const url = `${this.apiPath}/rand/?id=${this.modelId}`
      console.log('loadRandModel', url)
      axios.get(url).then((res) => {
        const { id, message } = res.data.model
        this.modelId = id
        this.showMessage(message, 4000)
        this.loadRandTextures(true)
      }).catch(function (err) {
        console.log(err)
      })
    },
    // 随机获取皮肤
    loadRandTextures (isAfterRandModel = false) {
      const url = `${this.apiPath}/rand_textures/?id=${this.modelId}-${this.modelTexturesId}`
      axios.get(url).then((res) => {
        const { id } = res.data.textures
        this.modelTexturesId = id
        this.loadModel()
        if (!isAfterRandModel) {
          this.showMessage('我的新衣服好看嘛？', 4000)
        }
      }).catch(function (err) {
        console.log(err)
      })
    },
    // 对话展示
    showMessage (msg = '', timeout = 6000) {
      if (this.messageTimer) {
        clearTimeout(this.messageTimer)
        this.messageTimer = null
      } else {
        this.tipShow = true
      }
      this.tipText = msg
      console.log(this.tipText)
      this.messageTimer = setTimeout(() => {
        this.tipShow = false
        this.messageTimer = null
        this.$store.commit('live2d/showMessage', '')
      }, timeout)
    },
    // 照相
    takePhoto () {
      this.showMessage('照好了嘛，留个纪念吖~')
      window.Live2D.captureName = 'photo.png'
      window.Live2D.captureFrame = true
    },
    // 一言接口
    showHitokoto () {
      const url = 'https://v1.hitokoto.cn'
      axios.get(url).then((res) => {
        const { hitokoto, id, creator } = res.data
        this.showMessage(`${hitokoto} <br> - by <a href="https://hitokoto.cn?id=${id}">${creator}</a> from 《${res.data.from} 》`)
      }).catch(function (err) {
        console.log(err)
      })
    },
    // 关于信息
    openHomePage () {
      open(this.homePage)
    },
    // 关闭看板娘
    close () {
      this.mainShow = false
    },
    // 事件触发的对话展示
    loadEvent () {
      for (const event in this.tips) {
        for (const obj of this.tips[event]) {
          const { selector, texts } = obj
          const dom = selector === 'document' ? document : document.querySelector(selector)
          if (dom == null) continue

          dom.addEventListener(event, () => {
            const msg = texts[Math.floor(Math.random() * texts.length)]
            this.showMessage(msg, 2000)
          })
        }
      }
    }
  }
}
