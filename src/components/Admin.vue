<template>
  <div>
    <!--顶部菜单栏-->
    <el-menu
      :default-active="$route.path"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#fff"
      text-color="#545c64"
      active-text-color="#ffd04b" router>

      <el-menu-item index="11">
        <i class="el-icon-menu"></i>
        <span slot="title">搜索简历</span>
      </el-menu-item>
      <el-menu-item index="12">
        <i class="el-icon-menu"></i>
        <span slot="title"> 人才库</span>
      </el-menu-item>
    </el-menu>
    <el-container>
      <!--左侧菜单栏-->
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <!--导航栏主体(default-openeds为默认打开那些子菜单)-->
        <!--默认选择中的:default-active="['2-1']"-->
        <el-menu :default-openeds="['1']" :default-active="['1-1']">

          <!--可以展开的菜单-->
          <el-submenu index="1">
            <!--i设置菜单图标-->
            <template slot="title"><i class="el-icon-menu"></i>信息查看</template>
            <el-menu-item-group>
              <el-menu-item index="1-1">查看基金信息</el-menu-item>
              <el-menu-item index="1-2">查看用户信息</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title"><i class="el-icon-message"></i>基金管理</template>
            <el-menu-item-group>
              <el-menu-item index="2-1">申报基金</el-menu-item>
              <el-menu-item index="2-2">下架基金</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title"><i class="el-icon-setting"></i>申报进度</template>
            <el-menu-item-group>
              <el-menu-item index="3-1">审查进度查看</el-menu-item>
              <el-menu-item index="3-2">审查历史记录</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="4">
            <template slot="title"><i class="el-icon-setting"></i>员工信息</template>
            <el-menu-item-group>
            <!--  <template slot="title">分组一</template>-->
              <el-menu-item index="3-1">个人信息</el-menu-item>
              <el-menu-item index="3-2">值班信息</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

        </el-menu>
      </el-aside>

      <!--主显示-->
      <el-main>

        <router-view>

        </router-view>

      </el-main>

    </el-container>


  </div>
</template>
<script>

</script>
<style>
  body {
    background-image: url("../../static/images/background.jpg");
    background-size: 100%;
  }
</style>
