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

      <el-form-item label="基金名称" style="width:500px" prop="FE_NAMEFUND">
        <el-input
          v-model="form.FE_NAMEFUND"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <el-form-item label="基金经理" style="width:500px" prop="FE_MANAGER">
        <el-input
          v-model="form.FE_MANAGER"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="手续费" style="width:500px" prop="FE_SERVICECHARGE">
        <el-input v-model="form.FE_SERVICECHARGE"></el-input>
      </el-form-item>

      <el-form-item label="基金池" style="width:500px" prop="FE_SCALE">
        <el-input v-model="form.FE_SCALE"></el-input>
      </el-form-item>

      <el-form-item label="基金类型" style="width:500px" prop="FE_TYPR">
        <el-select v-model="form.FE_TYPR" placeholder="请选择基金类型">
          <el-option label="混合型" value="BLEND"></el-option>
          <el-option label="股票型" value="STOCK"></el-option>
          <el-option label="债券型" value="BOND"></el-option>
          <el-option label="指数型" value="INDEX"></el-option>
          <el-option label="货币型" value="CURRENCY"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="风险等级" prop="FE_RISKGRADE">
        <el-radio-group v-model="form.FE_RISKGRADE">
          <el-radio label="R1"></el-radio>
          <el-radio label="R2"></el-radio>
          <el-radio label="R3"></el-radio>
          <el-radio label="R4"></el-radio>
          <el-radio label="R5"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="是否发行" prop="FE_ISSUE">
        <el-radio-group v-model="form.FE_ISSUE">
          <el-radio label="已发行"></el-radio>
          <el-radio label="未发行"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="基金介绍" style="width:800px" prop="FE_FUNDINTRODUCE">
        <el-input type="textarea" v-model="form.FE_FUNDINTRODUCE"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm(form)">申报基金</el-button>
<!--        <el-button @click="resetForm(form)">重置</el-button>-->
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
      var checkId = (rule, value, callback) => {//检查基金输入
        setTimeout(() => {
          if ((/^\d{6}$/).test(value) == false) {
            callback(new Error('请输入数字值且为6位'));
          }
        }, 1000);
      };
      var chechNb=(rule, value, callback)=>{
        if((/^\d+$|^\d*\.\d+$/g).test(value) == false){
          return callback(new Error('必须为数字或小数点'));
        }
      }
      return {
        form: {
          FE_CODEFUND:'',      //基金代码
          FE_NAMEFUND: '',     //基金名称
          FE_MANAGER:'',       //基金经理
          FE_NETWORTH: '',     //单位净值
          FE_EXPECTWORTH: '',  //净值估算
          FE_SERVICECHARGE: '',//手续费
          FE_RISKGRADE: '',    //风险等级
          FE_SCALE: '',        //基金池
          FE_FUNDINTRODUCE: '',//基金介绍
          FE_ISSUE: '',        //是否发行
          FE_TYPR:''           //基金类型
        },
        rules: {//检查
          FE_CODEFUND: [
            { required: true, message: "请输入基金代码", trigger: "blur" },
            { validator: checkId, trigger: 'blur' }
          ],
          FE_NAMEFUND: [
            { required: true, message: "请输入基金名称", trigger: "blur" },
            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
          ],
          FE_MANAGER: [
            { required: true, message: "请输入基金经理", trigger: "blur" },
            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
          ],
          FE_NETWORTH: [
            { required: true, message: "请输入单位净值", trigger: "blur" },
            { validator: chechNb, trigger: 'blur' }
          ],
          FE_EXPECTWORTH: [
            { required: true, message: "请输入净值估算", trigger: "blur" },
            { validator: chechNb, trigger: 'blur' }
          ],
          FE_SERVICECHARGE: [
            { required: true, message: "请输入手续费", trigger: "blur" },
            { validator: chechNb, trigger: 'blur' }
          ],
          FE_RISKGRADE: [{ required: true, message: "风险等级", trigger: "blur" }],
          FE_SCALE: [
            { required: true, message: "请输入基金池", trigger: "blur" },
            { validator: chechNb, trigger: 'blur' }
          ],
          FE_FUNDINTRODUCE: [
            { required: true, message: "请输入基金介绍", trigger: "blur" },
            { min: 1,  max: 40,message: '长度要大于 1 个字符', trigger: 'blur' }
          ],
          FE_ISSUE: [{ required: true, message: "请选择是否发售", trigger: "change" }],
          FE_TYPR: [{ required: true, message: "请选择基金类型", trigger: 'change' }]

        }
      }
    },

    methods: {
      submitForm(form) {
        // console.log(form);
        if(form.FE_CODEFUND==''//非空检查提交
          &&form.FE_NAMEFUND==''
          &&form.FE_MANAGER==''
          &&form.FE_NETWORTH==''
          &&form.FE_EXPECTWORTH==''
          &&form.FE_SERVICECHARGE==''
          &&form.FE_RISKGRADE==''
          &&form.FE_SCALE==''
          &&form.FE_FUNDINTRODUCE==''
          &&form.FE_ISSUE==''
          &&form.FE_TYPR==''){
          this.$message({
            showClose: true,
            duraction: 20001,
            message: "数据不能为空!",
            type: "error"
          })
          return false;
        };
            this.$axios.post("/admintowService/addFundMsg",
              {
                fe_CODEFUND:form.FE_CODEFUND,          //基金代码
                fe_NAMEFUND:form.FE_NAMEFUND,          //基金名称
                fe_MANAGER:form.FE_MANAGER,            //基金经理
                fe_NETWORTH:form.FE_NETWORTH,          //单位净值
                fe_EXPECTWORTH:form.FE_EXPECTWORTH,    //净值估算
                fe_SERVICECHARGE:form.FE_SERVICECHARGE,//手续费
                fe_RISKGRADE:form.FE_RISKGRADE,        //风险等级
                fe_SCALE:form.FE_SCALE,                //基金池
                fe_FUNDINTRODUCE:form.FE_FUNDINTRODUCE,//基金介绍
                fe_ISSUE:form.FE_ISSUE,                //是否发售
                fe_TYPR:form.FE_TYPR                   //基金类型
              },{emulateJSON: true},
              {
                headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",}
              }
              ).then(res => {
              if (res.data.code == 20000) {
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
      },
      resetForm(form) {//重置输入
        this.$refs[form].resetFields();
      }
    }
  }
</script>
