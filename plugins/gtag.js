import Vue from 'vue'
import VueGtag from 'vue-gtag'

if (process.env.NODE_ENV === 'production') {
  Vue.use(VueGtag, {
    config: { id: 'G-Z2C9WBWM9R' },
    appName: 'note-pad-app',
  })
}
