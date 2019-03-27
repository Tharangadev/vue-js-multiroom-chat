<template>
  <li>
    <el-tag>E</el-tag>
    <span>{{user}}</span>
  </li>
</template>
<script>
export default {
  name: "single_user",
  props: ["user"]
};
</script>
<style lang="scss" scoped>
li {
  font-size: 14px;
  line-height: 40px;
  span {
    padding-left: 14px;
  }
}
</style>
