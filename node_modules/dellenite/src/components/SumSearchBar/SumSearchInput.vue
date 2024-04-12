<template>
    <div class="searchintinput">
        <Input class="input1" v-model="inputvalue" :disabled="disabled">
            <Select v-model="optionvalue" slot="prepend" style="width: 70px;">
                <Option v-if="!(defaultitem.notnull == 1 && item.value == 2)" :value="item.value" v-for="(item, index) in options" v-html="item.label" :key="index"></Option>
            </Select>
        </Input>
    </div>
</template>
<script>
export default {
    name: 'Int',
    props: {
        inputconfig: {
            type: Object
        }
    },
    data(){
        return {
            inputvalue: '',
            options: [
                {value: 1, label: '包含'},
                {value: -1, label: '不包含'},
                {value: 2, label: '等于空'}
            ],
            optionvalue: 1,
            defaultitem: {}
        }
    },
    watch: {
        inputvalue(){
            this.setInputValue();
        },
        optionvalue(){
            this.setInputValue();
        },
        inputconfig(newval){
            this.setDefaultInput(newval);
            this.setInputValue();
        }
    },
    computed: {
        disabled(){
            if(this.optionvalue === 2){
                this.inputvalue = '';
                return true;
            }else{
                return false;
            }
        }
    },
    methods: {
        setInputValue(){
            let valuearr = [];
            valuearr.push(this.optionvalue === 2 ? 1 : this.optionvalue);
            valuearr.push(this.inputvalue);
            this.$emit('input', valuearr);
        },
        setDefaultInput(config){
            this.defaultitem = JSON.parse(JSON.stringify(config));
            this.inputvalue = config.value;
        }
    },
    created(){
        if(this.inputconfig && JSON.stringify(this.inputconfig) !== '{}'){
            this.setDefaultInput(this.inputconfig);
            this.setInputValue();
        }
    }
}
</script>
<style lang="less" scoped>
.searchintinput{
    display: flex;
     flex-wrap: nowrap;
     align-items: center;
     .input2{
        margin-left: 5px;
        margin-top: 2px;  
     }
     input{
            padding-right: 5px !important;
     }
     li.ivu-select-item{
        padding-top: 4px;
        padding-bottom: 4px;
     }
}
</style>
