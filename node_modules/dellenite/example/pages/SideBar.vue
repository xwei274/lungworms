<template>
    <div style="text-align: center;">
    <!-- <div> -->
        <h4>侧边导航:</h4>
        <a onclick="return false" href="http://www.baidu.com">hello</a>
        <kuke-sidebar ref="sideBar" :sideconfig="sideconfig" :hidesidebar="hideLeft" @changemenu="changeMenu"></kuke-sidebar>
        <Button @click="closeBar" type="info">close sideBar</Button>
    </div>
</template>
<script>
export default {
    data(){
        return {
            sideconfig: [
                {
                    childName: 'Student',
                    id: 'SideBar',
                    num: 0,
                    icon: 'icon-zhaopin',
                },
                {
                    childName: 'Leave',
                    id: 'SideBar',
                    num: 0,
                    icon: 'icon-wendang',
                },
                {
                    childName: 'Channel',
                    id: 'Channel',
                    num: 0,
                    icon: 'icon-releave'
                },
                {
                    childName: 'Order',
                    id: 'Order',
                    num: 0,
                    icon: 'icon-releave'
                },
                {
                    childName: 'ClsRecord',
                    id: 'ClsRecord',
                    num: 0,
                    icon: 'icon-releave'
                }
            ],
            hideLeft: false
        }
    },
    methods: {
        changeMenu(item){
            console.log(item);
        },
        closeBar(){
            console.log('打印方法');
            console.log(this.$refs);
            console.log(this.$refs.sideBar);
            this.$refs.sideBar.hideBar()
        }
    },
    mounted(){
        console.log('进入页面2');
    }
}
</script>
<style lang="less" scoped>

</style>
