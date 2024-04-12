<template>
    <div class="abc-searchbarselect" :value="value" v-clickoutside="handleCloseOptions">
        <div class="select-selection" v-on:click="showOptions">
            <span class="select-text">{{selectText}}</span>
            <i v-bind:class="arrowClass"></i>
        </div>
        <div class="dropdown-wrapper" v-if="optionsVisible">
            <div class="filter" v-show="filterable">
                <input v-model="searchkey" class="filter-text" type="text" />
            </div>
            <div class="options">
                <div v-bind:class="{'option':true,'selected':option.selected}" v-for="(option, index) in privateOptions" :key="index" v-on:click="optionClick(option)">
                    {{option[optionText]}}
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
            //选项值数组
            options: {
                type: Array
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
            //这个select的name名称
            selectname:{}
        },

        data() {
            return {
                optionsVisible: false,
                originOptions: [],
                privateOptions: [],
                iconArrowDown: true,
                selectText: '请选择',
                searchkey: ''
            }
        },

        watch: {
            value(val){
                let hasValue = false;
                for (let i in this.originOptions) {
                    this.originOptions[i]['selected'] = false;
                    if (this.originOptions[i][this.optionValue] === val) {
                        this.originOptions[i]['selected'] = true;
                        this.selectText = this.originOptions[i][this.optionText];
                        hasValue = true;
                    }
                }

                //如果没有选中值的情况下，selectText选中第一个
                if (hasValue === false) {
                    if (this.originOptions.length > 0) {
                        this.selectText = this.originOptions[0][this.optionText];
                        this.originOptions[0]['selected'] = true;
                    }
                }
            },
            searchkey(val) {
                let searchkey = this.searchkey.toLowerCase();
                this.privateOptions = [];
                for (let key in this.options) {
                    let val = this.options[key][this.optionText].toLowerCase();
                    if (val.indexOf(searchkey) > -1) {
                        this.privateOptions.push(this.options[key]);
                    }
                }
            },
            options(val) {
                this.setOriginOptions(val);
            }
        },

        computed: {
            arrowClass: function () {
                if (this.optionsVisible) {
                    return "icon iconfont icon-caret";
                } else {
                    return "icon iconfont icon-caret";
                }
            },
            filterable:function (){
                if(this.options.length>15){
                    return true;
                }else{
                    return false;
                }
            }
        },

        methods: {

            handleCloseOptions: function () {
                this.optionsVisible = false;
            },

            optionClick: function (option) {
                this.selectText = option[this.optionText];
                this.optionsVisible = false;
                this.searchkey = '';
                this.$emit('input', option[this.optionValue]);
                this.$emit('itemselect',this.selectname,option[this.optionValue]);
                for (let i in this.originOptions) {
                    this.originOptions[i]['selected'] = false;
                    if (this.originOptions[i][this.optionValue] === option[this.optionValue]) {
                        this.originOptions[i]['selected'] = true;
                    }
                }
            },

            setOriginOptions: function (_options) {

                this.originOptions = [];
                for (let i = 0; i < _options.length; i++) {
                    let obj = _options[i];
                    var newobj = Object.assign({}, obj);
                    if (!newobj.hasOwnProperty('selected')) {
                        newobj['selected'] = false;
                    }
                    if (newobj[this.optionValue] === this.value) {
                        newobj['selected'] = true;
                        this.selectText = newobj[this.optionText];
                    }
                    this.originOptions.push(newobj);
                }

            },

            showOptions: function () {
                this.privateOptions = this.originOptions.slice();
                if (this.optionsVisible) {
                    this.optionsVisible = false;
                } else {
                    this.optionsVisible = true;
                }
            }

        },

        created: function () {
            this.setOriginOptions(this.options);
        }
    }
</script>

<style lang="less">
    .abc-searchbarselect{
        display: inline-block;
        // width: 100%;
        box-sizing: border-box;
        vertical-align: middle;
        color: #657180;
        font-size: 12px;
        line-height: normal;
        position: relative;
        .title{
            float: left;
            line-height: 32px;
        }
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
            width: 150px;
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