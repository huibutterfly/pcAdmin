<template>
  <div class="baseLayoutContainer">
    <div v-if="isMobile()">
      <div class="topMenu">
        <MenuHeader @toggle="setCollapsed"></MenuHeader>
      </div>
      <el-drawer :visible.sync="collapsed" :with-header="false" direction="ltr">
        <SideMenu :menus="menus" :collapsible="false"></SideMenu>
      </el-drawer>
    </div>
    <div class="contentItem">      
      <div class="topMenu pcMenu" v-if="!isMobile()">
        <SideMenu :menus="menus" :collapsible="false"></SideMenu>
      </div>
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
  </div>
</template>
<script>
import SideMenu from "@/components/Menu/SideMenu";
import MenuHeader from "@/components/MenuHeader/MenuHeader";
import { mapState, mapActions } from "vuex";
import { triggerWindowResizeEvent } from "@/utils/util";
import { mixin, mixinDevice } from "@/utils/mixin";

export default {
  name: "basic",
  components: {
    SideMenu,
    MenuHeader
  },
  mixins: [mixin, mixinDevice],
  data() {
    return {
      menus: [],
      collapsed: false,
      multiTab: true
    };
  },
  computed: {
    ...mapState({
      mainMenu: state => state.permission.addRouters
    }),
  },
  watch: {
    sidebarOpened (val) {
      this.collapsed = !val
    }
  },
  created() {
    this.menus = this.mainMenu.find(item => item.path === "/").children;
    this.collapsed = !this.sidebarOpened
  },
  methods: {
    ...mapActions(["setSidebar"]),
    setCollapsed() {
      this.collapsed = !this.collapsed;
      this.setSidebar(!this.collapsed);
      triggerWindowResizeEvent();
    }
  }
};
</script>
<style lang="less" scoped>
.baseLayoutContainer {
  width: 100%;
  height: auto;
  display: flex;
  overflow-x: hidden;
  .topMenu{
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
  }
  .pcMenu{
    margin-left: auto;
    margin-right: auto;
  }
  > .contentItem {
    width: 100%;
    min-height: 100vh;
    padding-top: 68px;
    box-sizing: border-box;
  }
}
</style>
