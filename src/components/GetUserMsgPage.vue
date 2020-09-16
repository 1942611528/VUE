<template>
  <div>
    <!--    :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"-->
    <el-table
      :data="AdminData.filter(records => !search || records.atName.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%">

      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <!--      返回管理员工号、头像、姓名、级别,按照级别升序排序-->
      <el-table-column
        prop="atJobnumber"
        label="身份证"
        sortable>
      </el-table-column>
      <el-table-column
        label="姓名"
        prop="atName">
      </el-table-column>
      <el-table-column
        label="性别"
        prop="atName">
      </el-table-column>
      <el-table-column
        label="手机号"
        prop="atGrade"
        sortable>
      </el-table-column>

      <el-table-column
        align="right">

        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入关键字搜索"/>
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.row.atJobnumber)">修改</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.atJobnumber)">删除</el-button>
        </template>

      </el-table-column>
    </el-table>
    <!-- 页码 -->
    <div class="page">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="pageSize"
        :total= "pageTotal"
        @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        jok4:[{FE_CODEFUND:'1'},{FE_CODEFUND:'天台基金'},{FE_CODEFUND:'天台基金'},{FE_CODEFUND:'天台基金'},{FE_CODEFUND:'天台基金'},{FE_CODEFUND:'天台基金'},{FE_CODEFUND:'天台基金'}],
        // 数据不够分页是隐藏分页效果
        hidePage: true,
        // 当前页数(默认值为1)
        current: 1,
        // 页容量
        pageSize: 7,
        // 总记录数
        pageTotal: 1,
        AdminData:[],// 管理员数据
        search: '' // 搜索框内容
      }
    },
    methods: {
      // 获取管理员信息
      findAdminInfo() {
        // this.$alert(开始);
        // 发送axios请求(相当于ajax请求)
        this.$axios.post("/admin1Service/getUserMsg", this.qs.stringify({
          // this.form.atTellphone 你输入的内容
          current: this.current
        })).then(res => { // res：返回的数据，相当于ajax的rs
          console.log(res);
          if (res.data.code == 20000) {
            this.AdminData = res.data.records;
            this.pageTotal = res.data.total;
            this.pageSize = res.data.pageSize;
          }
        });
      },
      // 当前页改变时会触发
      handleCurrentChange(val) {
        // this.$alert(val);
        this.current = val;
        this.findAdminInfo();
      },
      handleEdit(atJobnumber) {
        //console.log(index, row);
        this.$alert(atJobnumber);
      },
    },
    // TODO 钩子函数：create、mounted
    mounted() {
      this.findAdminInfo();
    }
  }
</script>
<style>
  .el-table{
    background-color: #ffffff;
  }
  .el-pagination {
    text-align: center;
    padding-top: 30px;
  }
</style>
