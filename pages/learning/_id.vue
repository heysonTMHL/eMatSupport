<template>
    <div class="learning-detail-page">
        <!-- Page Default Header Section -->
        <div class="page-header">
            <breadcrumb :addition="[{
                name: $t('learning.title'),
                path: 'learning'
            },{
                name: data.title
            }]" />
            <div class="header">
                <div class="title">
                    <span class="text" v-html="data.title" />
                </div>
                <div class="actions">
                    <el-button :class="['plain-button']" @click.stop="copyLink()">
                        <i :class="$icon('link', 'far')" />
                        <span v-html="$t('learning.detail.copyLink')" />
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
            <div :class="['content-container', data.learningFormat]">
                <learning-video :src="data.contentUrl" v-if="_.eq(data.learningFormat, 'VIDEO')" />
                <div v-html="data.content" v-else />
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
            let res = await store.dispatch('learning/fetchLearningById', id);
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
            copyLink() {
                navigator.clipboard.writeText(window.location.href);
                this.msg({
                    title: this.$t('learning.detail.copied')
                }, 'info');
            }
        },
        beforeMount() {
            this.onLoad();
        }
    }
</script>