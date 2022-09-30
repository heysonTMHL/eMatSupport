<template>
    <div class="breadcrumb">
        <div class="item" v-html="$t('home.home')" @click="redirectToHome()" />
        <div class="item" v-html="item.name" v-for="item in addition" :key="item" v-show="_.size(addition)"
            @click="redirectTo(item)" />
    </div>
</template>

<script>
    import mixin from '@/functions/mixin.vue';
    export default {
        mixins: [mixin],
        props: ['addition'],
        computed: {},
        watch: {},
        data: () => ({}),
        methods: {
            async onLoad() {},
            redirectToHome() {
                this.$pushRoute('index');
            },
            redirectTo(path) {
                if (!path.path)
                    return;

                if (!_.eq(path.path, 'faq')) {
                    this.$pushRoute(path.path);
                } else {
                    let obj = {};
                    let params = {
                        type: 'all'
                    };
                    _.set(obj, 'params', params);
                    this.$pushRoute('faq-type', obj);
                }
            },
        },
        beforeMount() {
            this.onLoad();
        }
    }
</script>