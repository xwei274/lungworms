<template>
    <div class="pf-searchInput" v-clickoutside="">
        <i-select
                v-model="inputValue"
                :label="inputLabel"
                filterable
                remote
                :remote-method="searchFun"
                :loading="loading"
                :clearable="true"
                not-found-text=""
                @on-change="selectFun">
            <i-option v-if="inputOptions.length > 0" v-for="(option, index) in inputOptions" :value="option.id" :key="option.id">{{option.value}}</i-option>
        </i-select>
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
            name:{
                type:String,
                default:''
            },
            value:{
                default:''
            },
            index:{
                type:Number,
            },
            requestUrl:{
                type:String,
                default:''
            }
        },

        data() {
            return {
                inputValue:'',
                inputLabel:'',
                inputOptions:[],
                clearable:true,
                loading:false,
            }
        },

        watch: {

        },

        computed: {
        },

        methods: {
            searchFun(val){
                let self = this;
                let data = {
                    value:val
                }
                if(self.requestUrl && val !== ''){
                    self.getOptions(data).then(res => {
                        if (res.status) {
                            self.inputOptions = res.data.options;
                        } else {
                            self.$Message.error(res.info);
                        }
                    })
                }
            },
            selectFun(val){
                let self = this;
                this.$emit('inputSelected',self.index,val);
            },
            getOptions(data){
                let self = this;
                self.loading = true;
                return self.axios.post(self.requestUrl,data).then((response) => {
                    self.loading = false;
                    let res = response.data;
                    return res;
                })
            },
            createdFun(){
                let self = this;
                self.inputValue = self.value;
                if(self.value){
                    self.getOptions({value:self.value}).then(res => {
                        if (res.status) {
                            let _options = res.data.options;
                            for(let key=0 ; key < _options.length ; key++){
                                self.inputOptions.push(_options[key])
                                if(_options[key].id == self.value){
                                    self.inputLabel = _options[key].value;
                                }
                            }
                        } else {
                            self.$Message.error(res.info);
                        }
                    })
                }
            }
        },

        created: function () {
            this.createdFun()
        }
    }
</script>

<style lang="less">

</style>