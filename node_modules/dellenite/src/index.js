import SearchBar from './components/SearchBar'
import SumSearchBar from './components/SumSearchBar'
import TabBar from './components/TabBar'
import RouterBar from './components/RouterBar'
import SideBar from './components/SideBar'
import ShowLine from './components/ShowLine'

const kukeview = {
    'kuke-searchbar': SearchBar,
    'kuke-sumsearchbar': SumSearchBar,
    'kuke-tabbar': TabBar,
    'kuke-routerbar': RouterBar,
    'kuke-sidebar': SideBar,
    'kuke-showline': ShowLine,
}

const install = function(Vue, opts = {}){
    Object.keys(kukeview).forEach((key) => {
        Vue.component(key, kukeview[key]);
    })
}
export default install;
