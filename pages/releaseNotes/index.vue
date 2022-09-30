<template>
    <div class="release-page">
        <!-- Page Default Header Section -->
        <div class="page-header">
            <breadcrumb :addition="[{
                name: $t('release.title')
            }]" />
            <div class="header">
                <div class="title">
                    <span class="text" v-html="$t('release.title')" />
                </div>
            </div>
            <div class="filters">
                <div :class="['individual-section']">
                    <div :class="['form-input', 'with-icon']">
                        <i :class="['prefix-icon', $icon('search', 'fal')]" />
                        <el-input type="text" :placeholder="$t('release.filter.search')" v-model="form.title"
                            clearable />
                    </div>
                </div>
                <div :class="['individual-section']">
                    <div :class="['form-input']">
                        <el-select v-model="form.releaseType" :placeholder="$t('release.filter.releaseType')">
                            <el-option v-for="item in releaseTypes" :key="item"
                                :label="$t(`release.releaseTypes.${item}`)" :value="item" />
                        </el-select>
                    </div>
                </div>
                <div :class="['individual-section']">
                    <div :class="['form-input', 'with-icon']">
                        <i :class="['prefix-icon', $icon('calendar-range', 'fal')]" />
                        <el-date-picker v-model="form.dateRange" type="daterange"
                            :start-placeholder="$t('release.filter.startDate')" value-format="yyyy-MM-dd"
                            :end-placeholder="$t('release.filter.endDate')" :clearable="false" />
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
            <div class="data-list-view" ref="data-list-view">
                <div :class="['table-section']">
                    <table class="table">
                        <tr class="table-header">
                            <th :class="['sorting', 'id']" v-html="`ID #`" @click="reorder('createdAt')" />
                            <th :class="['sorting']" @click="reorder('releaseDate')"
                                v-html="$t('release.filter.releaseDate')" />
                            <th :class="['sorting']" @click="reorder('title')" v-html="$t('release.filter.title')" />
                            <th :class="['sorting']" @click="reorder('productType')"
                                v-html="$t('release.filter.productType')" />
                            <th :class="['sorting']" @click="reorder('version')"
                                v-html="$t('release.filter.version')" />
                            <th :class="['sorting']" @click="reorder('releaseType')"
                                v-html="$t('release.filter.releaseType')" />
                        </tr>
                        <tbody v-for="item, index in _.orderBy(data, [orderBy], [ordering])" :key="index"
                            @click="viewData(item.id)" v-show="(index >= (10 * (page - 1)) && index < (10 * page))">
                            <tr :class="['table-item']">
                                <td class="id" v-html="item.id" />
                                <td v-html="item.releaseDate" />
                                <td v-html="item.title" />
                                <td>
                                    <span :class="['product-type', item.productType]"
                                        v-html="$t(`productTypes.${item.productType}`)" />
                                </td>
                                <td v-html="item.version" />
                                <td v-html="$t(`release.releaseTypes.${item.releaseType}`)" />
                            </tr>
                        </tbody>
                    </table>
                    <el-pagination :current-page.sync="page" :pager-count="10" layout="prev, pager, next"
                        :total="_.size(data)" @current-change="changePage" />
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
            store
        }) {
            var productTypes = ['FOURS', 'TMM', 'SMM'];
            let form = {
                title: "",
                dateRange: [],
                releaseType: ""
            };
            let res = await store.dispatch('release/fetchReleases', {
                ..._.omit(form, ['dateRange']),
                fromDate: _.head(form.dateRange),
                toDate: _.last(form.dateRange),
                productTypes
            });
            return {
                data: res.releaseNotes,
                form,
                page: 1,

                //^^^^^^^^^^^^^^^^^^^^^^^ Tab
                tabValue: '0',
                totalCount: res.totalCount,
                isLoading: false,
                tabs: ['ALL', 'FOURS', 'TMM', 'SMM'],
                currentTab: 'ALL',
                //^^^^^^^^^^^^^^^^^^^^^^^ Tab

                orderBy: 'createdAt',
                ordering: 'desc',
                releaseTypes: ['CONTINUOUS', 'BUG'],
                productTypes
            };
        },
        computed: {
            haveFilter() {
                return _.size(this.form.title) || _.size(this.form.releaseType) || _.size(this.form.dateRange);
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
                        if (value && !_.eq(key, 'dateRange'))
                            _.set(obj, key, value);
                        if (_.size(value) && _.eq(key, 'dateRange')) {
                            _.set(obj, 'fromDate', _.head(value));
                            _.set(obj, 'toDate', _.last(value));
                        }
                    })
                    let res = await this.$store.dispatch('release/fetchReleases', {
                        ...obj,
                        productTypes: _.eq(this.currentTab, 'ALL') ? this.productTypes : [this.currentTab]
                    });
                    this.data = res.releaseNotes;
                    this.totalCount = res.totalCount;
                    this.$forceUpdate();
                } catch (err) {
                    this.errorAPI(err);
                }
                this.isLoading = false;
                this.endLoad();
            },
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