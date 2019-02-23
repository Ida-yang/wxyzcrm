import Vue from 'vue'
import App from './App'
import weui from './weui.css'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
    config: {
        usingComponents: {
            'ec-canvas': '../../../static/ec-canvas/ec-canvas'
        }
    }
}