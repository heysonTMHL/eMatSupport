// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Predefine Environment Values
const env = require('dotenv').config({
    path: `.env.${ process.env.ENV || 'local' }`
});
import webpack from 'webpack';
import path from 'path';
import fs from 'fs';
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Predefine Environment Values

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Predefine i18N
import zh from "./assets/locale/zh.js";
import en from "./assets/locale/en.js";

export const I18N = {
    locales: [{
        code: "zh",
        iso: "zh",
        name: "繁中"
    }, {
        code: "en",
        iso: "en",
        name: "English"
    }],
    parsePages: false,
    detectBrowserLanguage: false,
    defaultLocale: "zh",
    strategy: "prefix_and_default",
    routesNameSeparator: '_-_',
    vueI18n: {
        fallbackLocale: "",
        messages: {
            zh,
            en
        }
    }
};
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Predefine i18N

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Nuxt Configurations
let configHttps = {
    mode: "universal",
    head: {
        titleTemplate: "%s",
        title: process.env.SITE_NAME || "",
        meta: [{
            charset: "utf-8"
        }, {
            name: "viewport",
            content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        }],
        link: [{
            rel: "favicon",
            href: `${process.env.WEB_PATH}emat_logo.png`
        }, {
            rel: "icon",
            href: `${process.env.WEB_PATH}emat_logo.png`
        }, {
            rel: "stylesheet",
            href: "https://fonts.googleapis.com/css2?family=Noto+Sans+HK:wght@100;200;400;700&display=swap"
        }],
        script: [{
            src: "https://kit.fontawesome.com/5c5521f048.js"
        }]
    },
    css: [
        "element-ui/lib/theme-chalk/index.css",
        "@/assets/css/main.scss"
    ],
    loading: '@/components/loading.vue',
    plugins: [
        "@/plugins/main.js",
        "@/plugins/main.client.js",
    ],
    buildModules: [
        "@nuxtjs/axios"
    ],
    proxy: {},
    modules: [
        ["nuxt-i18n", I18N],
        '@nuxtjs/device'
    ],
    build: {
        parallel: false,
        hardSource: false,
        cache: false,
        plugins: [new webpack.ProvidePlugin({
            "_": "lodash"
        })]
    },
    components: true,
    router: {},
    server: {
        host: process.env.HOST || "0.0.0.0",
        port: process.env.PORT || "3001"
    },
    env: process.env,
};

if (process.env.HTTPS === 'true') {
    configHttps.server.https = {
        key: fs.readFileSync(path.resolve(__dirname, 'assets/ssl/server.key')),
        cert: fs.readFileSync(path.resolve(__dirname, 'assets/ssl/server.crt'))
    }
}
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Nuxt Configurations

module.exports = configHttps;