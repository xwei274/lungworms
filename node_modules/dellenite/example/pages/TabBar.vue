<template>
    <div>
        <h4>tabbar tab切换:</h4>
        <kuke-tabbar :tabconfig="tabbarconfig" @changetab="changeTab"></kuke-tabbar>
    </div>
</template>
<script>
export default {
    name: 'app',
    components: {

    },
    data(){
        return {
            tabbarconfig: [
                {
                    id: '1',
                    name: '标签1',
                    count: 3,
                    selected: false
                },
                {
                    id: '2',
                    name: '标签1',
                    count: 0,
                    selected: true
                },
                {
                    id: '3',
                    name: '标签1',
                    count: 0,
                    selected: false
                },
                {
                    id: '4',
                    name: '标签1',
                    count: 0,
                    selected: false
                },
            ]
        }
    },
    methods: {
        // 搜索回调事件
        getSearchData(postdata){
            console.log(postdata)
        },
        changeTab(index){
            console.log('tab切换');
            console.log(index);
            this.tabbarconfig[index].count = 0;
        }
    }
}
</script>
<style lang="less" scoped>

</style>
