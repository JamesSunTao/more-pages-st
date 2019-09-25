<template>
    <section>
        <!-- top -->
        <div class="study-t clearfix">            
            <h1>
                {{title}}
            </h1>
                      
        </div>
        <!-- top -->
    </section>
</template>
<script>
    export default {
        name:'Header',
        data(){
            return {
                title:"我是标题上面方法可以进行封装"
            }
        },
        created(){
          this.initData();
        },
        methods: {
            initData(){ 
                let data =  {
                    "tableName" : window.InitData.tableName,
                    "dbCode" : window.InitData.dbCode,
                    "fileName" : window.InitData.fileName,
                    "fsType" : window.InitData.FileSourceType
                };
                this.Http.post('File/GetPdfTiluInfo',data).then(res => {
                    debugger
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    .study-t{        
        position: relative;
        background: #fff;
        border-bottom: 2px solid #3474d9;
        h1{
           height: 45px;line-height: 45px;padding-left: 45px;
        }
    }
    
</style>