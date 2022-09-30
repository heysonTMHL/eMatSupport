<script>
    const Cookie = require("js-cookie");
    import dayjs from 'dayjs';
    export default {
        props: [],
        data: () => ({}),
        computed: {
            langauge() {
                return this.$i18n.locale;
            },
            capLangauge() {
                return _.capitalize(this.langauge);
            },
            routePage() {
                return this.$route.query.page;
            }
        },
        methods: {
            // ^^^^^^^^^^^^^^^^^ Page Load Trigger
            startLoad() {
                this.$nextTick(() => {
                    this.$nuxt.$loading.start();
                });
            },
            endLoad() {
                this.$nextTick(() => {
                    this.$nuxt.$loading.finish();
                });
            },
            changeLangauge() {
                const locale = _.eq(this.langauge, 'zh') ? 'en' : 'zh';
                const dayjsLocale = _.eq(locale, 'zh') ? 'en' : 'zh-cn';
                dayjs.locale(dayjsLocale);
                this.setLocale(locale);
            },
            setLocale(locale) {
                this.$i18n.locale = locale;
                Cookie.set('locale', locale);
            },
            // ^^^^^^^^^^^^^^^^^ Page Load Trigger
            // ^^^^^^^^^^^^^^^^^ Form Validation
            b4Submit(nextStep = false) {
                var ready = true;
                _.forEach(this.form, (item, key) => {
                    var isEmpty = _.isArray(item.value) ? !_.size(item.value) : !item.value;
                    if (item.must)
                        ready = isEmpty ? false : ready;
                    if (item.must && isEmpty)
                        item.error = true;
                });
                if (!ready) {
                    this.errorMsg('有 * 號項目為必須填寫');
                    return;
                }
                this.submit(nextStep);
            },
            // ^^^^^^^^^^^^^^^^^ Form Validation
            // ^^^^^^^^^^^^^^^^^ Notification Message
            msg(msg, type = 'info', duration = 10000) {
                const obj = {
                    type,
                    classes: 'notification-container',
                    group: 'notify',
                    title: _.get(msg, 'title'),
                    text: _.get(msg, 'text'),
                    duration
                };
                this.$notify(obj);
            },
            errorAPI(err) {
                let code = _.get(err, 'response.status');
                let msg = _.get(err, 'response.data.message');
                this.msg({
                    title: `${msg} [ CODE : ${code} ]`,
                    text: `發生時間：${this.$date(new Date(), 'YYYY-MM-DD hh:mm:ss a')}`
                }, 'error');
            },
            errorMsg(msg) {
                this.msg({
                    title: msg,
                    text: `發生時間：${this.$date(new Date(), 'YYYY-MM-DD hh:mm:ss a')}`
                }, 'error');
            },
            // ^^^^^^^^^^^^^^^^^ Notification Message
            changePage(page) {
                let obj = {};
                let query = {
                    ..._.omit(this.$route.query, ['page']),
                    page
                };
                _.set(obj, 'query', query);
                this.$replaceRoute(obj);
            },
            reorder(type) {
                if (_.eq(this.orderBy, type)) {
                    this.ordering = _.eq(this.ordering, 'desc') ? 'asc' : 'desc';
                } else {
                    this.orderBy = type;
                    this.ordering = 'desc';
                }
            },
            forceReload() {
                location.reload();
            }
        },
        created() {
            this.setLocale((Cookie.get('locale') ? Cookie.get('locale') : this.$i18n.defaultLocale));
        },
        beforeMount() {
            if (_.eq(this.langauge, 'null')) {
                this.setLocale('zh');
            }
        },
        beforeDestroy() {}
    }
</script>