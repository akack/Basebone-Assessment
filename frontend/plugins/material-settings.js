import Vue from 'vue'
import VueMaterial from 'vue-material'

// change single option

// change multiple options
Vue.material = {
  ...Vue.material,
  locale: {
    ...Vue.material.locale,
    dateFormat: 'yyyy/MM/dd',
    firstDayOfAWeek: 1
  }
}

Vue.use(VueMaterial)
