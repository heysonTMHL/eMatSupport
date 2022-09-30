<template>
    <div class="grid-item" @click="viewData(item.id)">
        <img class="note-icon" :src="require(`~/assets/images/releaseNote.png`)" />
        <div class="item-info">
            <div class="inline-item">
                <div class="sub-title" v-html="$t('release.title')" />
                <div :class="['product-type', item.productType]" v-html="$t(`productTypes.${item.productType}`)" />
            </div>
            <div class="title" v-html="item.title" />
            <div class="inline-item">
                <div class="release-type" v-html="$t(`release.releaseTypes.${item.releaseType}`)" />
                <div class="created-at" v-html="$date(item.createdAt)" />
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
                this.$pushRoute('releaseNotes-id', obj);
            }
        },
        beforeMount() {
            this.onLoad();
        }
    }
</script>