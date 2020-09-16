import Vue from 'vue'
import Router from 'vue-router'
import SoldOutFundMsgPage from '@/components/SoldOutFundMsgPage'
import GetFundMsgPage from '@/components/GetFundMsgPage'
import AddFundPage from '@/components/AddFundMsgPage'
import Index from '@/components/Index'
import AdminMsgPage from '@/components/AdminMsgPage'
import GetExamineMsgPage from '@/components/GetExamineMsgPage'

Vue.use(Router)

/**
 * 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
 */
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export default new Router({
  routes: [
    {
      path: '/fundmsg',
      name: '信息查看',
      component: Index,
      redirect:"/fundlist",//默认访问的页面
      children:[//设置子节点
        {//基金信息显示页面
          path: '/fundlist',
          name: '查询基金信息',
          component: GetFundMsgPage
        },
        // {
        //   path: '/userlist',
        //   name: '查询用户信息',
        //   component: GetUserMsgPage
        // },
        {
          path: '/adminlist',
          name: '管理员个人信息',

          component: AdminMsgPage
        }
      ]
    },
    {
      path: '/navigation',
      name: '基金管理',
      component: Index,
      children:[//设置子节点
        {//基金信息显示页面
          path: '/addfund',
          name: '申报基金',
          component: AddFundPage
        },
        {
          path: '/soldoutfund',
          name: '下架基金',
          component: SoldOutFundMsgPage
        },
        {
          path: '/fundExamine',
          name: '指定基金审查进度',
          meta:{//权限
            roles:['1']
          },
          component: GetExamineMsgPage
        }
      ]
    }
  ]
})
