<template>
    <div class="learning-page">
        <!-- Page Default Header Section -->
        <div class="page-header">
            <breadcrumb :addition="[{
                name: $t('learning.title')
            }]" />
            <div class="header">
                <div class="title">
                    <span class="text" v-html="$t('learning.title')" />
                </div>
            </div>
            <div class="filters">
                <div :class="['individual-section']">
                    <div :class="['form-input', 'with-icon']">
                        <i :class="['prefix-icon', $icon('search', 'fal')]" />
                        <el-input type="text" :placeholder="$t('learning.filter.search')" v-model="form.title"
                            clearable />
                    </div>
                </div>
                <div :class="['individual-section']">
                    <div :class="['form-input']">
                        <el-select v-model="form.functionType" :placeholder="$t('learning.filter.functionType')">
                            <el-option v-for="item in functionTypes" :key="item"
                                :label="$t(`learning.functionTypes.${item}`)" :value="item" />
                        </el-select>
                    </div>
                </div>
                <div :class="['individual-section']">
                    <div :class="['form-input']">
                        <el-select v-model="form.learningFormat" :placeholder="$t('learning.filter.learningFormat')">
                            <el-option v-for="item in learningFormats" :key="item"
                                :label="$t(`learning.learningFormats.${item}`)" :value="item" />
                        </el-select>
                    </div>
                </div>
                <el-button type="text" :class="['reset-button']" @click="resetFilter()" v-show="haveFilter">
                    <span v-html="$t('reset')" />
                </el-button>
            </div>
        </div>
        <!-- Page Default Header Section -->
        <div :class="['page-container']">
            <client-only>
                <el-tabs class="tabs" type="card" :value="tabValue" @tab-click="changeTab">
                    <el-tab-pane class="tab" v-for="tab in tabs" :key="tab">
                        <span class="tab-label" slot="label">
                            <span v-html="$t(`productTypes.${tab}`)" />
                            <span class="count" v-html="totalCount" v-show="showTabCount(tab)" />
                        </span>
                    </el-tab-pane>
                </el-tabs>
            </client-only>
            <!-- <div class="view-toggle">
                <div :class="['item', _.eq(view, 'grid') ? 'selected' : '']" @click="view = 'grid'">
                    <i :class="$icon('grid-4')" />
                    <span v-html="$t('viewAs.grid')" />
                </div>
                <div :class="['item', _.eq(view, 'list') ? 'selected' : '']" @click="view = 'list'">
                    <i :class="$icon('list')" />
                    <span v-html="$t('viewAs.list')" />
                </div>
            </div> -->
            <div class="data-grid-view" ref="data-grid-view">
                <learning-item :item="item" v-for="item, index in data" :key="index" />
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
            store
        }) {
            var productTypes = ['FOURS', 'TMM', 'SMM'];
            let form = {
                title: "",
                learningFormat: "",
                functionType: ""
            };
            let res = await store.dispatch('learning/fetchLearnings', {
                ...form,
                productTypes
            });
            return {
                data: res.learnings,
                form,
                page: 1,
                view: 'grid',

                //^^^^^^^^^^^^^^^^^^^^^^^ Tab
                tabValue: '0',
                totalCount: res.totalCount,
                isLoading: false,
                tabs: ['ALL', 'FOURS', 'TMM', 'SMM'],
                currentTab: 'ALL',
                //^^^^^^^^^^^^^^^^^^^^^^^ Tab

                orderBy: 'createdAt',
                ordering: 'desc',
                learningFormats: ['ARTICLE', 'VIDEO'],
                functionTypes: ['ADMIN', 'PURCHASE', 'GENERAL', 'SITE', 'FINANCE'],
                productTypes
            };
        },
        computed: {
            haveFilter() {
                return _.size(this.form.title) || _.size(this.form.learningFormat) || _.size(this.form.functionType);
            },
        },
        watch: {
            'form': {
                handler: _.debounce(function () {
                    this.refetch();
                }, 1000),
                deep: true,
                immediate: false
            }
        },
        data: () => ({}),
        methods: {
            async onLoad() {},
            //^^^^^^^^^^^^^^^^^^^^^^^ Tab Actions
            changeTab(tab) {
                const tabIndex = tab.index;
                const option = this.tabs[tabIndex];
                if (_.eq(option, this.currentTab))
                    return;
                this.currentTab = option;
                this.tabValue = tabIndex;
                this.refetch();
            },
            showTabCount(tab) {
                return _.eq(tab, this.currentTab) && !this.isLoading
            },
            resetFilter() {
                _.forEach(this.form, (value, key) => {
                    _.set(this.form, key, !_.isArray(value) ? '' : []);
                });
            },
            //^^^^^^^^^^^^^^^^^^^^^^^ Tab Actions
            async refetch() {
                this.startLoad();
                this.isLoading = true;
                try {
                    let obj = {};
                    _.forEach(this.form, (value, key) => {
                        if (value)
                            _.set(obj, key, value);
                    })
                    let res = await this.$store.dispatch('learning/fetchLearnings', {
                        ...obj,
                        productTypes: _.eq(this.currentTab, 'ALL') ? this.productTypes : [this.currentTab]
                    });
                    this.data = res.learnings;
                    this.totalCount = res.totalCount;
                    this.$forceUpdate();
                } catch (err) {
                    this.errorAPI(err);
                }
                this.isLoading = false;
                this.endLoad();
            },
            viewData(id) {}
        },
        beforeMount() {
            this.onLoad();
        }
    }
</script>