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
            <el-submenu index="/nav2">
              <template  slot="title">导航二</template>
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
    <div @mousedown="move" v-if="style">
      <live2d
        :style="style"
        :model="[6, 1]"
        :direction="direction"
        :size="size"
      ></live2d>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'layout',
  data () {
    return {
      direction: 'right',
      size: 300,
      offsetLeft: 0,
      offsetTop: 0,
      style: ''
    };
  },
  mounted () {
    console.log(document.body.clientHeight)
    this.offsetTop = document.body.clientHeight - this.size;
    console.log(this.offsetTop)
    this.style = 'position: fixed;left: ' + 0 + 'px;top:' + this.offsetTop + 'px;zIndex: 999'
    console.log(this.style)
  },
  computed: {
    ...mapGetters({
      live2dMsg: 'live2d/msg'
    })
  },
  watch: {
    live2dMsg (v) {
      console.log(v)
    }
  },
  methods: {
    move (e) {
      const disX = e.clientX - this.offsetLeft;
      const disY = e.clientY - this.offsetTop;
      console.log(disX, disY)
      document.onmousemove = (e) => {
        // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
        const left = e.clientX - disX;
        const top = e.clientY - disY;
        console.log(left, disY)

        // 移动当前元素
        this.offsetLeft = left;
        this.offsetTop = top;

        this.style = 'position: fixed;left:' + left + 'px;top:' + top + 'px;zIndex: 999s';
        console.log(this.style)
      };
      document.onmouseup = (e) => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    }
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
