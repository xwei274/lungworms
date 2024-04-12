<template>
    <div>
        <h4>SearchBar 滑动框:</h4>
        <kuke-searchbar ref="search" :searchconfig="searchbarconfig" @getsearchdata="getSearchData"></kuke-searchbar>
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
                        type: 'label',
                        name: 'label',
                        title: '此处是只读文本label',
                        value: 'label'
                    },
                    {
                        type: 'text',
                        name: 'text',
                        title: '文本搜索',
                        value: 'aaa'
                    },
                    {
                        type: 'searchinput',
                        name: 'searchinput',
                        title: '搜索/异步搜索',
                        label: 'hello',
                        value: 'aaa',
                        requestUrl: 'http://rap2api.taobao.org/app/mock/8893/POST/searchBarInput'
                    },
                    // date
                    {
                        type: 'date',
                        name: 'date',
                        title: '日期1',
                        value: new Date()
                    },
                    {
                        type: 'datetime',
                        name: 'datetime',
                        title: '日期2',
                        value: new Date()
                    },
                    {
                        type: 'daterange',
                        name: 'daterange',
                        title: '日期3',
                        value: [new Date(new Date().setHours(0,0,0,0)), new Date(fun_date(7))]
                    },
                    {
                        type: 'datetimerange',
                        name: 'datetimerange',
                        title: '日期4',
                        value: [new Date(new Date().setHours(0,0,0,0)), new Date()]
                    },
                    {
                        type: 'select',
                        name: 'select',
                        title: '下拉搜索框',
                        optionText: '这是select',
                        options: [{
                            id: 1,
                            value: 'hello1'
                        },
                        {
                            id: 2,
                            value: 'hello2'
                        },
                        {
                            id: 3,
                            value: 'hello3'
                        }],
                        value: []
                    },
                    {
                        type: 'mutiselect',
                        name: 'mutiselect',
                        title: '多选下拉搜索框',
                        optionText: '这是select',
                        options: [{
                            id: 1,
                            value: '多选1'
                        },
                        {
                            id: 2,
                            value: '多选2'
                        },
                        {
                            id: 3,
                            value: '多选3'
                        }],
                        value: []
                    },
                ]
                // searchbarconfig:
                //     [{
                //         type: "select",
                //         name: "status",
                //         title: "状态",
                //         options: [{
                //             id: '',
                //             value: '状态'
                //         },
                //             {
                //                 id: -1,
                //                 value: '失效'
                //             },
                //             {
                //                 id: 1,
                //                 value: '处理中'
                //             },
                //             {
                //                 id: 2,
                //                 value: '完结'
                //             }
                //         ],
                //         value: 1
                //     },
                //         {
                //             type: "text",
                //             name: "name",
                //             title: "姓名",
                //             value: "aaa"
                //         },
                //         {
                //             type: "daterange",
                //             name: "createtime",
                //             title: "日期",
                //             value: ['2018-03-01','2018-03-12']
                //         },
                //         {
                //             type: "searchinput",
                //             name: "studentID",
                //             title: "学生ID",
                //             value:'',
                //             requestUrl:'http://rap2api.taobao.org/app/mock/8893/POST/searchBarInput'
                //         },
                //         {
                //             type: "searchinput",
                //             name: "studentName",
                //             title: "学生姓名",
                //             value:'3',
                //             requestUrl:'http://rap2api.taobao.org/app/mock/8893/POST/searchBarInput'
                //         }]
            }
        },

        methods: {
            //搜索回调事件
            getSearchData(postdata) {
                //使用postdata作为参数传到后台获取数据
                console.log('打印数据');
                console.log(postdata)
            },
            
        },

        created: function () {}
    }
</script>