<template>
  <div class="kuke-typeBar">
      <ul class="kuke-typeBar_ul">
          <Badge v-for="(item, index) in tabData" :count="item.count ? item.count : 0" :key="index">
              <li class="typeMenu" :class="{active: index == defaultItem}" @click="menuclick(item, index)">
                  {{item.name}}
              </li>
          </Badge>
      </ul>
  </div>
</template>
<script>
export default {
    props: {
        tabconfig: {
            type: Array,
            default: function(){
                return []
            }
        }
    },
    data(){
        return {
            defaultItem: '0',
            tabData: []
        }
    },
    watch: {
        tabconfig(newVal){
            this.setTabData(newVal)
        }
    },
    methods: {
        menuclick(item, index){
            this.defaultItem = index;
            this.$emit('changetab', index);
        },
        setTabData(data){
            let self = this;
            if(data.length > 0){
                self.tabData = data.map(function(item, index){
                    if(item.selected){
                        self.defaultItem = index;
                    }
                    return item;
                });
                self.menuclick(self.tabData[self.defaultItem], self.defaultItem);
            }
        }
    },
    created(){
        this.setTabData(this.tabconfig)
    }
}
</script>
<style lang="less" scoped>
.kuke-typeBar {
        height: 50px;
        width: 100%;
        border-bottom: 1px solid #ddd;
        z-index: 8;
        background:#fff;
    }

    .kuke-typeBar_ul {
        text-align: center;
        font-size: 14px;
        li{
            display: inline-block;
            margin: 0 13px;
            padding: 13px 4px 9px;
            cursor: pointer;
            border-bottom: 3px solid transparent;
            transition: border-color .3s ease-in-out;
            -webkit-transition: border-color .3s ease-in-out;
            &:not(.active):not(:hover){
                 border-bottom-color: transparent !important;
                 color: #888 !important;
             }
             &.active{
                  border-bottom-color: #4bbcb7 !important;
                  color: #4bbcb7 !important;
              }
        }
    }
</style>
