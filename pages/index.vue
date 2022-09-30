<template>
    <div class="home-page">
        <div class="page-container">
            <div class="left-side">
                <div class="release-notes-list-view">
                    <div class="container-header">
                        <div v-html="$t('home.release')" />
                        <span class="view-all" v-html="`${$t('viewAll')} (${_.size(releaseNotes)})`" @click="$pushRoute('releaseNotes')" />
                    </div>
                    <div class="data-grid-view" ref="data-grid-view">
                        <releaseNote-item :item="item" v-for="item, index in releaseNotes" :key="index" />
                    </div>
                </div>
                <div class="support-contacts">
                    <div class="container-header">
                        <div v-html="$t('home.support')" />
                    </div>
                    <div class="data-contact-view" ref="data-contact-view">
                        <div class="item" v-for="item, index in supports" :key="index">
                            <div class="name" v-html="`${item.support_firstname} ${item.support_lastname}`" />
                            <div class="phone" v-html="item.contact_no" />
                            <div class="email" v-html="item.email" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="right-side">
                <div class="learnings-grid-view">
                    <div class="container-header">
                        <div v-html="$t('home.learning')" />
                        <span class="view-all" v-html="`${$t('viewAll')} (${_.size(learnings)})`" @click="$pushRoute('learning')" />
                    </div>
                    <div class="data-grid-view" ref="data-grid-view">
                        <learning-item :item="item" v-for="item, index in learnings" :key="index" />
                    </div>
                </div>
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
            route,
            store
        }) {
            var productTypes = ['FOURS', 'TMM', 'SMM'];
            let [releaseNotes, learnings, supports] = await Promise.all([
                new Promise(async (resolve, reject) => {
                    let res = {};
                    try {
                        let form = {
                            title: "",
                            dateRange: [],
                            releaseType: ""
                        };
                        res = await store.dispatch('release/fetchReleases', {
                            ..._.omit(form, ['dateRange']),
                            fromDate: _.head(form.dateRange),
                            toDate: _.last(form.dateRange),
                            productTypes
                        });
                    } catch (e) {}
                    resolve(res.releaseNotes);
                }),
                new Promise(async (resolve, reject) => {
                    let res = {};
                    try {
                        let form = {
                            title: "",
                            learningFormat: "",
                            functionType: ""
                        };
                        res = await store.dispatch('learning/fetchLearnings', {
                            ...form,
                            productTypes
                        });
                    } catch (e) {}
                    resolve(res.learnings);
                }),
                new Promise(async (resolve, reject) => {
                    let res = {};
                    try {
                        res = await store.dispatch('fetchContacts');
                    } catch (e) {}
                    resolve(res);
                })
            ]);
            return {
                releaseNotes,
                learnings,
                supports
            }
        },
        computed: {},
        watch: {},
        data: () => ({}),
        methods: {},
        beforeMount() {}
    }
</script>