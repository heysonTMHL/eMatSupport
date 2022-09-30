<template>
    <div v-if="loading" class="page-load">
        <div class="lds-grid">
            <div v-for="i in 9" :key="i" />
        </div>
    </div>
</template>

<script>
    export default {
        data: () => ({
            loading: false
        }),
        methods: {
            start() {
                this.loading = true
            },
            finish() {
                this.loading = false
            }
        }
    }
</script>