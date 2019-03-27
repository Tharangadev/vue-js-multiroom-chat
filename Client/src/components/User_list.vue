<template>
    <div>
        <p class="subtitle">Users</p>
        <ul class="users">
            <Single_user v-for="(user,key) in users" :key="key" :user="user"></Single_user>
        </ul>
    </div>
</template>
<script>
    import Single_user from "./userlist/Singleuser";

    export default {
        name: "User_list",
        components: {
            Single_user
        },
        props: ["users"],
        data() {
            return {};
        }
    };
</script>
<style lang="scss" scoped>
    .subtitle {
        padding: 6px 10px;
        font-weight: 600;
    }

    .users {
        margin: 0px;
        padding: 0px;

        li {
            list-style: none;
            line-height: 40px;
            font-size: 14px;
            padding: 10px;

            span {
                margin-left: 10px;
            }
        }
    }
</style>
