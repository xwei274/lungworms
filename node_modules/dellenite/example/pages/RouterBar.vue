<template>
<div>
    <h4>Router切换:</h4>
    <kuke-routerbar :routerconfig='tabConfigData' @changerouter="changeTab"></kuke-routerbar>
</div>
</template>
<script>
export default {
    data(){
        return {
            tabConfigData: [
                {
                    id: '1',
                    name: '标签1',
                    count: 3,
                    selected: false,
                },
                {
                    id: '2',
                    name: '标签2',
                    count: 0,
                    selected: true,
                },
                {
                    id: '3',
                    name: '标签3',
                    count: 3,
                    selected: false,
                },
                {
                    id: '4',
                    name: '标签4',
                    count: 0,
                    selected: false,
                },
            ]
        }
    },
    methods: {
        changeTab(index){
            this.tabConfigData[index].count = 0;
        }
    }
}
</script>
<style lang="less" scoped>

</style>
