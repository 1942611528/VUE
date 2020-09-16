<template>
  <div>

    <el-table
      :data="tableData"
      border
      style="width: 100%">

      <el-table-column prop="fe_CODEFUND" label="基金代码" >
      </el-table-column>
      <el-table-column prop="fe_NAMEFUND" label="基金名称">
      </el-table-column>
      <el-table-column prop="fe_MONTHPIC" label="近一月涨幅">
      </el-table-column>
      <el-table-column prop="fe_MANAGER" label="发起人(公司)">
      </el-table-column>
      <el-table-column prop="address" label="最小购入">
      </el-table-column>
      <el-table-column prop="address" label="基金类型">
      </el-table-column>
      <el-table-column prop="address" label="利率">
      </el-table-column>
      <el-table-column prop="fe_SERVICECHARGE" label="手续费">
      </el-table-column>
      <el-table-column prop="fe_RISKGRADE" label="风险等级">
      </el-table-column>
      <el-table-column prop="fe_FUNDINTRODUCE" label="基金介绍">
      </el-table-column>
      <el-table-column prop="fe_ISSUE" label="是否发行">
      </el-table-column>
      <el-table-column prop="fe_APPROVALS" label="审批进度">
      </el-table-column>
      <el-table-column prop="fe_SCALE" label="基金池">
      </el-table-column>

      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="btnClick(scope.row.fe_CODEFUND)" type="text" size="small" >下架</el-button>
        </template>
      </el-table-column>

    </el-table>
    <!--页码-->
    <div class="tabListPage">

      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="thsPage"
                     background
                     :page-size="hasPage" layout="total, prev, pager, next"
                     :total="totalCount">
      </el-pagination>

    </div>

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
        // 总数据
        tableData:[],
        // 默认显示第几页
        thsPage:1,
        // 总条数，根据接口获取数据长度(注意：这里不能为空)
        totalCount:1,
        // 默认每页显示的条数（可修改）
        hasPage:7,
      }
    },

    methods:{
      //跳转下架页面
      btnClick(fe_CODEFUND) {
        this.$router.push({path:'/soldoutfund/',
            query: {
            mallCode: fe_CODEFUND
        }})
      },
      // 将页码，及每页显示的条数以参数传递提交给后台
      getData(n1,n2){
        // 这里使用axios，使用时请提前引入
        this.$axios.post("/admintowService/getFundMsg",{
            // 每页显示的条数
            hasPage:n1,
            // 显示第几页
            thsPage:n2,
          },{emulateJSON: true},
          {
            headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",}
          }
        ).then(reponse=>{

          console.log(reponse)
          // 将数据赋值给tableData
          this.tableData=reponse.data.records;
          // 将数据的长度赋值给totalCount
          this.totalCount=reponse.data.data.totalCount;
        })
      },
      // 分页
      // 每页显示的条数
      handleSizeChange(val) {
        // 改变每页显示的条数
        this.hasPage=val
        // 点击每页显示的条数时，显示第一页
        this.getData(val,1)
        // 注意：在改变每页显示的条数时，要将页码显示到第一页
        this.thsPage=1
      },
      // 显示第几页
      handleCurrentChange(val) {
        // 改变默认的页数
        this.thsPage=val
        // 切换页码时，要获取每页显示的条数
        this.getData(this.hasPage+this.thsPage-1,(this.thsPage))
      },
    },
    created:function(){
      this.getData(this.hasPage,this.thsPage)
    }
  }
  //var jok4;//存放返回的数据
/*  export default {
    // 数据
    data() {
      return {
        logining: false,
        jok4:[{date:'1'},{name:'天台基金'}],

      }
    },
    //页面加载完成后执行
    mounted:function(){
      //this.getJokes(1,10);
    },
    // 方法
    methods: {
      getJokes(na,mu){
        this.$axios.post("/getFundMsg",{thsPage:na,hasPage:mu})//请求笑话
          .then(
            function(response){
              var jsonObj = JSON.parse(JSON.stringify(response.data));//获取后端的数据
              console.log(response.data);//返回json下的data属性
              jok4=response.data;
              console.log(jok4);
              console.log(jsonObj);
            }
          )
      }

    }
  }*/
</script>
