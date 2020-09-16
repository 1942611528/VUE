<template>
  <div id="login">
    <div class="loginToHome">
      <el-form
        ref="form"
        :model="form"
        :rules="ruleForm"
        status-icon
        label-width="80px"
        class="loginForm"
      >
        <h3>系统登录</h3>
        <el-form-item
          label="手机号"
          prop="atTellphone"
        >
          <el-input
            type="text"
            v-model="form.atTellphone"
            auto-complete="off"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="atPassword"
        >
          <el-input
            type="password"
            v-model="form.atPassword"
            auto-complete="off"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            class="homeBut"
            type="primary"
            plain
            @click="submit('form')"
            :loading="logining"
          >登录
          </el-button>
          <el-button
            class="loginBut"
            type="primary"
            plain
            @click="resetForm('form')"
          >重置
          </el-button>
        </el-form-item>
      </el-form>

    </div>
  </div>
</template>
<!--  TODO 1.页面缩小，背景图显示异常
            2. 手机号正则验证
-->
<script>
  export default {
    // 数据
    data() {
      return {
        logining: false,
        form: {
          atTellphone: '',
          atPassword: ''
        },
        ruleForm: {
          atTellphone: [
            {required: true, message: '请输入手机号', trigger: 'blur'},
          ],
          atPassword: [
            {required: true, message: '请输入密码', trigger: 'blur'},
          ]
        }
      }
    },
    // 方法
    methods: {
      //页面加载完成后执行
      mounted:function(){

      },
      submit(form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            // 发送axios请求(相当于ajax请求)
            this.$axios.post("/adminService/login", this.qs.stringify({
              // this.form.atTellphone 你输入的内容(及data)
              atTellphone: this.form.atTellphone,
              atPassword: this.form.atPassword
            })).then(res => { // res：返回的数据，相当于ajax的rs
                // console.log(res);
                if (res.data.code == 20001) {
                  this.$alert('用户名或密码错误', '温馨提示')
                  this.form.atTellphone = "";
                  this.form.atPassword = "";
                } else {
                  this.$alert('登录成功', '温馨提示')
                  //this.$router.push({path: 'https://www.baidu.com'});
                }
            })
          } else {
            console.log('登录失败');
            return false;
          }
        })
      },
      resetForm(form) {
        this.$refs[form].resetFields();
      }

    }
  }
</script>
<style>
  body {
    background-image: url("../../static/images/background.jpg");
    background-size: 100%;
  }

  .loginToHome {
    position: absolute;
    left: 0px;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 400px;
    height: 260px;
    -webkit-border-radius: 5px;
    border-radius: 5px;
    background: #fff;
    border: 1px solid #dcdfe6;
  }

  .loginForm {
    text-align: center;
    padding-top: 15px;
    padding-right: 30px;
    top: 10px;
  }

  .homeBut {
    position: absolute;
    left: 0px;
  }

  .loginBut {
    position: absolute;
    right: 0px;
  }
</style>
