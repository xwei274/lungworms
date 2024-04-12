<template>
    <div class="kuke-sidebar">
        <div class="kuke-sidebar_content" :class="{ hideLeft: hideLeftBar }">
            <ul>
                <li :class="{active:index === defaultItem}" v-for="(item, index) in menudata" @click="menuClick(item, index)" :key="index">
                    <span class="iconContainer"><i class="iconfont" :class="item.icon"></i></span>
                    <span class="menuText">{{item.childName}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        sideconfig: {
            type: Array,
            default: function(){
                return []
            }
        },
        hidesidebar: {
            type: Boolean,
            default: false
        }
    },
    data(){
        return {
            menudata: [],
            hideLeftBar: this.hisesidebar,
            defaultItem: ''
        }
    },
    watch:{
        sideconfig(newVal){
            this.defaultItem = '';
            this.loadMenu();
        },
        $route(newVal){
            this.defaultItem = '';
            this.loadMenu();
        }
    },
    methods: {
        menuClick(item, index){
            this.defaultItem = index;
            if(this.$route.path.split('/').indexOf(item.id) < 0){
                this.$router.push('/' + item.id);
            }
            this.$emit('changemenu', index);
        },
        hideBar(){
            this.hideLeftBar = this.hideLeftBar ? false : true;
        },
        loadMenu(){
            let self = this;
            let routeArr = self.$route.path.split('/');
            if(self.sideconfig.length > 0){
                self.menudata = self.sideconfig.map(function(item, index){
                    if(routeArr.indexOf(item.id) >= 0){
                        self.defaultItem = index;
                    }
                    return item;
                });
                if(self.defaultItem != ''){
                    self.menuClick(self.menudata[self.defaultItem], self.defaultItem);
                }else if(self.$route.path == '/'){
                    self.defaultItem = 0;
                    self.menuClick(self.menudata[self.defaultItem], self.defaultItem);
                }
            }
        },
    },
    created(){
        console.log('打印获取的数据');
        console.log(this.sideconfig);
        this.loadMenu();
    },
    mounted(){
        console.log('打印');
    }

}
</script>
<style lang="less" scoped>
 /*移动端*/
    @media (max-width: 768px) {
        .kuke-sidebar {
            display: none !important;
        }
    }
    .kuke-sidebar{
        .kuke-sidebar_close {
            width: 20px;
            height: 50px;
            position: fixed;
            left: 0;
            top: 0;
            border: 1px solid rgba(211, 211, 211, .4);
            z-index: 10;
            line-height: 50px;
            cursor: pointer;
            text-align:center;
            font-size:20px;
            .iconfont{
                color:#fff;
            }
        }
        .kuke-sidebar_content {
            position: fixed;
            top: 50px;
            bottom: 0;
            left:0;
            width: 140px;
            padding: 50px 0;
            z-index: 9;
            box-shadow: 0 0 6px 0 rgba(0, 0, 0, .2);
            background-color: #fff !important;
            transition-duration: .5s;
            &.hideLeft{
                 left:-140px;
             }
            ul{
                border-bottom: 1px solid #fff;
                padding-bottom: 6px;
                border-color: rgba(0, 0, 0, .12) !important;
                li{
                    height: 40px;
                    line-height:40px;
                    color: #fff;
                    cursor: pointer;
                    padding-left:15px;
                    text-align:left;
                    font-size: 13px;
                    color: rgba(0, 0, 0, .87) !important;
                    &:not(.active):hover{
                         background-color: rgba(0, 0, 0, .04);
                     }
                    &.active{
                         background:#bae4e2;
                     }
                    .iconContainer{
                        font-size: 16px;
                        display:inline-block;
                        width:20px;
                        color:#2196f3;
                    }
                }
            }
        }
    }
</style>
