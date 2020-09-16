<template>
  <div>
    <!--主页面内嵌页面-->
    <!--顶部菜单栏(默认0,1,2级管理员都显示)-->
    <el-menu
      :default-active="$route.path"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#fff"
      text-color="#545c64"
      active-text-color="#ffd04b" router
      v-if="client == '2'||'1'||'0'"
    >

      <el-menu-item index="/fundmsg" style="width: 200px">
        <i class="el-icon-s-platform"></i>
        <span slot="title">返回首页</span>
      </el-menu-item>
      <el-menu-item  @click="submitForm">
        <i class="el-icon-s-custom"></i>
        <span slot="title">{{name}}</span>

      </el-menu-item>

    </el-menu>
    <el-container>
      <!--左侧菜单栏-->
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <!--导航栏主体(default-openeds为默认打开那些子菜单)-->
        <!--默认选择中的:default-active="'2-1'"-->
        <el-menu :default-openeds="['0']" :default-active="'0-0'">

<!--1级管理员受限制-->
          <!--动态组成下拉菜单-->
          <!--$router.options.routes为index.js中的页面集合组-->
          <!--router使其能够跳转指定页面,与<router-view>配套-  /    v-if="item.name != '信息查看'"过滤该名字的组件显示-->
          <el-menu router v-if="client == '1'">
            <el-submenu v-for="(item,index) in $router.options.routes" :key="item.id" :index="index+''"
                        v-if="(item.name == '信息查看' || item.name == '基金管理')">
              <template slot="title"><i class="el-icon-message"></i>{{item.name}}</template>
              <el-menu-item v-for="(item2,index2) in item.children" :key="item.id" :index="item2.path"
              :class="$route.path==item2.path?'is-active':''">{{item2.name}}</el-menu-item>
            </el-submenu>
          </el-menu>
<!--2级管理员不受限制-->
          <el-menu router v-if="client == '2'">
            <el-submenu v-for="(item,index) in $router.options.routes" :key="item.id" :index="index+''">
              <template slot="title"><i class="el-icon-message"></i>{{item.name}}</template>
              <el-menu-item v-for="(item2,index2) in item.children" :key="item.id" :index="item2.path"
                            :class="$route.path==item2.path?'is-active':''">{{item2.name}}</el-menu-item>
            </el-submenu>
          </el-menu>

        </el-menu>

      </el-aside>

      <!--主显示-->
      <el-main style="padding: 0px">
        <!--为显示的模块打开窗口(只有1,2级管理员能看到)-->
        <router-view v-if="client == '1'||client == '2'">
<!--            用于显示加载的vue-->
        </router-view>

      </el-main>

    </el-container>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        client:'0',//登录的管理员权限等级
        name:'',//管理员名字
        FE_CODEFUND:'',
        reverse: true,
      };
    },
    mounted () {//调用管理员权限获取
      this.getGrade();
    },
    methods:{
//获取管理员权限
      getGrade(){
        if(this.client == 0){
          this.$router.push({path:'/login'});//跳转登录页面
        }
        this.$axios.post("/admintowService/getGrade",
          {
            at_JOBNUMBER:localStorage.getItem("admin"),//获取员工工号
          }
        )
        .then(res => {
          // console.log(res);//获取整个表单
          // this.client=res.data.data.at_GRADE;//赋值权限等级
          if (res.data.code == 20000 && (res.data.data.at_GRADE == 1 || res.data.data.at_GRADE == 2)) {
            this.$message({
              showClose: true,
              duraction: 20000,
              message: "已获取权限",
            })
            this.name="("+res.data.data.at_NAME+")-登出";//设置管理员名字
            this.client=res.data.data.at_GRADE;//赋值权限等级
          }else{
            this.$message({
              showClose: true,
              duraction: 20002,
              message: "不是管理员无法进入",
              type: "error"
            });
          }
        })
      },
//退出登录
      submitForm(){
        this.$axios.post("/admintowService/exitLogin",
          {
            at_JOBNUMBER:this.client,//管理员编号
            at_GRADE:'',//管理员权限
          },{emulateJSON: true},
          {headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",}}//开启与设置参数格式
        ).then(res => {
          if (res.data.code == 20000) {
            this.$message({
              showClose: true,
              duraction: 20000,
              message: "已退出",
            })
            localStorage.removeItem("admin");//清理localStorage
            this.$router.push({path:'/login'});//跳转登录页面
          }
        })
      }
    }
  };
</script>
<style>
  body {
    background-image: url("../../static/images/background.jpg");
    background-size: 100%;
  }
</style>
