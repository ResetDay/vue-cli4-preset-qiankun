<template>
  <div
    class="vue-live2d"
    ref="vue-live2d"
    :style="{ width: live2dWidth + 'px', height: live2dHeight + 'px' }"
    @mouseover="toolShow = true"
    @mouseout="toolShow = false"
  >
    <div v-show="mainShow">
      <!-- 对话框 -->
      <div class="vue-live2d-tip" v-html="tipText" v-show="tipShow"></div>
      <!-- 模型 -->
      <canvas
        :id="live2dMainId"
        ref="vue-live2d-main"
        :width="live2dWidth"
        :height="live2dHeight"
        class="vue-live2d-main"
      ></canvas>
      <!-- 工具栏 -->
      <div class="vue-live2d-tool" ref="vue-live2d-tool" v-show="toolShow">
        <span
          class="fa fa-lg"
          v-for="(tool, index) in tools"
          :key="index"
          :class="tool.name"
          @click="tool.click"
        />
      </div>
    </div>
    <!-- 隐藏切换 -->
    <div
      class="vue-live2d-toggle"
      ref="vue-live2d-toggle"
      v-show="!mainShow"
      @click="mainShow = true"
    >
      <span>看板娘</span>
    </div>
  </div>
</template>

<script src="./index.js">
</script>

<style scoped>
@import './index.scss';
</style>
