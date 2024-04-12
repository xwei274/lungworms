import Vue from 'vue'
import Router from 'vue-router'
import SearchBar from '../pages/SearchBar.vue'
import SumSearchBar from '../pages/SumSearchBar.vue'
import tabbar from '../pages/TabBar.vue'
import routerbar from '../pages/RouterBar.vue'
import sidebar from '../pages/SideBar.vue'
import showline from '../pages/ShowLine.vue'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/SearchBar'
        },
        {
            path: '/SearchBar',
            name: 'SearchBar',
            component: SearchBar
        },
        {
            path: '/SumSearchBar',
            name: 'SumSearchBar',
            component: SumSearchBar
        },
        {
            path: '/tabbar',
            name: 'tabbar',
            component: tabbar
        },
        {
            path: '/routerbar',
            name: 'routerbar',
            component: routerbar
        },
        {
            path: '/sidebar',
            name: 'sidebar',
            component: sidebar
        },
        {
            path: '/showline',
            name: 'showline',
            component: showline
        },
    ]
})
