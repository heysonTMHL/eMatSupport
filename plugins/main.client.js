import Vue from 'vue';
const Cookie = require("js-cookie");
import dayjs from 'dayjs';

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Import CrypotoJs
import VueCryptojs from 'vue-cryptojs';
Vue.use(VueCryptojs);
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Import CrypotoJs

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Import Notification
import Notifications from 'vue-notification';
Vue.use(Notifications);
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Import Notification

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Import Carousel
import VueCarousel from 'vue-carousel';
Vue.use(VueCarousel);
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Import Carousel

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Import Click Events
import vClickOutside from 'v-click-outside';
Vue.use(vClickOutside);
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Import Click Events

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Import PDF Viewer
import VuePdfApp from "vue-pdf-app";
Vue.component("vuePdf", VuePdfApp);
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Import PDF Viewer

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Import WSWG Editor
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
if (process.browser) {
    const VueQuillEditor = require('vue-quill-editor/dist/ssr');
    Vue.use(VueQuillEditor);
}
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Import WSWG Editor

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Video Js
import 'video.js/dist/video-js.css';
import '@videojs/themes/dist/city/index.css';
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Video Js

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Axios
export default ({
    store,
    route,
    redirect,
    app: {
        $axios
    }
}) => {
    // $axios.onRequest((res) => {
    //     let refreshTime = localStorage.getItem("fourSRefreshTime");
    //     let current = dayjs().unix();
    //     try {
    //         if (!refreshTime) {
    //             localStorage.setItem("fourSRefreshTime", current);
    //         } else {
    //             if (current > (_.toInteger(refreshTime) + 3600)) {
    //                 store.dispatch('auth/refreshToken');
    //                 localStorage.setItem("fourSRefreshTime", current);
    //             }
    //         }
    //     } catch (err) {}
    // });

    // $axios.onError((err) => {
    //     if (err.response.status === 401) {
    //         store.dispatch('auth/signOut');
    //         redirect('/');
    //     }
    // });

    // const token = Cookie.get("fourSToken");
    // if (token) {
    //     $axios.setToken(token, "Bearer");
    // }
};
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Axios