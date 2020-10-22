<template>
  <div id="menu">
    <div v-if="isMobile()" class="mb_header-container">
      <SMenu :menu="menus" :collapsible="collapsible"></SMenu>
    </div>
    <div v-else class="pc_header-container">
      <div class="container">
        <div class="left">
          <span class="cn">信息技术</span><br>
          <span class="en">technology</span>
        </div>
        <div class="right">
          <span v-for="(item, index) in menus" :key="index">
            <el-tooltip v-if="item.children && item.children.length" effect="light">
              <span class="item"> {{item.meta.title}} </span>
              <div slot="content">
                <ul class="menu-ul">
                  <li v-for="(subItem, subIndex) in item.children" :key="subIndex">
                    <a :href="subItem.path">{{subItem.meta.title}}</a>
                  </li>
                </ul>
              </div>
            </el-tooltip>
            <span class="item" v-else><a :href="item.path">{{item.meta.title}}</a></span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SMenu from "./menu";
import { mixinDevice } from "@/utils/mixin";
export default {
  mixins: [mixinDevice],
  props: {
    menus: {
      type: Array,
      required: true
    },
    collapsible: {
      type: Boolean,
      required: true
    }
  },
  name: "SideMenu",
  components: {
    SMenu
  },
  created(){
    console.log(this.menus)
  }
};
</script>
<style lang="less" scoped>
.el-tooltip__popper{
  border-radius: 0 !important;
}
.el-tooltip__popper.is-light{
  border: 1px solid #b7bac1 !important;
}
.menu-ul{
  li{
    cursor: pointer;
    margin: 10px;
    font-size: 13px;
  }
}
#menu {
  .el-menu-vertical {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 800;
  }
  .mb_header-container .el-menu-vertical:not(.el-menu--collapse) {
    width: 200px;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
  }
  .pc_header-container{
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    height: 64px;
    margin: auto;
    background-color: #ffffff;
    box-shadow: 0 0.214286rem 0.428571rem 0.071429rem rgba(17,47,67,.19);
    -webkit-box-shadow: 0 0.214286rem 0.428571rem 0.071429rem rgba(17,47,67,.19);
    .item{
      margin-left: 3.5rem;
    }
    .container{
      width: 100%;
      height: 64px;
      font-size: 14px;
      margin-left: auto;
      margin-right: auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .en{
        font-size: 10px;
      }
    }
  }
  @media only screen and (min-width: 1200px){
    .pc_header-container{
      .container {
        width: 1127px;
      }
    }
  }
  @media only screen and (max-width: 1200px) and (min-width: 991px){
    .pc_header-container{
      .container {
        width: 900px;
      }
    }
  }
  @media only screen and (max-width: 991px) and (min-width: 768px){
    width: 723px;
  }
}
</style>
