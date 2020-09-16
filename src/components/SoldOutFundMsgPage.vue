<template>
  <div >

    <el-form
      ref="form"
      :model="form"
      label-width="180px"
      style="padding: 0px"
      :rules="rules"
    >
      <el-row>
        <el-col :span="24"><div class="grid-content bg-purple-dark"><img ></div></el-col>
      </el-row>

      <el-form-item label="基金代码" style="width:500px" prop="FE_CODEFUND">
        <el-input
          v-model="form.FE_CODEFUND"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <el-form-item label="下架原因" style="width:500px" prop="AP_CONTENT">
        <el-input
          v-model="form.AP_CONTENT"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <el-form-item label="提交时间" style="width:700px">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.AP_SUBMISSIONTIME" style="width: 100%;"></el-date-picker>
        </el-col>
<!--        <el-col class="line" :span="2">-</el-col>-->
<!--        <el-col :span="11">-->
<!--          <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>-->
<!--        </el-col>-->
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm(form)">下架基金</el-button>
      </el-form-item>
      <el-row>
        <el-col :span="24"><div class="grid-content bg-purple-dark"><img ></div></el-col>
      </el-row>
    </el-form>
  </div>
</template>

<style>
  .el-form {
    background-color: #ccdaeb;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
</style>

<script>
  export default {
    data() {
      var checkId = (rule, value, callback) => {//检查基金编号输入
        if (!value) {
          return callback(new Error('基金代码不能为空'));
        }
        setTimeout(() => {
          if ((/^\d{6}$/).test(value) == false) {
            callback(new Error('请输入数字值且为6位'));
          }
        }, 1000);
      };

      return {
        form: {
          FE_CODEFUND:this.$route.query.mallCode,      //基金代码
          AP_CONTENT: '',     //审批内容
          AP_SUBMISSIONTIME:''//提交时间
        },
        rules: {//检查
          FE_CODEFUND: [
            { required: true, message: "请输入基金代码", trigger: "blur" },
            { validator: checkId, trigger: 'blur' }
          ],
          AP_CONTENT: [
            { required: true, message: "请输入下架原因", trigger: "blur" },
            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
          ],
        }
      }
    },
    //初始化方法
    mounted:function(){
    },

    methods: {
      submitForm(form) {
        if(form.FE_CODEFUND==''||form.AP_CONTENT==''&&form.AP_SUBMISSIONTIME==''){
          this.$message({
            showClose: true,
            duraction: 20002,
            message: "数据不能为空!",
            type: "error"
          })
          return false;
        }
        // console.log(this.qs.stringify(this.form));//获取整个表单
        this.$axios.post("/admintowService/soldOutFundMsg",
          {
            fe_CODEFUND:form.FE_CODEFUND,
            ap_CONTENT:form.AP_CONTENT,
            ap_SUBMISSIONTIME:form.AP_SUBMISSIONTIME,
          },{emulateJSON: true},
          {
            headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",}
          }
        ).then(res => {
          if (res.data.code == 20000) {//获取返回的数据代码
            this.$alert('已提交,等待审批通过', '提交审批', {
              confirmButtonText: '确定',
              // callback: action => {
              //   this.$message({
              //     type: 'info',
              //     message: `action: ${ action }`
              //   });
              // }
            });
          } else {
            this.$message({
              showClose: true,
              duraction: 20001,
              message: "提交出错,请反馈给管理员",
              type: "error"
            })
          }
        })
      }
    }
  }
</script>
