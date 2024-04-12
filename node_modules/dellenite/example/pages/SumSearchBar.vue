<template>
    <div>
        <h4>SumSearchBar 滑动框:</h4>
        <kuke-sumsearchbar ref="search" :searchconfig="searchbarconfig" @getsearchdata="getSearchData"></kuke-sumsearchbar>
    </div>
</template>

<script>
    function fun_date(value){
        var time1 = new Date();
        var time2 = new Date(time1);
        time2.setDate(time1.getDate() + value);
        return time2;
    }
    export default {
        name: 'app',

        components: {

        },

        data() {
            return {
                searchbarconfig:[
                    {
                        type: 'text',
                        name: 'text',
                        title: '文本搜索',
                        value: ''
                    },
                    {
                        type: 'date',
                        name: 'date',
                        title: 'date',
                        value: new Date()
                    },
                    {
                        type: 'daterange',
                        name: 'daterange',
                        title: 'daterange',
                        // value: ['2018-03-01','2018-03-12']
                        // value: [new Date(new Date().setHours(0, 0, 0, 0)), new Date(new Date().setHours(0, 0, 0, 0))]
                        value: [new Date(new Date().setHours(0, 0, 0, 0)), new Date(fun_date(7))],
                    },
                    {
                        type: 'datetimerange',
                        name: 'datetimerange',
                        title: 'datetimerange',
                        // value: [new Date(new Date().setHours(0, 0, 0, 0)), new Date()]
                        value: [new Date(new Date().setHours(0, 0, 0, 0)), new Date(fun_date(7))]
                        // value: ['2018-03-01','2018-03-12']
                    },
                    {
                        type: 'int',
                        name: 'int',
                        title: 'int',
                        value: ''
                    },
                ]
            }
        },

        methods: {
            //搜索回调事件
            getSearchData(postdata) {
                //使用postdata作为参数传到后台获取数据
                console.log('打印数据sumsearchbar');
                console.log(postdata)
            },
            
        },

        created: function () {}
    }
</script>