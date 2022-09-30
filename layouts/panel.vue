<template>
    <div :class="['panel-page']">
        <div class="panel-header">
            <div class="page-info" @click="$pushRoute('index')">
                <img class="page-logo" :src="require(`~/assets/images/emat_logo.png`)" />
                <div class="page-name" v-html="`eMat Support`" />
            </div>
            <div class="panel-menu-list">
                <div class="panel-category" v-for="cat, index in headerMenu" :key="index"
                    v-show="!_.eq(cat.path, 'projects') || _.size(userProjects)"
                    @click.stop="headerMenuAction(cat.path)">
                    <div :class="['panel-menu-header', current(cat.path)]">
                        <span v-html="$t(`${cat.name}.title`)" />
                    </div>
                </div>
            </div>
            <div class="change-langauge" @click.stop="changeLangauge()">
                <i :class="$icon('globe')" />
                <span v-html="$t('changeLang')" />
            </div>
        </div>
        <div id="container" ref="container">
            <nuxt />
        </div>
        <notifications group="notify" :max="1" :ignoreDuplicates="true" />
    </div>
</template>

<script>
    const Cookie = require("js-cookie");
    import mixin from '@/functions/mixin.vue';
    export default {
        mixins: [mixin],
        computed: {
            currentRoute() {
                return _.head(_.split(this.$currentRoute(), '-'));
            }
        },
        watch: {},
        data: () => ({
            headerMenu: [{
                path: 'releaseNotes',
                name: 'release'
            }, {
                path: 'learning',
                name: 'learning'
            }, {
                path: 'faq',
                name: 'faq'
            }],
        }),
        methods: {
            current(path) {
                return _.includes(path, this.currentRoute) ? 'current' : '';
            },
            headerMenuAction(path) {
                if (_.eq(path, 'faq')) {
                    let obj = {};
                    let params = {
                        type: 'all'
                    };
                    _.set(obj, 'params', params);
                    this.$pushRoute('faq-type', obj);
                } else {
                    this.$pushRoute(path);
                }

            },
        },
        beforeMount() {},
        destroyed() {}
    }
</script>