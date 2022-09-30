<template>
    <div class="faq-page">
        <!-- Page Default Header Section -->
        <div class="page-header">
            <breadcrumb :addition="_.size(form.productTypes) > 1 ? [{
                name: $t('faq.title')
            }] : [{
                name: $t('faq.title'),
                path: 'faq'
            },{
                name: `${$t(`productTypes.${form.productTypes[0]}`)} ${$t('faq.title')}`
            }]" />
            <div class="header">
                <div class="title">
                    <i :class="['back-button', $icon('angle-left', 'far')]" v-if="_.eq(_.size(form.productTypes), 1)"
                        @click="changeType('all')" />
                    <span class="text" v-html="$t('faq.title')" v-if="_.size(form.productTypes) > 1" />
                    <span class="text" v-html="`${$t(`productTypes.${form.productTypes[0]}`)} ${$t('faq.title')}`"
                        v-else />
                </div>
            </div>
            <div class="faq-filters">
                <div :class="['wide-section', 'individual-section']">
                    <div :class="['form-input', 'with-icon']">
                        <i :class="['prefix-icon', $icon('search', 'fal')]" />
                        <el-input type="text" :placeholder="$t('faq.filter.search')" v-model="form.keyword" clearable
                            @keyup.native.enter="search()" />
                    </div>
                </div>
                <el-button :class="['action-button']" @click="search()">
                    <i :class="$icon('search')" />
                    <span v-html="$t('search')" />
                </el-button>
                <el-button type="text" :class="['reset-button']" @click="resetFilter()" v-show="haveFilter">
                    <span v-html="$t('reset')" />
                </el-button>
            </div>
        </div>
        <!-- Page Default Header Section -->
        <div :class="['page-container']">
            <div class="modules-list-view" ref="modules-list-view" v-show="!searchKeyword"
                v-if="_.size(form.productTypes) > 1">
                <div class="all-modules">
                    <div class="module-section" v-for="type in productTypes" :key="type">
                        <div class="module-header">
                            <img :src="require(`~/assets/images/faq/${type}.png`)" />
                            <span class="header" v-html="$t(`faq.modules.${type}`)" />
                            <span class="view-all" v-html="`${$t('viewAll')} (${_.size(_.get(data, type))})`"
                                @click="changeType(type)" />
                        </div>
                        <div class="module-question-list">
                            <faq-question :item="item" :showTag="false" :regExpKeyword="regExpKeyword"
                                v-for="item, index in _.take(_.get(data, type), 3)" :key="index" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="modules-filtered-view" v-if="searchKeyword || _.eq(_.size(form.productTypes), 1)">
                <div class="container-header" v-if="searchKeyword"
                    v-html="$t('faq.filteredNum', [_.size(filterData), decodeURI(searchKeyword)])" />
                <div class="module-section">
                    <faq-question :item="item" :showTag="_.eq(currentType, 'all')" :regExpKeyword="regExpKeyword"
                        :searchKeyword="searchKeyword"
                        v-for="item, index in !searchKeyword ? _.get(data, form.productTypes[0]) : filterData"
                        :key="index" />
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
            store,
            route
        }) {
            var searchKeyword = decodeURI(route.query.k);
            var currentType = route.params.type;
            var productTypes = ['TMM', 'SMM', 'FOURS'];
            let form = {
                keyword: _.eq(searchKeyword, 'undefined') ? '' : searchKeyword,
                productTypes: _.eq(currentType, 'all') ? productTypes : [currentType],
                functionType: ""
            };
            let res = await store.dispatch('faq/fetchFAQs', form);
            return {
                data: _.groupBy(res, 'productType'),
                form,
                productTypes,
                filterData: [],
                currentType
            };
        },
        computed: {
            haveFilter() {
                return _.size(this.form.keyword);
            },
            searchKeyword() {
                return this.$route.query.k;
            }
        },
        watch: {
            'searchKeyword': {
                handler: _.debounce(function () {
                    this.refetch();
                }, 0),
                deep: true,
                immediate: false
            }
        },
        data: () => ({}),
        methods: {
            async onLoad() {},
            search() {
                let obj = {};
                let query = {
                    k: encodeURI(this.form.keyword)
                };
                _.set(obj, 'query', query);
                this.$replaceRoute(obj);
            },
            //^^^^^^^^^^^^^^^^^^^^^^^ Tab Actions
            resetFilter() {
                _.set(this.form, 'keyword', '');
                let query = Object.assign({}, this.$route.query);
                delete query.k;
                this.$router.replace({
                    query
                });
                this.refetch();
            },
            changeType(type) {
                let obj = {};
                let params = {
                    type
                };
                _.set(obj, 'params', params);
                this.$pushRoute('faq-type', obj);
            },
            //^^^^^^^^^^^^^^^^^^^^^^^ Tab Actions
            async refetch() {
                this.startLoad();
                this.isLoading = true;
                try {
                    let obj = {};
                    if (this.searchKeyword)
                        _.set(obj, 'keyword', decodeURI(this.searchKeyword));

                    let res = await this.$store.dispatch('faq/fetchFAQs', {
                        ...obj,
                        productTypes: this.productTypes
                    });
                    if (this.searchKeyword) {
                        this.filterData = res;
                    } else {
                        this.data = _.groupBy(res, 'productType');
                    }
                    this.$forceUpdate();
                } catch (err) {
                    this.errorAPI(err);
                }
                this.isLoading = false;
                this.endLoad();
            },
            regExpKeyword(text) {
                if (this.searchKeyword) {
                    const regex = new RegExp(decodeURI(this.searchKeyword), 'ig');
                    return text.replaceAll(regex, `<span class="keyword">${decodeURI(this.searchKeyword)}</span>`);
                } else {
                    return text;
                }
            }
        },
        beforeMount() {
            this.onLoad();
        }
    }
</script>