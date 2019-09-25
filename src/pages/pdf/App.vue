<template>
    <div class="main-warp"> 
        <Header/>  
        <router-view></router-view>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import Header from '@/components/public/Header'
export default {
    name:'App',
    components:{
      Header
    },
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
    //    background: indianred;
       li{display: inline-block;width: 100px;
        a{display: inline-block;line-height: 30px;background: darkcyan;color: #fff;box-sizing: border-box;padding: 0 10px;}
       }
   }
</style>