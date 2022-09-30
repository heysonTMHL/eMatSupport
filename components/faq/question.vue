<template>
    <div class="item">
        <div class="title" @click="_.size(searchKeyword) > 0 ? undefined : display = !display">
            <i :class="['toggle-icon', $icon(!display ? 'plus' :'minus')]" />
            <span v-html="regExpKeyword(_.get(item, `question${capLangauge}`))" />
        </div>
        <div class="answer" v-html="regExpKeyword(_.get(item, `answer${capLangauge}`))"
            v-show="display || _.size(searchKeyword) > 0" />
        <div :class="['module', item.productType]" v-html="$t(`faq.modules.${item.productType}`)" v-if="showTag"
            v-show="display || _.size(searchKeyword) > 0 " />
    </div>
</template>

<script>
    import mixin from '@/functions/mixin.vue';
    export default {
        mixins: [mixin],
        props: ['item', 'regExpKeyword', 'showTag', 'searchKeyword'],
        computed: {},
        watch: {},
        data: () => ({
            display: true
        }),
        methods: {
            async onLoad() {
                this.display = _.size(this.searchKeyword) > 0;
                this.$forceUpdate();
            }
        },
        beforeMount() {
            this.onLoad();
        }
    }
</script>