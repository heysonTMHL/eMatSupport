<template>
    <div class="grid-item" @click="viewData(item.id)">
        <el-image class="image" src="" fit="cover">
            <div class="no-image" slot="error" />
        </el-image>
        <div class="item-info">
            <div class="grid-inline">
                <div class="title" v-html="item.title" />
                <!-- <i :class="['isRecommended', $icon('star')]" /> -->
            </div>
            <div class="updated-at" v-html="$t('learning.detail.updatedAt', [$date(item.updatedAt)])" />
            <div class="grid-inline">
                <div :class="['product-type', item.productType]" v-html="$t(`productTypes.${item.productType}`)" />
                <div :class="['learning-format', item.learningFormat]"
                    v-html="$t(`learning.learningFormats.${item.learningFormat}`)" />
                <div class="function-type" v-html="$t(`learning.functionTypes.${item.functionType}`)" />
                <i :class="['link', $icon('link')]" @click.stop="copyLink(item.id)" />
            </div>
        </div>
    </div>
</template>

<script>
    import mixin from '@/functions/mixin.vue';
    export default {
        mixins: [mixin],
        props: ['item'],
        computed: {},
        watch: {},
        data: () => ({}),
        methods: {
            async onLoad() {},
            viewData(id) {
                let obj = {};
                let params = {
                    id
                };
                _.set(obj, 'params', params);
                this.$pushRoute('learning-id', obj);
            },
            copyLink(id) {
                var path = `https://${window.location.hostname}/${this.langauge}/learning/${id}`;
                navigator.clipboard.writeText(path);
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