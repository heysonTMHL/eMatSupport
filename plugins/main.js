import Vue from 'vue';

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Lodash for HTML
import _ from 'lodash';
Vue.prototype._ = _;
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Lodash for HTML

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Element UI For Vue UI Style
import elementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en';
Vue.use(elementUI, {
    locale
});
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Element UI For Vue UI Style

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> DayJs Plugin
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
var relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);
var updateLocale = require('dayjs/plugin/updateLocale');
dayjs.extend(updateLocale)

dayjs.updateLocale('en', {
    relativeTime: {
        future: "%s",
        past: "%s",
        s: 'Just now',
        m: "A min ago",
        mm: "%d mins ago",
        h: "An hour ago",
        hh: "%d hours ago",
        d: "A day ago",
        dd: "%d days ago",
        M: "A month ago",
        MM: "%d months ago",
        y: "A year ago",
        yy: "%d years ago"
    }
});
dayjs.updateLocale('zh-cn', {
    relativeTime: {
        future: "%s",
        past: "%s",
        s: '剛剛',
        m: "1 分鐘前",
        mm: "%d 分鐘前",
        h: "1 小時前",
        hh: "%d 小時前",
        d: "1 天前",
        dd: "%d 天前",
        M: "1 個月前",
        MM: "%d 個月前",
        y: "1 年前",
        yy: "%d 年前"
    }
});

const dateFormat = (date, format = 'YYYY-MM-DD') => {
    return date ? dayjs(date).format(format) : '';
}
const dateFromNow = (date) => {
    return date ? dayjs(date).fromNow() : '';
}
const dateToNow = (date) => {
    return date ? dayjs(date).toNow() : '';
}
const dateDiff = (date) => {
    const date1 = dayjs();
    return date1.diff(date, 'day');
}
const dateUnix = (date) => {
    return date ? dayjs(date).unix() : '';
}
const dayJsPlugin = {
    install(Vue, options) {
        Vue.prototype.$date = dateFormat;
        Vue.prototype.$fromNow = dateFromNow;
        Vue.prototype.$toNow = dateToNow;
        Vue.prototype.$diff = dateDiff;
        Vue.prototype.$unix = dateUnix;
    }
}
Vue.use(dayJsPlugin);
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> DayJs Plugin

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Router Redirect / Push Function
const Cookie = require("js-cookie");
const Separator = '_-_';
const pushRoute = function (name, obj = undefined, blank = false) {
    let curr = _.get(this.$route, 'name');
    const _locale = Cookie.get('locale') ? `${Separator}${Cookie.get('locale')}` : _.last(_.split(curr, _.split(curr, Separator)[0]));
    var newObj = {};
    _.set(newObj, 'name', name + _locale);
    _.forEach(obj, (val, key) => {
        _.set(newObj, key, val);
    });
    if (blank) {
        var fullPath = _.get(this.$router.resolve(newObj), 'href');
        window.open(fullPath, '_blank');
    } else {
        this.$router.push(newObj);
    }
};
const replaceRoute = function (obj) {
    let newObj = {};
    _.forEach(obj, (val, key) => {
        _.set(newObj, key, val);
    });
    this.$router.replace(newObj).catch(() => {});
};
const currentRoute = function () {
    let curr = _.get(this.$route, 'name');
    const name = _.split(curr, Separator)[0];
    return name;
};
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Router Redirect / Push Function

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Number Format Function
var Numeral = require('numeral');
const numeral = (num, format = '0,0') => {
    return Numeral(num).format(format);
}
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Number Format Function

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Font Awesome Quick Apply
const icon = (icon, style = 'fa') => {
    return `fa-${icon} ${style}`;
};
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Font Awesome Quick Apply

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> String Replace Function
const breakLine = (text) => {
    if (!_.isEmpty(text))
        text = text.replace(/(?:\r\n|\r|\n)/g, '<br>');
    return text;
}
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> String Replace Function

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Export Function
export default (context, inject) => {
    inject('pushRoute', pushRoute);
    inject('replaceRoute', replaceRoute);
    inject('currentRoute', currentRoute);
    inject('numeral', numeral);
    inject('icon', icon);
    inject('breakLine', breakLine);
}
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Export Function