<template>
    <div class="searchBar">

        <span class="searchmenu" v-for="(item, index) in config" :key="index">
            <label class="menutitle" v-if="item.type != 'select'">{{item.title}}</label>
            <!--文本只读-->
            <p v-if="item.type === 'label'">{{item.value}}</p>
            <!--文本搜索-->
            <input type="text" class="search-input" v-model="item.value" v-if="item.type == 'text'" v-on:keyup.enter="setsearchdata">
            <!--搜索/异步搜索-->
            <searchinput v-if="item.type == 'searchinput'" :name="item.name" :value="item.value" :label="item.label" :index="index" :requestUrl="item.requestUrl" @inputSelected="inputSelected"></searchinput>

            <!--date-->
            <Date-picker type="date" placeholder="Select date" v-model="item.value" v-if="item.type == 'date'" @on-change="setsearchdata"></Date-picker>

            <!--datetime-->
            <Date-picker type="datetime" placeholder="Select date time" v-model="item.value" v-if="item.type == 'datetime'" @on-ok="setsearchdata"
                @on-clear="setsearchdata"></Date-picker>

            <!--daterange-->
            <Date-picker type="daterange" confirm clearable placeholder="Select date range" v-model="item.value" v-if="item.type == 'daterange'"
                @on-ok="setsearchdata" @on-clear="setsearchdata"></Date-picker>

            <!--datetimerange-->
            <Date-picker type="datetimerange" confirm clearable style="width:280px;" placeholder="Select datetime range" v-model="item.value"
                v-if="item.type == 'datetimerange'" @on-ok="setsearchdata" @on-clear="setsearchdata"></Date-picker>

            <!--下拉搜索-->
            <searchbarselect v-model="item.value" :selectname="item.name" optionValue="id" :title="item.title" optionText="value" v-if="item.type == 'select'"
                :options="item.options" @itemselect="searchbaritemselect">
            </searchbarselect>

            <!--多选下拉搜索-->
            <Select v-model="item.value" multiple style="min-width:300px;width:auto;" v-if="item.type == 'mutiselect'" @on-change="setsearchdata">
                <Option v-for="item in item.options" :value="item.id" :key="item.id">{{item.value}}</Option>
            </Select>

        </span>
    </div>
</template>

<script>
    import searchbarselect from './SearchBarSelect.vue';
    import searchinput from './SearchInput.vue';

    export default {

        components: {
            searchbarselect,
            searchinput
        },

        props: {
            //搜索配置数组
            searchconfig: {
                type: Array,
                default: function () {
                    return {
                        type: 'text'
                    }
                }
            },
            hasDefault: {
                type: Boolean,
                default: false
            }
        },

        data() {
            return {
                config: [],
                postdata: {},
            }
        },

        watch: {

            searchconfig(newval, oldval) {
                this.config = newval;
                this.postdata = {};
            }

        },

        methods: {

            getpostdata: function () {
                console.log('打印数据12345');
                let self = this;
                for (let index in self.config) {
                    let item = self.config[index];
                    self.postdata[item.name] = item.value;
                    if (item.type === 'date') {
                        setTimeout(function () {
                            let time = Date.parse(item.value) / 1000;
                            if (!isNaN(time)) {
                                self.postdata[item.name] = time;
                            }
                        });
                    }

                    if (item.type === 'datetime') {
                        let time = Date.parse(item.value) / 1000;
                        if (!isNaN(time)) {
                            self.postdata[item.name] = time;
                        }
                    }

                    if (item.type === 'daterange') {
                        self.postdata[item.name] = [];
                        let temp = item.value;
                        setTimeout(function () {
                            for (let index in item.value) {
                                let time = Date.parse(item.value[index]) / 1000;
                                if (!isNaN(time)) {
                                    self.postdata[item.name][index] = time;
                                } else {
                                    self.postdata[item.name] = '';
                                }
                            }
                        });
                    }

                    if (item.type === 'datetimerange') {
                        self.postdata[item.name] = [];
                        let temp = item.value;
                        setTimeout(function () {
                            for (let index in item.value) {
                                let time = Date.parse(item.value[index]) / 1000;
                                if (!isNaN(time)) {
                                    self.postdata[item.name][index] = time;
                                } else {
                                    self.postdata[item.name] = '';
                                }
                            }
                        });
                    }

                }
            },

            setsearchdata() {
                let self = this;
                self.getpostdata();
                setTimeout(function () {
                    self.$emit('getsearchdata', self.postdata);
                });
            },
            inputSelected(index,val){
                let self = this;
                self.config[index].value = val;
                self.getpostdata();
                setTimeout(function () {
                    self.$emit('getsearchdata', self.postdata);
                });
            },
            //有默认值的搜索
            defaultSearch() {
                let self = this;
                setTimeout(function () {
                    for (let index in self.config) {
                        let item = self.config[index];
                        self.postdata[item.name] = item.value;

                        if (item.type === 'date' || item.type === 'datetime' || item.type === 'daterange' ||
                            item.type === 'datetimerange') {
                            if (item.value) {
                                let times = [];
                                for (let i in item.value) {
                                    times.push(item.value[i] / 1000)
                                }
                                self.postdata[item.name] = times;
                            }
                        }
                    }

                    self.$emit('getsearchdata', self.postdata);
                });
            },

            searchbaritemselect: function (name, value) {
                let self = this;
                this.getpostdata();
                //this.postdata[name] = value;
                setTimeout(function () {
                    self.$emit('getsearchdata', self.postdata);
                });
            }
        },

        created: function () {
            console.log('进入此页面');
            //第一次执行postdata(针对searchconfig不是ajax延迟获取的情况)
            this.config = this.searchconfig;

            //有默认值的情况下执行第一次搜索
            if (this.hasDefault) {
                this.defaultSearch();
            }
        }

    }
</script>

<style scoped>
    .searchBar {
        width: 100%;
        box-shadow: 0 2px 6px -2px rgba(0, 0, 0, .5);
        background-color: hsla(0, 0%, 100%, .9);
        padding: 0 20px;
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
    }

    .searchmenu .search-input {
        appearance: none;
        background-color: #fff;
        background-image: none;
        border-radius: 4px;
        border: 1px solid #bfcbd9;
        box-sizing: border-box;
        color: #1f2d3d;
        display: block;
        font-size: inherit;
        height: 36px;
        line-height: 1;
        outline: 0;
        padding: 3px 10px;
        transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
    }
</style>