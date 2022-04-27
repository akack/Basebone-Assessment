import * as dotenv from 'dotenv'
const env = dotenv.config();
export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,
  env: env.parsed,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'frontend',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    'plugins/material-settings.js',
    'plugins/bootstrap-vue.js',
    'plugins/vue-simple-alert.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    ['nuxt-vue-material', {
      theme: 'default',
      components: ['MdDrawer', 
      'MdRadio', 
      'MdMenu', 
      'MdContent', 'MdList', 'MdButton', 'MdToolbar',]
    }],
  ],
  axios: {
    // debug: true,
    // proxy: true,
    // prefix: 'api',
    // credentials: true,
    // browserBaseURL: process.env.VUE_APP_API_URL || 'http://192.168.8.120:3000/v1/'
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
