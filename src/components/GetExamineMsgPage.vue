<template>
  <div class="block" id="tabs">

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

      <el-form-item>
        <el-button type="primary" @click="submitForm(form)">查看历史记录</el-button>
      </el-form-item>
    </el-form>

    <div class="radio" id="tab">
      时间排序方式：
      <el-radio-group v-model="reverse">
        <el-radio :label="true">倒序</el-radio>
        <el-radio :label="false">正序</el-radio>
      </el-radio-group>
    </div>

    <el-timeline :reverse="reverse">
      <el-timeline-item
        v-for="(activity, index) in activities"
        :key="index"
        :timestamp="activity.ap_SUBMISSIONTIME">
        {{activity.ap_CONTENT}}
      </el-timeline-item>
    </el-timeline>
  </div>

</template>

<script>
  export default {
    data() {
      var checkId = (rule, value, callback) => {//检查基金输入
        if (!value) {
          return callback(new Error('基金代码不能为空'));
        }
        setTimeout(() => {
          if ((/^\d{6}$/).test(value) == false) {
            callback(new Error('请输入数字值且为6位'));
          }
        }, 1000);//延迟1000毫秒及1秒
      };
      return {
        form:{
          FE_CODEFUND:''//存放需要查询的基金审核信息的id
        },
        reverse: true,
        activities: [],
        rules: {//检查
          FE_CODEFUND: [
            {required: true, message: "请输入基金代码", trigger: "blur"},
            {validator: checkId, trigger: 'blur'}
          ],
        }
      };
    },
    // mounted () {
    //   this.fund()
    // },
    methods:{
      submitForm(form){
        if(form.FE_CODEFUND==''){
          this.$message({
            showClose: true,
            duraction: 20002,
            message: "数据不能为空!",
            type: "error"
          })
          return false;
        }
        this.$axios.post("/admintowService/getExamineMsg",{
            fe_CODEFUND:form.FE_CODEFUND,
          },{emulateJSON: true},//开启json设置
          {
            headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",}//设置发往后台的数据格式
          }
        ).then(reponse=>{
          if (reponse.data.code == 20002) {
            this.$message({
              showClose: true,
              duraction: 20002,
              message: "输入数据不存在",
              type: "error"
            })
          }
          console.log(reponse.data.records);
          // 将数据赋值给tableData
          this.activities=reponse.data.records;
        })
      }
    }
  };
</script>

<style scoped>
  .el-timeline {
    /*background-color: #B3C0D1;*/
    color: #333;
    /*line-height: 60px;*/
    margin: 0 110px;
  }
  #tab{
    /*background-color: #B3C0D1;*/
    color: #333;
    line-height: 60px;
    margin: 0 110px;
  }
  #tabs{
    background-color: #ccdaeb;
    color: #333;
  }
</style>
