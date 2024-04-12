<template>
<div class="wrap">
    <div class="div-search" :class="{'noshow': !showbar}">
        <div class="searchitmes-wrap" >
            <div class="searchitmes" v-clickoutside="handleCloseOptions">
                <span @click="showItems()">Search items <Icon :type="showitems?'ios-arrow-up':'ios-arrow-down'"></Icon></span>
                <div class="listitmes" :class='{hidden:!showitems}'>
                    <div class="checkbox-group" v-for="(item,index) in items" :key="index">
                        <Checkbox class="checkbox" v-model="item.choose" :disabled="item.lock" @on-change="changeCheckItems(index)">
                            <span>{{item.title}}</span>
                        </Checkbox>
                    </div>
                </div>
            </div>
        </div>
        <div class="searchBar">
            <span class="searchmenu" v-for="(item,index) in config" :key="index">
                <Checkbox v-model="items[item.defaultindex].choose" :disabled="item.lock" @on-change="changeCheckItems(item.defaultindex)">
                </Checkbox>
                <label class="menutitle">{{item.title}}</label>
                <!--文本搜索-->
                <!-- <Input v-model="item.value" style="width: 180px" v-if="item.type === 'text'"></Input> -->
                <suminput v-model.trim="item.value2" style="width: 210px" v-if="item.type === 'text'" :inputconfig="item"></suminput>

                <!--date-->
                <Date-picker type="date" placeholder="Select date" v-model.trim="item.value2"
                         v-if="item.type == 'date'" @on-change="setsearchdata"></Date-picker>
                <!--daterange-->
                <Date-picker type="daterange" placeholder="Select date range" v-model.trim="item.value2" v-if="item.type === 'daterange'" :editable="false" :options="dateoption(item)"></Date-picker>

                <!--datetimerange-->
                <Date-picker v-if="item.type === 'datetimerange'" type="datetimerange" style="width:280px;" :editable="false" placeholder="Select datetime range" v-model.trim="item.value2" ></Date-picker>

                <!-- int -->
                <intinput v-model.trim="item.value2" v-if="item.type === 'int'"  :inputconfig="item">
                </intinput>

                <!--下拉搜索-->
                <searchbarselect v-model.trim="item.value2" v-if="item.type === 'select'" :disabled="item.lock" :singleton="item.singleton" :selectconfig="item">
                </searchbarselect>

            </span>
            <Button type="primary" icon="ios-search" v-on:click="setsearchdata">Search</Button>
        </div>
    </div>
    <div class="show-bar" @click="showSearchBar()"><Icon :type="showbar?'chevron-up':'chevron-down'"></Icon></div>
</div>    
</template>

