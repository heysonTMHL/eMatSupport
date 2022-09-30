<template>
    <div class="video-player-section">
        <video ref="videoPlayer" class="video-js vjs-big-play-centered vjs-theme-city"></video>
    </div>
</template>

<script>
    import videojs from 'video.js';
    export default {
        props: ['src'],
        computed: {},
        watch: {},
        data() {
            return {
                options: {
                    controls: true,
                    autoplay: false,
                    sources: [{
                        src: undefined,
                        type: "video/mp4"
                    }]
                },
                videoPlayer: undefined,
                length: 0
            };
        },
        methods: {
            async fetchVideo() {
                _.set(this.options.sources[0], 'src', this.src);
                this.videoPlayer = videojs(this.$refs.videoPlayer, this.options);
            }
        },
        mounted() {
            this.fetchVideo();
        },
        beforeDestroy() {}
    }
</script>