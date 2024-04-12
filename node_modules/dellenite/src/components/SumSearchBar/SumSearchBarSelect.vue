<template>
    <div class="kuke-searchbarselect" v-clickoutside="handleCloseOptions">
        <div class="select-selection" v-on:click="showOrdeleteOptions($event)" v-on:mouseover="changeIcon(true)" v-on:mouseout="changeIcon(false)">
            <Input v-model="selectitemstext" style="width: 180px" :icon="arrowicon" readonly placeholder="请选择..."></Input>
        </div>
        <div class="dropdown-wrapper" v-show="optionsshow">
            <div class="filter" v-if="filterable">
                <input type="text" v-model="searchkey" class="filter-text">
            </div>
            <div class="options">
                <div v-show="!(item.unshow&&item.unshow == true)" :class="{'option':true, 'selected': item.check}" v-for="(item, index) in originOptions" @click="optionClick(item)" v-on:mouseenter="showChildOptions(item)" :key="index">
                    {{item[optionText]}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Clickoutside from '../../utils/clickoutside';

    export default {

        name: "Select",

        directives: {
            Clickoutside
        },

        props: {
            //是否可以清空选项，只在单选时有效
            clearable: {
                type: Boolean,
                default: false
            },
            //是否禁用
            disabled: {
                type: Boolean,
                default: false
            },
            // 单选
            singleton: {
                type: Boolean,
                default: false
            },
            //选项值(值字段)
            optionValue: {
                type: String,
                default: 'value'
            },
            //选项值(名称字段)
            optionText: {
                type: String,
                default: 'label'
            },
            //指定选中项目的 value 值
            value: {},

            selectconfig:{
                type:Object
            }
        },

        data() {
            return {
                optionsshow: false,
                inputhover:false,
                originOptions: [],
                selectitems:[],
                searchkey: '',
                select:{
                    options:[
                        {value:1,lable:'包含'},
                        {value:-1,lable:'不包含'},
                        {value:2,lable:'等于空'}
                    ],
                    optionvalue:1,
                }
            }
        },

        watch: {
            searchkey(val) {
                let _self = this;
                let searchkey = this.searchkey.toLowerCase();
                this.originOptions.forEach((child,index)=>{
                    let val = child[_self.optionText].toLowerCase();
                    if (!val.includes(searchkey)) {
                        child.unshow = true;
                    }else{
                        child.unshow = false;
                    }
                });
            },
            selectconfig(val) {
                this.setDefaultOptions(val);
            }
        },

        computed: {
            selectitemstext(){
                let arr = [];
                let arrvalue = [1,[]];
                let _self = this;
                this.selectitems.forEach((child, index)=>{
                    arr.push(child[_self.optionText]);
                    (arrvalue[1]).push(child[_self.optionValue]);
                });
                arrvalue[1] = (arrvalue[1]).join(',');
                this.$emit('input', arrvalue);
                return arr.length===0?'请选择...':arr.join(',');
            },
            arrowicon() {
                if(this.inputhover){
                    return "ios-close";
                }
                if(this.optionsshow) {
                    return "ios-arrow-up";
                } else {
                    return "ios-arrow-down";
                }
            },
            filterable(){
                if(this.originOptions.length>10){
                    return true;
                }else{
                    return false;
                }
            }
        },

        methods: {
            handleCloseOptions() {
                this.optionsshow = false;
            },
            changeIcon(blo){
                if(!this.disabled){
                    this.inputhover = blo;
                }
            },
            optionClick(item) {
                
                let itemcheck_current = !item.check;
                if(itemcheck_current){
                    // 点击未选中
                    if(this.singleton){
                        this.selectitems = [item];
                        this.originOptions.forEach(option => {
                            if(option.value !== item.value){
                                option.check = false;
                            }
                        });
                    }else{
                        this.selectitems.push(item);
                    }
                    item.check = true
                    // 点击选中的
                }else{
                    if(this.singleton){
                        this.selectitems = [item];
                        this.originOptions.forEach(option => {
                            if(option.value !== item.value){
                                option.check = false;
                            }
                        });
                        item.check = true;
                    }else{
                        this.selectitems.forEach((child,index,arr)=>{
                            if(JSON.stringify(child)===JSON.stringify(item)){
                                arr.splice(index,1);
                            }
                        });
                        item.check = false;
                    }
                }
            },
            setDefaultOptions(config) {
                let _self = this;
                _self.selectitems = [];
                _self.searchkey = '';
                if(config.options.length==0){
                    let url = config.options_url;
                    _self.$http.get(url,{dataType: 'json'}).then(function(data){
                        if(data.status){
                             _self.originOptions = JSON.parse(JSON.stringify(data.data));
                        }else{
                            // _self.$message({
                            //     type:'error',
                            //     message:data.info,
                            // })
                            _self.$Message.info(data.info);
                        }
                    }).catch(function(){
                        console.log("error");
                    })
                    // $.ajax({
                    //     url: url,
                    //     type: 'GET',
                    //     dataType: 'json'
                    // })
                    // .done(function(data) {
                    //     if(data.status){
                    //          _self.originOptions = JSON.parse(JSON.stringify(data.data));
                    //     }else{
                    //         _self.$message({
                    //             type:'error',
                    //             message:data.info,
                    //         })
                    //     }
                    // })
                    // .fail(function() {
                    //     console.log("error");
                    // });
                    
                }else{
                    this.originOptions = JSON.parse(JSON.stringify(config.options));
                }
                //初始化 默认值选中
                if(config.value!=''){
                    let val_arr = config.value.toString().split(",");
                    this.originOptions.forEach((child,index)=>{
                        val_arr.forEach((item,index2)=>{
                            if(item == child[_self.optionValue]){
                                _self.selectitems.push(child);
                                child.check = true;
                            }
                        });
                    });
                }  
            },
            showChildOptions(item){
                //预留多级联动
            },
            showOrdeleteOptions(event) {
                let _self = this;
                let selfDom = document.getElementsByClassName('select-selection')[0];
                let childDom = selfDom.getElementsByTagName('i')[0];
                console.log(childDom.classList.contains('ivu-icon-ios-close'));
                if(childDom.classList.contains('ivu-icon-ios-close')){
                    childDom.addEventListener('click',function(){       //按钮叉
                        _self.selectitems = [];
                        _self.originOptions = JSON.parse((JSON.stringify(_self.originOptions)).replace(/,"check":true/g,'').replace(/,'check':true/g,'').replace(/,check:true/g,''));
                        return;
                    });
                }
                // if(this.inputhover && $(event.target).hasClass('ivu-icon-ios-close')){
                // if(this.inputhover && childDom.classList.contains('ivu-icon-ios-close')){
                //     this.selectitems = [];
                //     this.originOptions = JSON.parse((JSON.stringify(this.originOptions)).replace(/,"check":true/g,'').replace(/,'check':true/g,'').replace(/,check:true/g,''));
                //     return;
                // }
                this.optionsshow = !this.optionsshow;
            }
        },
        created() {
            if(this.selectconfig && JSON.stringify(this.selectconfig)!=='{}'){
                this.setDefaultOptions(this.selectconfig);
            }
        }
    }
</script>

<style lang="less">
    .kuke-searchbarselect{
        display: inline-block;
        width: 100%;
        box-sizing: border-box;
        vertical-align: middle;
        color: #657180;
        font-size: 12px;
        line-height: normal;
        position: relative;
        .select-selection {
            height: 32px;
            display: block;
            box-sizing: border-box;
            outline: 0;
            user-select: none;
            cursor: pointer;
            position: relative;
            background-color: #fff;
            /*border-radius: 4px;
            border: 1px solid #d7dde4;*/
            transition: all .2s ease-in-out;
            .icon {
                position: absolute;
                right: 5px;
                top: 5px;
                width: 20px;
                height: 20px;
            }
            .placeholder {
                color: #c3cbd6;
                display: block;
                height: 30px;
                line-height: 30px;
                font-size: 12px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                padding-left: 8px;
                padding-right: 24px;
            }
            .select-text {
                display: block;
                height: 30px;
                line-height: 30px;
                font-size: 12px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                padding-left: 8px;
                padding-right: 24px;
            }
        }
        .dropdown-wrapper {
            margin-top: 3px;
            /*border: 1px solid #c3cbd6;*/
            position: absolute;
            background-color: #fff;
            box-shadow: 0 8px 20px rgba(0, 0, 0, .5);
            border-radius: 3px;
            padding: 6px 3px;
            width: 220px;
            overflow-y: auto;
            z-index: 900;
            .options {
                max-height: 200px;
                overflow-y: auto;
                overflow-x: hidden;
                .option {
                    word-break: break-all;
                    word-wrap: break-word;
                    padding: 0 5px;
                    height: 30px;
                    line-height: 30px;
                    cursor: pointer;
                    overflow:hidden;
                }
                .option:hover {
                    background-color: #4bbcb7;
                    color: #fff;
                }
                .selected {
                    color: #4bbcb7;
                }
            }
            .filter {
                padding: 3px 4px 3px 2px;
                .filter-text {
                    width: 100%;
                    height: 28px;
                    border: 1px solid lightgrey;
                    border-radius: 5px;
                }
                .filter-text:focus {
                    outline: none;
                }
            }
        }
    }
</style>