<script>
    import searchbarselect from './SumSearchBarSelect.vue';
    import suminput from './SumSearchInput.vue';
    import intinput from './SumSearchIntInput.vue';
    import Clickoutside from '../../utils/clickoutside';

    export default {
        components: {
            searchbarselect,
            intinput,
            suminput
        },
        directives: {
            Clickoutside
        },
        props: {
            name:{
                type:String,
                default:'ItemsName',
            },
            //搜索配置数组
            searchconfig:{
                type: Array,
                default: function () {
                    return {
                        type: 'text'
                    }
                }
            }
        },
        data() {
            return {
                showitems: false,
                showbar:true,
                items:[],
                checkIndex:[],
                config: [],
                postdata: {},
                t1:'',
                t2:'',
                dateoption:function(item){
                    return {
                        disabledDate:function(date){
                            if(item.disableAfter){
                                return date && date.valueOf() > (+item.disableAfter)*1000;
                            }else if(item.disableBefore){
                                return date && date.valueOf() < (+item.disableBefore)*1000;
                            }
                        }
                    }
                   
                }
                
            }
        },

        watch: {
            searchconfig(newval, oldval){
                console.log('执行了');
                this.config = newval;
                this.items = newval;
                this.postdata = {};
                this.initCheckitems();
            }
        },

        methods: {
            getpostdata(){
                let _self = this;
                 _self.postdata = {};
                 _self.postdata.validate = true;
                for (let i = 0;i<_self.config.length;i++) {
                    let item = _self.config[i];
                    if(item.type=='int'&& item.value2 ==''){
                        // this.$message({
                        //     message: "Please input "+item.title+" number",
                        //     type: 'error'
                        // });
                        this.$Message.info("Please input "+item.title+" number");
                        _self.postdata.validate = false;
                        return false;
                    }
                    _self.postdata[item.name] = item.value2;
                   // console.log('a'+item.value2+"a");
                    if (item.type === 'date'||item.type === 'datetime') {
                        if( item.value2 ==""||item.value2.length==0||item.value2[0]==""||item.value2[1]==''||item.value2[1]==','){
                            if(item.notnull===0){
                                //空值可以提交
                                _self.postdata[item.name] = '';
                            }else{
                                // this.$message({
                                //     message: "Please input "+item.title+" date",
                                //     type: 'error'
                                // });
                                this.$Message.info("Please input "+item.title+" date");
                                _self.postdata.validate = false;
                                return false;
                            }
                        }else{
                            //setTimeout(() => {
                                let time = Date.parse(item.value2) / 1000;
                                if (!isNaN(time)) {
                                    _self.postdata[item.name] = time;
                                }

                            //},0);
                        }
                    }

                    if (item.type === 'daterange'||item.type === 'datetimerange') {
                        if( item.value2 ==""||item.value2.length==0||item.value2[0]==""||item.value2[1]==''||item.value2==','){
                            if(item.notnull===0){
                                //空值可以提交
                                _self.postdata[item.name] = '';
                            }else{
                                // this.$message({
                                //     message: "Please input "+item.title+" date",
                                //     type: 'error'
                                // });
                                this.$Message.info("Please input "+item.title+" date");
                                _self.postdata.validate = false;
                                return false;
                            }
                        }else{
                                    // _self.postdata[item.name] = [];
                                    // let temp = item.value;
                                    // for(let index in item.value){
                                    //     let time = Date.parse(item.value[index]) / 1000;
                                    //     if(!isNaN(time)){
                                    //         console.log('清空了2');
                                    //         _self.postdata[item.name][index] = time;
                                    //         console.log(_self.postdata);
                                    //     }else{
                                    //         console.log('清空了');
                                    //         _self.postdata[item.name] = '';
                                    //     }
                                    // }
                                    
                            
                            _self.postdata[item.name] = [];
                            //setTimeout(() => {
                                item.value2.forEach((child, index) => {
                                    let time = Date.parse(child) / 1000;
                                    if (!isNaN(time)) {
                                        _self.postdata[item.name][index] = time;
                                    } else {
                                        _self.postdata[item.name] = '';
                                    }                            
                                });
                            //}, 0);
                            console.log('打印最终数据');
                            console.log(_self.postdata);
                            break;
                        }
                        _self.postdata[item.name] = [];
                        //setTimeout(() => {
                            item.value2.forEach((child, index) => {
                                child = (typeof child)==='object'?child:(new Date(child.replace(/-/g,"/")));
                                let datestring = item.type =='daterange'?(child.toDateString()):child;
                                let time = (Date.parse(datestring)) / 1000;

                                if (!isNaN(time)) {
                                    _self.postdata[item.name][index] = time;
                                } else {
                                    _self.postdata[item.name] = '';
                                }                            
                            });
                        //}, 0);
                        return;
                    }
                }
                return true;
            },
            // getpostdata(){
            //     console.log('执行了1');
            //     let _self = this;
            //     console.log(_self.postdata);
            //      _self.postdata = {};
            //      _self.postdata.validate = true;
            //     for (let i = 0;i<_self.config.length;i++) {
            //         let item = _self.config[i];
            //         // if(item.type === 'daterange'){
            //         //     console.log('执行了这里');
            //         //     console.log(_self.postdata);
            //         //     _self.postdata[item.name] = [];
            //         //     let temp = item.value;
            //         //         for(let index in item.value){
            //         //             let time = Date.parse(item.value[index]) / 1000;
            //         //             if(!isNaN(time)){
            //         //                 console.log('清空了2');
            //         //                 _self.postdata[item.name][index] = time;
            //         //                 console.log(_self.postdata);
            //         //             }else{
            //         //                 console.log('清空了');
            //         //                 _self.postdata[item.name] = '';
            //         //             }
            //         //         }
            //         // }

            //         if(item.type=='int'&& item.value2 ==''){
            //             this.$Message.info("Please input "+item.title+" number");
            //             _self.postdata.validate = false;
            //             return false;
            //         }
            //         _self.postdata[item.name] = item.value2;
            //        // console.log('a'+item.value2+"a");
            //         if (item.type === 'date'||item.type === 'datetime') {
            //             if( item.value2 ==""||item.value2.length==0||item.value2[0]==""||item.value2[1]==''||item.value2[1]==','){
            //                 if(item.notnull===0){
            //                     //空值可以提交
            //                     _self.postdata[item.name] = '';
            //                 }else{
            //                     // this.$message({
            //                     //     message: "Please input "+item.title+" date",
            //                     //     type: 'error'
            //                     // });
            //                     this.$Message.info("Please input "+item.title+" date");
            //                     _self.postdata.validate = false;
            //                     return false;
            //                 }
            //             }else{
            //                 //setTimeout(() => {
            //                     let time = Date.parse(item.value2) / 1000;
            //                     if (!isNaN(time)) {
            //                         _self.postdata[item.name] = time;
            //                     }

            //                 //},0);
            //             }
            //         }

            //         if (item.type === 'daterange'||item.type === 'datetimerange') {
            // //             console.log('此处为控制2');
            // //             if( item.value2 ==""||item.value2.length==0||item.value2[0]==""||item.value2[1]==''||item.value2==','){
            // //                 if(item.notnull===0){
            // //                     //空值可以提交
            // //                     _self.postdata[item.name] = '';
            // //                 }else{
            // //                     this.$Message.info("Please input "+item.title+" date");
            // //                     _self.postdata.validate = false;
            // //                     return false;
            // //                 }
            // //             }else{
            // //                 _self.postdata[item.name] = [];
            // //                 console.log('此处有值');
            // //                 console.log(item.name);
            // //                 //setTimeout(() => {
            // //                     // item.value2.forEach((child, index) => {
            // //                     //     let time = Date.parse(child) / 1000;
            // //                     //     if (!isNaN(time)) {
            // //                     //         _self.postdata[item.name][index] = time;
            // //                     //     } else {
            // //                     //         _self.postdata[item.name] = '';
            // //                     //     }                            
            // //                     // });
            // //                 //}, 0);

            // //                     // let temp = item.value2;
            // //                     // // setTimeout(function(){
            // //                     //     for(let index in item.value2){
            // //                     //         let time = Date.parse(item.value2[index]) / 1000;
            // //                     //         if(!isNaN(time)){
            // //                     //             _self.postdata[item.name][index] = time;
            // //                     //         }else{
            // //                     //             _self.postdata[item.name] = '';
            // //                     //         }
            // //                     //     }
            // //                     // // })

            // //                         if(item.type === 'datetime'){
            // //                             let time = Date.parse(item.value) / 1000;
            // //                             if(!isNaN(time)){
            // //                                 _self.postdata[item.name] = time;
            // //                             }
            // //                         }
            //                         if(item.type === 'daterange'){
            //                             _self.postdata[item.name] = [];
            //                             let temp = item.value;
            //                             // setTimeout(function(){
            //                                 console.log('打印数据');
            //                                 console.log(item.value);
            //                                 console.log(temp);
            //                                 for(let index in item.value){
            //                                     let time = Date.parse(item.value[index]) / 1000;
            //                                     console.log('打印time');
            //                                     console.log(time);
            //                                     if(!isNaN(time)){
            //                                         console.log('测试测试');
            //                                         console.log(item.name);
            //                                         console.log(index);
            //                                         console.log(time);
            //                                         console.log(_self.postdata[item.name]);
            //                                         // _self.postdata['daterange'][0] = 'time';
            //                                         _self.postdata[item.name][index] = time;
            //                                     }else{
            //                                     //     _self.postdata[item.name] = '';
            //                                     }
            //                                 }
            //                             // })
            //                         }



            //             }
            // //             _self.postdata[item.name] = [];
            // //             //setTimeout(() => {
            // //                 item.value2.forEach((child, index) => {
            // //                     child = (typeof child)==='object'?child:(new Date(child.replace(/-/g,"/")));
            // //                     let datestring = item.type =='daterange'?(child.toDateString()):child;
            // //                     let time = (Date.parse(datestring)) / 1000;

            // //                     if (!isNaN(time)) {
            // //                         _self.postdata[item.name][index] = time;
            // //                     } else {
            // //                         _self.postdata[item.name] = '';
            // //                     }                            
            // //                 });
            // //             //}, 0);
            // //         }

            //     }
            //     return true;
            // },

            setsearchdata() {
                console.log('啦啦啦啦啦啦');
                console.log('setTimeout执行了1');
                console.log(this.postdata);
                let _self = this; 
                setTimeout(() => {
                    console.log('setTimeout执行了');
                    console.log(_self.postdata);
                    if(_self.getpostdata()){
                       _self.$emit('getsearchdata', _self.postdata); 
                    }
                },0);
            },
            handleCloseOptions(){
                console.log('执行了3');
                this.showitems= false;
            },
            showItems(){
                console.log('执行了4');
                this.showitems = !this.showitems;
            },
            showSearchBar(){
                console.log('执行了5');
                this.showbar = !this.showbar;
            },
            initCheckitems(){
                console.log('执行了6');
                let _self = this;
                let localcheckGroup = window.localStorage.getItem(this.name+"_checkGroup");
                let indexStrArr = [];
                let indexIntArr = [];
                let checkitems = [];
                let defaultSearch = false;
                    this.items.forEach((child,index)=>{
                        child.value2 = child.value;
                    });
                if(localcheckGroup){
                    indexStrArr = localcheckGroup.split(",");
                    indexStrArr.forEach(function(data,index,arr){ 
                            let checkitem = {}; 
                            indexIntArr.push(+data); 
                            _self.items[+data].choose = true; 
                            checkitem = _self.searchconfig[+data];
                            checkitem.defaultindex = +data;
                            checkitems.push(checkitem);
                            defaultSearch = checkitems.value!=""?true:defaultSearch;
                    });
                }else{
                    for(let i = 0 ; i<this.items.length; i++){
                        if(this.items[i].value!=''){
                            indexIntArr.push(i);
                            defaultSearch = true;
                        }
                    }
                    //若没有默认值和自定义，则默认显示第一个字段
                    indexIntArr = indexIntArr.length===0?[0]:indexIntArr;
                    indexIntArr.forEach(function(data,index,arr){  
                            let checkitem = {}; 
                            _self.items[data].choose = true; 
                             
                            checkitem = _self.searchconfig[data];
                            checkitem.defaultindex = data;
                            checkitems.push(checkitem);
                    });
                }

                this.checkIndex = JSON.parse( JSON.stringify(indexIntArr) );
                this.config = JSON.parse( JSON.stringify(checkitems));
                //设置默认查询
                if(defaultSearch){
                    setTimeout(()=>{
                        _self.setsearchdata();
                    },0);
                }
            },
            changeCheckItems(index){
                console.log('执行了7');
                 let checkitems = [];
                 let newval = this.items;
                 let _self = this;
                 //for(let i = 0 ; i<newval.length; i++){
                     // if(newval[i].choose){
                     //    newval[i].defaultindex = i;
                     //     checkitems.push(newval[i]);
                     //      _self.checkIndex.push(i);
                     // }
                 //}
                 if(newval[index].choose){
                    newval[index].defaultindex = index;
                    _self.config.push(newval[index]);
                    _self.checkIndex.push(index);
                 }else{
                    let pa_index = index
                    _self.config.forEach((child, index, arr)=>{
                       if(child.defaultindex == pa_index){
                            arr.splice(index,1);
                            _self.checkIndex.splice(index,1);
                       } 
                    });
                 }
                 window.localStorage.setItem(this.name+"_checkGroup", _self.checkIndex.toString());
                 //this.config = JSON.parse( JSON.stringify(checkitems));
            }
        },

        created: function () {
            console.log('执行了8');
            if(this.searchconfig && this.searchconfig.length!=0){
              this.config = this.searchconfig;
              this.items = this.searchconfig;
              this.postdata = {};
              this.initCheckitems();  
            }
        }

    }
