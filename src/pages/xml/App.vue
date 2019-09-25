<template>
    <div class="main-warp"> 
        <ul>
            <li><router-link to="/">home xml</router-link></li>
            <li><router-link to="/about">about xml</router-link></li>
        </ul>
        <router-view></router-view>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    name:'App',
    data () {
        return {
        };
    },
    methods: {

    }
}

</script>
<style lang='scss' scoped>
   .main-warp{
       background: olive;
   }
</style>