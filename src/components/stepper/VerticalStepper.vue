<template>
  <div :class="{ 'align-input': alignInput }" class="stepper">
    <div class="indicator">
      <div
        data-plankton-test="stepper--label-indicator"
        class="circle"
        :class="{ 'inverted-circle': invertedColorPoint }"
      >
        {{ pointLabel }}
      </div>
      <LineDashed v-if="showLine" class="line" data-plankton-test="stepper--line" />
    </div>
    <div class="content" data-plankton-test="stepper--content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import LineDashed from '@/assets/images/line-dashed.svg'
export default {
  components: { LineDashed },
  props: {
    pointLabel: { type: String, default: 'A' },
    alignInput: { type: Boolean, default: false },
    showLine: { type: Boolean, default: true },
    invertedColorPoint: { type: Boolean, default: false }
  }
}
</script>

<style lang="scss" scoped>
.stepper {
  display: flex;
  flex-direction: row;
  align-items: normal;
  line-height: normal;
  position: relative;

  .indicator {
    position: relative;
    margin-right: 8px;
    line-height: normal;

    .circle {
      background-color: $color-primary-main;
      border-radius: 100%;
      font-size: 18px;
      width: 24px;
      height: 24px;
      line-height: 22px;
      text-align: center;
      color: $color-layout-white;
      position: relative;
      z-index: 1;
      border: 1px solid $color-primary-main;
    }

    .inverted-circle {
      color: $color-primary-main;
      background-color: $color-layout-white;
    }

    .line {
      line-height: normal;
      top: 0;
      left: 50%;
      margin-left: -1px;
      height: 100%;
      position: absolute;
      mix-blend-mode: normal;
    }
  }

  .content {
    font-size: 12px;
    margin-bottom: 16px;
    width: 100%;
  }

  &.align-input .indicator {
    top: 20px;
  }
}
</style>
