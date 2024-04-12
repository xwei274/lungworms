<template>
    <div class="kuke-showLine" @clickoutside="handleCloseOptions">
        <div class="kuke-showLine_box" @click="showList">
            Show Line
            <i class="iconfont icon-caret" :class="{rotated: !status}"></i>
        </div>
        <ul class="kuke-showLine_ul" :class="{hide:status}">
            <li v-for="(item, index) in lineconfig" v-if="item.lineName" :key="index">
                <Checkbox v-model="checkArr[index]" :label="item.lineName" @on-change="getChange">{{item.lineName}}</Checkbox>
            </li>
        </ul>
    </div>
</template>
<script>
import clickoutside from '../../utils/clickoutside';
export default {
    props: {
        lineconfig: {
            type: Array,
            default(){
                return []
            }
        },
        linename: {
            type: String,
            default: 'listName',
        }
    },
    directives: {
        clickoutside
    },
    watch: {
        lineconfig(newVal){
            this.loadData();
        },
        linename(newVal){
            this.loadData();
        }
    },
    data(){
        return {
            status: true,
            checkArr: [],
        }
    },
    methods: {
        handleCloseOptions(){
            this.status = true;
        },
        showList(){
            this.status = this.status ? false : true;
        },
        getChange(val){
            let self = this;
            let newArr = [];
            for(let j = 0; j < self.lineconfig.length; j++){
                if(self.checkArr[j] === true){
                    newArr.push(self.lineconfig[j]);
                }
            }
            if(self.checkArr.length > self.lineconfig.length){
                self.checkArr.splice(self.lineconfig.length, self.checkArr.length-self.lineconfig.length);
            }
            if(self.linename != ""){
                window.localStorage.setItem(self.linename, self.checkArr);
            }
            self.$emit('definedList', newArr);
        },
        loadData(){
            let self = this;
            // 获取localstorge的list
            if(window.localStorage.getItem(self.linename)){
                let keyStr = window.localStorage.getItem(self.linename);
                let keyArr = keyStr.split(',');
                if(keyArr.length < self.lineconfig.length){
                    let temp = self.lineconfig.length - keyArr.length;
                    for(let a = 0; a < temp; a++){
                        keyArr.push(true);
                    }
                }
                if(keyArr.length > self.lineconfig.length){
                    let temp = keyArr.length - self.lineconfig.length;
                    keyArr.splice(self.lineconfig.length, temp);
                }
                let temp = [];
                for(let a in keyArr){
                    if(keyArr[a] === 'true'){
                        temp.push(self.lineconfig[a]);
                        self.checkArr[a] = true;
                    }else{
                        self.checkArr[a] = false;
                    }
                }
                self.$emit('definedList', temp);
            }else{
                for(var j = 0; j < self.lineconfig.length; j++){
                    self.checkArr[j] = true;
                }
            }
        },
    },
    created(){
        this.loadData();
    }
}
</script>
<style lang="less" scoped>
    .kuke-showLine {
        position:relative;
        padding:15px 20px 0 0 ;
        float:right;
        &:after{
            content:'';
            clear:both;
             display: block;
             height: 0;
             visibility: hidden;
         }
        .kuke-showLine_box {
            height: 30px;
            line-height:28px;
            padding:0 10px ;
            border-radius: 5px;
            border:1px solid #d7dde4;
            background:#fff;
            cursor:pointer;
            .iconfont{
                display:inline-block;
                transition:all .5s ease-in-out;
                &.rotated{
                     transform: rotate(180deg);
                 }
            }
        }
        .kuke-showLine_ul{
            background-color: #fff;
            z-index:15;
            padding:5px 5px;
            border-radius: 5px;
            border:1px solid lightgray;
            max-height: 224px;
            overflow-y: scroll;
            position: absolute;
            right:0;
            top:45px;
            &.hide{
                display: none;
             }
            li{
                box-sizing:border-box;
                padding:0 16px;
                height: 32px;
                line-height: 32px;
                max-height: 160px;
                text-overflow: ellipsis;
                white-space: nowrap;
                vertical-align: top;
            }
        }
    }
</style>
