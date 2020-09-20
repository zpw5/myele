<template>
  <div class="navbar">
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container" />
    <breadcrumb class="breadcrumb-container" />
    <div class="right-menu">

      <template v-if="device!=='mobile'">
        <!--        <search id="header-search" class="right-menu-item" />-->

        <!--        <error-log class="errLog-container right-menu-item hover-effect" />-->
        <div class="right-menu-item">
           <div> 园区选择:</div>
        </div>
         <div class="right-menu-item">
           <div>
             <el-select v-model="selArea" placeholder="请选择园区">
                <el-option
                  v-for="item in this.areas"
                  :key="item.area_id"
                  :label="item.area_name"
                  :value="item.area_id">
                </el-option>
              </el-select>
           </div>
        </div>
        <screenfull id="screenfull" class="right-menu-item hover-effect" />

      </template>

      <!--个人-->
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
          <router-link to="/user/center">
            <el-dropdown-item>
              个人中心
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item>
            <span style="display:block;" @click="setting">系统设置</span>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import Screenfull from '@/components/Screenfull'
import { Loading } from 'element-ui';
let loading;

export default {
  components: {
    Breadcrumb,
    Hamburger,
    Screenfull
  },
  
  data() {
   
   return{
      areas:new Array(),
      selArea:0
   }
    
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'name',
      'avatar',
      'device'
    ])
  },
   //创建时装载园区数据
  mounted(){   

    var _this = this
　　this.startLoading()                     //显示装载等待
 
    this.$nextTick(function () {
      _this.$store.dispatch('GetTenantAreaList').then(() => {

        
                _this.areas = _this.$store.state.area.areas
                if (null != _this.areas)      //如果有园区则选择默认园区
                {
                    _this.selArea = _this.areas[0].area_id

                    _this.$store.commit('SET_CUR_AREA', _this.areas[0])
                    
                }

                this.$forceUpdate()
                loading.close()

              }).catch((ex)=>{
                debugger
                loading.close()
              })
    })
    },
  methods: {
    
     startLoading() {
       loading = Loading.service({
      lock: true,
      text: '加载园区数据……',
      background: 'rgba(0, 0, 0, 0.7)'
      })
    },
    setting() {
      this.$store.commit('openSettingBar', true)
    },
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },

    // 退出登录
    logout() {
      this.$confirm('是否退出系统, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('LogOut').then(() => {
          location.reload()
        })
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .navbar {
    height: 50px;
    overflow: hidden;

    .hamburger-container {
      line-height: 46px;
      height: 100%;
      float: left;
      cursor: pointer;
      transition: background .3s;

      &:hover {
        background: rgba(0, 0, 0, .025)
      }
    }

    .breadcrumb-container {
      float: left;
    }

    .errLog-container {
      display: inline-block;
      vertical-align: top;
    }
    
    .right-menu {
      float: right;
      height: 100%;
      line-height: 50px;

      &:focus {
        outline: none;
      }

      .right-menu-item {
        display: inline-block;
        padding: 0 8px;
        height: 100%;
        font-size: 18px;
        color: #5a5e66;
        vertical-align: text-bottom;

        &.hover-effect {
          cursor: pointer;
          transition: background .3s;

          &:hover {
            background: rgba(0, 0, 0, .025)
          }
        }
      }

      .avatar-container {
        margin-right: 30px;

        .avatar-wrapper {
          margin-top: 5px;
          position: relative;

          .user-avatar {
            cursor: pointer;
            width: 40px;
            height: 40px;
            border-radius: 10px;
          }

          .el-icon-caret-bottom {
            cursor: pointer;
            position: absolute;
            right: -20px;
            top: 25px;
            font-size: 12px;
          }
        }
      }
    }
  }
</style>
