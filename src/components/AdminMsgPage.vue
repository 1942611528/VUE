<template>
  <div>

    <el-table
      :data="tableData"
      border
      style="width: 100%">

      <el-table-column prop="at_JOBNUMBER" label="管理员工号" >
      </el-table-column>
      <el-table-column prop="at_NAME" label="管理员名字">
      </el-table-column>
      <el-table-column prop="at_TELLPHONE" label="电话">
      </el-table-column>
      <el-table-column prop="at_GRADE" label="管理员等级">
      </el-table-column>

    </el-table>
  </div>
</template>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  .el-pagination {
    background-color: #ffffff;
    color: #333;
    padding-top: 30px;
    line-height: 60px;
    text-align: center;
  }
  .el-aside {
    color: #333;
  }
</style>

<script>
  export default {
    data(){
      return {
        tableData:[],//存放返回的数据
      }
    },

    methods:{
      // 将页码，及每页显示的条数以参数传递提交给后台
      getData(n1){
        // 这里使用axios，使用时请提前引入
        this.$axios.post("/admintowService/getAdminMsg",{
            // 每页显示的条数
            at_JOBNUMBER:'202001',//url获取管理员编号
          },
          {emulateJSON: true},
          {
            headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",}
          }
        ).then(reponse=>{
          console.log(reponse)
          // 将数据赋值给tableData
          this.tableData=reponse.data.records;
        })
      },
    },
    created:function(){
      this.getData(this.hasPage)
    }
  }
</script>
