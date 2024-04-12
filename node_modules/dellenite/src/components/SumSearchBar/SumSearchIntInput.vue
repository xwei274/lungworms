<template>
    <div class="searchintinput">
        <Input class="input1" v-model.trim="inputvalue1" placeholder="请输入数字..." number style="width: 180px">
            <Select v-model="optionvalue" slot="prepend" style="width: 80px">
                <Option :value="item.value" v-for="(item,index) in options" v-html="item.lable" :key = "index"></Option>
            </Select>
        </Input>
        <Input class="input2" v-if="optionvalue==5||optionvalue==6" v-model="inputvalue2" placeholder="请输入数字..." style="width: 100px"></Input>
    </div>
</template>

<script>
    export default {
        name: "Int",
        props: {
            inputconfig:{
                type:Object
            }
        },

        data() {
            return {
                inputvalue1:'',
                inputvalue2:'',
                options:[
                    {value:0,lable:'等于'},
                    {value:1,lable:'大于'},
                    {value:2,lable:'大于等于'},
                    {value:3,lable:'小于'},
                    {value:4,lable:'小于等于'},
                    {value:5,lable:'介于'},
                    {value:6,lable:'不介于'}
                ],
                optionvalue:0,
                defaultitem:{}
            }
        },

        watch: {
            inputvalue1(){
                this.setInputValue();
            },
            inputvalue2(){
                this.setInputValue();
            },
            optionvalue(){
                this.setInputValue();
            },
            inputconfig(newval){
                this.setDefaultInput(newval);
            }
        },

        computed: {
           
        },

        methods: {
           setInputValue(){
                let valuearr = [];
                let valuetext = '';
                let flag = 1;
                let _self = this;

                if(this.inputvalue1!=''){
                    if(!this.isNumber(this.inputvalue1)){
                        // this.$message({
                        //     message: "Please input "+_self.inputconfig.title+" number",
                        //     type: 'error'
                        // });
                        _self.$Message.info("Please input "+_self.inputconfig.title+" number");
                        return;
                    }
                    if(this.inputvalue2!=''&&!this.isNumber(this.inputvalue2)){
                        // this.$message({
                        //     message: "Please input "+_self.inputconfig.title+" number",
                        //     type: 'error'
                        // });
                        _self.$Message.info("Please input "+_self.inputconfig.title+" number");
                        return;
                    }
                    switch(this.optionvalue){
                        case 0:
                        valuetext = '['+this.inputvalue1+','+this.inputvalue1+']';
                        break;
                        case 1:
                        valuetext = '('+this.inputvalue1+',)';
                        break;
                        case 2:
                        valuetext = '['+this.inputvalue1+',)';
                        break;
                        case 3:
                        valuetext = '(,'+this.inputvalue1+')';
                        break;
                        case 4:
                        valuetext = '(,'+this.inputvalue1+']';
                        break;
                        case 5:
                        valuetext = '['+this.inputvalue1+','+this.inputvalue2+']';
                        break;
                        case 6:
                        valuetext = '['+this.inputvalue1+','+this.inputvalue2+']';
                        flag = -1;
                        break;
                    }
                    valuearr.push(flag);
                    valuearr.push(valuetext);
                    this.$emit('input', valuearr);
                }else{
                    // this.$message({
                    //     message: "Please input "+_self.inputconfig.title+" number",
                    //     type: 'error'
                    // });
                    this.$Message.info("Please input "+_self.inputconfig.title+" number");
                    return;
                }
           },
           setDefaultInput(config){
                this.defaultitem = JSON.parse(JSON.stringify(config));
                this.inputvalue1 = config.value;
                this.optionvalue = 0;
           },
           isNumber(n) {
              return !isNaN(parseFloat(n)) && isFinite(n);
            }

        },
        created() {
            if(this.inputconfig && JSON.stringify(this.inputconfig)!=='{}'){
                this.setDefaultInput(this.inputconfig);
            }
        }
    }
</script>

<style lang="less">
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