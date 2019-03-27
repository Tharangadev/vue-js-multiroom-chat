<template>
    <div class="channels">
        <p class="subtitle">Channels</p>
        <div class="channel_list">
            <ul>
                <li v-for="(single_channel,key) in list" :key="key" v-on:click="switchroom(single_channel)"
                    v-bind:class="{current_class:(single_channel===active)}">
                    <el-tag>{{single_channel[0]}}</el-tag>
                    <span class="channel_nick">{{single_channel}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>
<style lang="scss" scoped>

    .subtitle {
        padding: 6px 10px;
        font-weight: 600;
    }

    .channel_list {
        ul {
            margin: 0px;
            padding: 0px;

            li {
                list-style: none;
                line-height: 40px;
                font-size: 14px;
                padding: 10px;

                .channel_nick {
                    margin-left: 10px;
                }
            }

            .current_class {
                background: red;
            }
        }
    }
</style>
<script>
    export default {
        name: "Channel_list",
        props: ["list", "active"],
        data() {
            return {
                joined_rooms: []
            };
        },
        methods: {
            switchroom(newroom) {
                this.$store.dispatch('clearnthemessages')
                socket.emit('switchrooms', newroom)
            }

        }

    };
</script>

