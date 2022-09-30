<template>
    <div class="release-detail-page">
        <!-- Page Default Header Section -->
        <div class="page-header">
            <breadcrumb :addition="[{
                name: $t('release.title'),
                path: 'releaseNotes'
            },{
                name: data.title
            }]" />
            <div class="header">
                <div class="title">
                    <span class="text" v-html="data.title" />
                </div>
                <div class="page-changes">
                    <el-button :class="['action-button']" :disabled="!data.prevId" @click="goTo(data.prevId)">
                        <i :class="['prefix', $icon('arrow-left', 'far')]" />
                        <span v-html="$t('release.detail.previous')" />
                    </el-button>
                    <el-button :class="['action-button']" :disabled="!data.nextId" @click="goTo(data.nextId)">
                        <span v-html="$t('release.detail.next')" />
                        <i :class="['suffix', $icon('arrow-right', 'far')]" />
                    </el-button>
                </div>
            </div>
            <div class="sub-header">
                <div class="sub-title"
                    v-html="$t('release.detail.lastUpdate', [$date(data.updatedAt, 'YYYY-MM-DD HH:mm')])" />
                <div :class="['module', data.productType]" v-html="$t(`productTypes.${data.productType}`)" />
            </div>
        </div>
        <!-- Page Default Header Section -->
        <div :class="['page-container']">
            <div class="content-container">
                <div v-html="data.content" />
            </div>
        </div>
    </div>
</template>

<script>
    import mixin from '@/functions/mixin.vue';
    export default {
        layout: 'panel',
        mixins: [mixin],
        async asyncData({
            store,
            route
        }) {
            const id = route.params.id;
            let res = await store.dispatch('release/fetchReleaseById', id);
            return {
                data: res,
                id
            };
        },
        computed: {},
        watch: {},
        data: () => ({}),
        methods: {
            async onLoad() {},
            goTo(pageId) {
                let obj = {};
                let params = {
                    id: pageId
                };
                _.set(obj, 'params', params);
                this.$pushRoute('releaseNotes-id', obj);
            }
        },
        beforeMount() {
            this.onLoad();
        }
    }
</script>