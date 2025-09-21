<template>
  <div class="dynamic-background">
    <!-- 浮动几何图形 -->
    <div class="floating-shapes">
      <div class="shape shape-1"></div>
      <div class="shape shape-2"></div>
      <div class="shape shape-3"></div>
      <div class="shape shape-4"></div>
      <div class="shape shape-5"></div>
      <div class="shape shape-6"></div>
    </div>
    
    <!-- 光效 -->
    <div class="light-effects">
      <div class="light-beam light-1"></div>
      <div class="light-beam light-2"></div>
      <div class="light-beam light-3"></div>
    </div>
    
    <!-- 渐变叠加层 -->
    <div class="gradient-overlay"></div>
  </div>
</template>

<script setup>
// 可以在这里添加 props 来控制背景效果
defineProps({
  // 可以添加配置选项，比如动画速度、颜色等
})
</script>

<style scoped>
.dynamic-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  overflow: hidden;
}

/* 浮动几何图形 */
.floating-shapes {
  position: absolute;
  width: 100%;
  height: 100%;
}

.shape {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  animation: float 6s ease-in-out infinite;
}

.shape-1 {
  width: 60px;
  height: 60px;
  top: 20%;
  left: 10%;
  animation-delay: 0s;
  animation-duration: 8s;
}

.shape-2 {
  width: 40px;
  height: 40px;
  top: 60%;
  left: 80%;
  animation-delay: 2s;
  animation-duration: 6s;
}

.shape-3 {
  width: 80px;
  height: 80px;
  top: 40%;
  left: 70%;
  animation-delay: 4s;
  animation-duration: 10s;
}

.shape-4 {
  width: 30px;
  height: 30px;
  top: 80%;
  left: 20%;
  animation-delay: 1s;
  animation-duration: 7s;
}

.shape-5 {
  width: 50px;
  height: 50px;
  top: 10%;
  left: 60%;
  animation-delay: 3s;
  animation-duration: 9s;
}

.shape-6 {
  width: 35px;
  height: 35px;
  top: 70%;
  left: 40%;
  animation-delay: 5s;
  animation-duration: 5s;
}

/* 光效 */
.light-effects {
  position: absolute;
  width: 100%;
  height: 100%;
}

.light-beam {
  position: absolute;
  background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  animation: lightFlow 4s ease-in-out infinite;
}

.light-1 {
  width: 200px;
  height: 2px;
  top: 30%;
  left: -200px;
  animation-delay: 0s;
  animation-duration: 6s;
}

.light-2 {
  width: 150px;
  height: 2px;
  top: 60%;
  right: -150px;
  animation-delay: 2s;
  animation-duration: 5s;
  transform: rotate(45deg);
}

.light-3 {
  width: 180px;
  height: 2px;
  top: 80%;
  left: -180px;
  animation-delay: 4s;
  animation-duration: 7s;
  transform: rotate(-30deg);
}

/* 渐变叠加层 */
.gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, 
    rgba(102, 126, 234, 0.3) 0%, 
    rgba(118, 75, 162, 0.3) 50%, 
    rgba(102, 126, 234, 0.3) 100%);
  animation: gradientShift 8s ease-in-out infinite;
}

/* 动画定义 */
@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
    opacity: 0.7;
  }
  25% {
    transform: translateY(-20px) rotate(90deg);
    opacity: 1;
  }
  50% {
    transform: translateY(-10px) rotate(180deg);
    opacity: 0.8;
  }
  75% {
    transform: translateY(-30px) rotate(270deg);
    opacity: 0.9;
  }
}

@keyframes lightFlow {
  0% {
    transform: translateX(-100px);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateX(100px);
    opacity: 0;
  }
}

@keyframes gradientShift {
  0%, 100% {
    background: linear-gradient(45deg, 
      rgba(102, 126, 234, 0.3) 0%, 
      rgba(118, 75, 162, 0.3) 50%, 
      rgba(102, 126, 234, 0.3) 100%);
  }
  50% {
    background: linear-gradient(45deg, 
      rgba(118, 75, 162, 0.3) 0%, 
      rgba(102, 126, 234, 0.3) 50%, 
      rgba(118, 75, 162, 0.3) 100%);
  }
}
</style>
