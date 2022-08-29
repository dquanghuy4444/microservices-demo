import { resolve } from 'path'
import enMessages from './src/locales/en.json'
import viMessages from './src/locales/vi.json'

export default {
    env: {
        baseUrl: process.env.BASE_URL || 'http://localhost:8080'
    },

    server: {
        host: "0.0.0.0"
    },
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'Client',
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
        "~/styles/base.css",
        "~/styles/reset.css",
        "~/styles/variables.css",
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        { src: '~/plugins/i18n.js' },
        { src: '~/plugins/vue-carousel.js', mode: 'client' },
        { src: '~/plugins/directives.js', mode: 'client' },
        '~/plugins/axios',
        '~/plugins/api'
    ],

    middleware: ['auth'],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        '@nuxt/postcss8',
        "@nuxtjs/svg"
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        '@nuxtjs/i18n',
        '@nuxtjs/axios',
        '@nuxtjs/toast',
        '@nuxtjs/universal-storage',
    ],

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        postcss: {
            plugins: {
                tailwindcss: {},
                autoprefixer: {},
            },
        },
    },

    srcDir: 'src/',

    alias: {
        'styles': resolve(__dirname, './styles'),
        'components': resolve(__dirname, './components'),
        'layouts': resolve(__dirname, './layouts'),
        'configs': resolve(__dirname, './configs'),
        'const': resolve(__dirname, './const'),
        'views': resolve(__dirname, './views'),
        'utils': resolve(__dirname, './utils'),
    },

    i18n: {
        strategy: 'prefix_except_default',
        locales: ['en', "vi"],
        defaultLocale: 'vi',
        vueI18n: {
            fallbackLocale: 'en',
            messages: {
                en: enMessages,
                vi: viMessages,
            }
        }
    },

    tailwindcss: {
        exposeConfig: true,
    },

    toast: {
        position: 'top-right',
        duration: 1998,
        keepOnHover: true
    }

}
