<template>
    <div id="app">
        <h3 style="text-align: center">kuke-ui示例</h3>
        <div class="clist">
            <div><a href="#/SearchBar">SearchBar</a></div>
            <div><a href="#/SumSearchBar">SumSearchBar</a></div>
            <div><a href="#/tabbar">TabBar</a></div>
            <div><a href="#/routerbar">RouterBar</a></div>
            <div><a href="#/sidebar">SideBar</a></div>
            <div><a href="#/showline">ShowLine</a></div>
        </div>
        <div>
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
export default {
    name: 'app',
}
</script>
<style lang="less" scoped>
    #app {
        padding: 30px;
    }
    .clist {
        display: flex;
        justify-content: center;
        div{
            margin: 0 30px;
        }
    }
</style>