</script>

<style scoped lang='less'>
.hidden{
    display: none;
}
.wrap{
    padding:10px 20px 0;
    box-shadow: 0 2px 6px -2px rgba(0, 0, 0, .2);
    background-color: #fff;
}
.div-search{
     max-height:500px;
     &.noshow{
        max-height: 0 !important;
        overflow: hidden;
        -webkit-transition: max-height .3s ease-out;
        -moz-transition: max-height .3s ease-out;
        -o-transition: max-height .3s ease-out;
        transition: max-height .3s ease-out;
        -ms-transition: max-height .3s ease-out;
        -webkit-backface-visibility: hidden;
    }
}

.searchBar {
    width: 100%;
    background-color: hsla(0, 0%, 100%, .9);
    z-index: 7;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}

    .searchmenu {
        height: 40px;
        line-height: 40px;
        padding-right: 20px;
        cursor: pointer;
        position: relative;
        -webkit-border-radius: 3px;
        -moz-border-radius: 3px;
        border-radius: 3px;
        font-size: 12px;
        display: flex;
        align-items: center;
    }

    .searchmenu .menutitle {
        color: #888 !important;
        padding-right: 5px;
        line-height: 1.3;
        white-space:nowrap;
    }

    .searchitmes-wrap {
        display: flex;
        justify-content:flex-end;
    }
    .searchitmes {
        position: relative;
        height: 30px;
        border:1px solid #bfcbd9;
        border-radius: 4px;
        cursor:pointer;
        >span{
            display: block;
            padding:5px 10px;
        }
    }
    .show-bar{
        width: 100px;
        font-size: 16px;
        margin: 0 auto;
        color:#bfcbd9;
        cursor: pointer;
        text-align: center;
        &:hover{
            opacity: .8;
        }
    }
    .listitmes{
        position: absolute;
        bottom: 0;
        right:0;
        transform: translateY(100%);
        background-color: #fff;
        z-index:20;
        padding:5px 5px;
        border-radius: 5px;
        border:1px solid #bfcbd9;
        max-height: 224px;
        overflow-y: scroll;
        max-width: 300px;
        text-overflow: ellipsis;
        white-space: pre-line;
    }
    .checkbox{
        box-sizing:border-box;
        width: 100%;
        margin-right: 0;
        padding-right: 8px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        z-index: 21;
    } 
</style>
