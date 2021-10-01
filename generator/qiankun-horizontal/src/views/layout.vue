<template>
  <div class="index">
    <el-container style="height: 100vh">
      <el-header style="height: 60px">
        <div class="base">
          <img class="logo" src="@/assets/img/logo.png" alt="logo" />
          <span class="title">水平导航栏</span>
        </div>
        <div class="menu">
          <el-menu
            router
            :default-active="$route.path"
            mode="horizontal"
            active-text-color="#42b983"
          >
            <el-menu-item index="/nav1">导航一</el-menu-item>
            <el-submenu>
              <template slot="title">导航二</template>
              <el-menu-item index="/nav2">选项1</el-menu-item>
            </el-submenu>
          </el-menu>
        </div>
        <div class="right">右侧</div>
      </el-header>
      <el-container class="container">
        <el-main>
          <el-scrollbar class="calc-height">
            <router-view class="view" />
            <div id="container"></div>
          </el-scrollbar>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  name: 'index',
  data () {
    return {
    };
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss';
.el-menu-item.is-active {
  border-bottom: 0 solid white !important;
}

.el-header {
  border-bottom: solid 1px $g-color-border;
  line-height: 60px;
  position: relative;
  display: flex;
  align-items: center;
  :hover {
    color: $g-color-theme !important;
    cursor: pointer;
  }
  .base {
    min-width: 125px;
    width: calc(20% - 40px);
    display: flex;
    align-items: center;
    .logo {
      width: 40px;
      height: 40px;
      margin-right: 10px;
    }
    .title {
      width: 100px;
      height: 60px;
      font-size: $g-fs-lg;
      color: $g-color-theme;
    }
  }

  .menu {
    max-width: calc(100% - 175px);
    width: calc(80% + 12px);
    > .right {
      float: right;
      min-width: 50px;
      height: 60px;
    }
  }
}

.container {
  height: calc(100vh - 60px);
  padding-top: 20px;
  .el-main {
    padding: 0;
    overflow: hidden;
    color: $g-color-font--normal;
    height: 100%;
    display: flex;
    flex-direction: column;

    // 兼容ie 9-10
    @include g-media-attr(
      width,
      calc(100% - 150px) !important,
      calc(100% - 200px) !important,
      calc(100% - 250px) !important
    );
    float: left;

    .view {
      padding: 0 20px 20px 20px;
    }

    // 兼容ie 9-10
    .calc-height {
      height: calc(100% - 54px);
    }
  }
}
</style>
