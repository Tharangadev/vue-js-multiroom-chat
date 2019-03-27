<template>
    <div class="chat_body">
        <div v-for="(message,key) in messages" :key="key">
            <Single_message :message="message"></Single_message>
        </div>
    </div>
</template>
<script>
    import Single_message from "../components/Singlemessage.vue";

    export default {
        components: {Single_message},
        props: ["messages"],
        data() {
            return {};
        }
    };
</script>
<style lang="sass" scoped>

</style>
