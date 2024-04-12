<template>
    <div>
        <h4>showline 筛选:</h4>
        <kuke-showline :lineconfig="listdata" linename="showlinename" @definedList="changetabs"></kuke-showline>
    </div>
</template>
<script>
export default {
    data(){
      return {
        listdata: [
          {
            title: 'test1',
            key: 'key1',
            align: 'center',
            width: 130,
            lineName: 'hello1',
          },
          {
            title: 'test2',
            key: 'key2',
            align: 'center',
            width: 110,
            lineName: 'hello2',
          },
          {
            title: 'test3',
            key: 'key3',
            align: 'center',
            width: 70,
            lineName: 'hello3',
          },
          {
            title: 'test4',
            key: 'key4',
            align: 'center',
            width: 60,
            lineName: 'hello4',
          },
          {
            title: 'test5',
            key: 'key5',
            align: 'center',
            width: 160,
            lineName: 'hello5',
          },
          {
            title: 'test6',
            key: 'key6',
            align: 'center',
            width: 80,
            lineName: 'hello6',
          },
          {
            title: 'test7',
            key: 'key7',
            align: 'center',
            width: 120,
            lineName: 'hello7',
          },
          {
            title: 'test8',
            key: 'key8',
            align: 'center',
            width: 100,
            lineName: 'hello8',
          },
          {
            title: 'test9',
            key: 'key9',
            align: 'center',
            width: 110,
            lineName: 'hello9',
          },
        ]
      }
    },
    methods: {
       changetabs: function (val) {
          console.log(val);
        }
    }
}
</script>
<style lang="less" scoped>
    .showLine-box{
        width:500px;
        margin:200px auto;
    }
</style>
