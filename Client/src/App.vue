<template>
    <div id="app">
        <el-container>
            <el-aside width="200px" class="control_area">
                <!--        <div class="settings">-->
                <!--          <settings></settings>-->
                <!--        </div>-->
                <div class="side_blocks">
                    <Channel_list :list="roomdata.rooms" :active="roomdata.current_room"></Channel_list>
                    <div class="direct_messages">
                        <user_list :users="roomdata.users"></user_list>
                    </div>
                </div>
            </el-aside>
            <el-container>
                <el-header class="channel_header">

                    <h1>{{roomdata.current_room}} Channel</h1>

                </el-header>
                <el-main class="massege_container">
                    <chat_body :messages="user_messages"></chat_body>
                </el-main>
                <el-footer class="footer">
                    <el-row type="flex">
                        <el-input type="textarea" v-model="chat_block" class="chat-input"></el-input>
                        <el-button type="primary" v-on:click="send">send</el-button>
                    </el-row>
                </el-footer>
            </el-container>
        </el-container>
    </div>
</template>
<script>
    import Channel_list from "./components/Channel_list.vue";
    import User_list from "./components/User_list.vue";
    import settings from "./components/Settings.vue";
    import chat_body from "./components/chat_body.vue";

    import store from "./store/store";
    import io from "socket.io-client";

    export default {
        name: "app",
        components: {
            Channel_list,
            User_list,
            settings,
            chat_body
        },
        data() {
            return {
                chat_block: "sdsd"
            };
        },
        computed: {
            roomdata() {
                return this.$store.state.room_data;
            },
            user_messages() {
                return this.$store.state.messages;
            }
        },
        methods: {
            send() {
                socket.emit("chat_message", this.chat_block);
            }

        },
        created() {
            socket.on("connect", () => {
                socket.emit("adduser", prompt("enter the name", `user${Math.floor(Math.random() * 100 + 1)}`));
                socket.on("chat_update", (data) => {
                    this.$store.dispatch('common_message', data)
                })
                socket.on('site_data', (data) => {
                    this.$store.dispatch('adding_roomdata', data)
                })
            });

        }
    };
</script>
<style lang="scss">
    @import url("https://fonts.googleapis.com/css?family=Nunito");

    #app {
        font-family: "Nunito", sans-serif;
        height: 100vh;
    }

    .channel_header {
        padding: 10px;
        background: #409EFF;
        height: auto !important;
        color: #fff;
        display: flex;
        align-items: center;
        display: table-cell;

        h1 {
            padding: 10px 0px;
        }

        * {
            padding: 0px;
            margin: 0px;
        }
    }

    body {
        margin: 0px;
        height: 100vh;
        overflow: hidden;
    }

    .massege_container {
        padding: 10px 0px 10px 0px !important;
        height: calc(100vh - 120px);
    }

    .control_area {
        background: #d9e9ff;
        color: #303133;
        overflow-y: scroll !important;
        height: 100vh;
    }


    .chat-input {
        margin-right: 10px;
    }

    .el-footer {
        padding: 10px !important;
    }

    .footer {
        position: absolute;
        bottom: 0px;
        width: calc(100% - 200px);
        background: #eee;
        height: auto !important;
    }

    .chat_body {
        height: calc(100% - 74px);
        overflow-y: scroll;
    }
</style>