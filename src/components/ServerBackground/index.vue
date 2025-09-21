<template>
  <div class="server-background">
    <!-- 网格背景 -->
    <div class="grid-overlay"></div>
    
    <!-- 服务器机架 SVG -->
    <svg class="server-racks" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid meet">
      <!-- 服务器机架 1 -->
      <g class="rack-group rack-1">
        <rect x="50" y="100" width="120" height="400" fill="none" stroke="#4a90e2" stroke-width="2" opacity="0.6"/>
        <!-- 服务器单元 -->
        <rect x="60" y="120" width="100" height="30" fill="#2c3e50" opacity="0.8">
          <animate attributeName="fill" values="#2c3e50;#4a90e2;#2c3e50" dur="3s" repeatCount="indefinite"/>
        </rect>
        <rect x="60" y="160" width="100" height="30" fill="#2c3e50" opacity="0.8">
          <animate attributeName="fill" values="#2c3e50;#4a90e2;#2c3e50" dur="4s" repeatCount="indefinite"/>
        </rect>
        <rect x="60" y="200" width="100" height="30" fill="#2c3e50" opacity="0.8">
          <animate attributeName="fill" values="#2c3e50;#4a90e2;#2c3e50" dur="2.5s" repeatCount="indefinite"/>
        </rect>
        <rect x="60" y="240" width="100" height="30" fill="#2c3e50" opacity="0.8">
          <animate attributeName="fill" values="#2c3e50;#4a90e2;#2c3e50" dur="3.5s" repeatCount="indefinite"/>
        </rect>
        <rect x="60" y="280" width="100" height="30" fill="#2c3e50" opacity="0.8">
          <animate attributeName="fill" values="#2c3e50;#4a90e2;#2c3e50" dur="2.8s" repeatCount="indefinite"/>
        </rect>
        <rect x="60" y="320" width="100" height="30" fill="#2c3e50" opacity="0.8">
          <animate attributeName="fill" values="#2c3e50;#4a90e2;#2c3e50" dur="4.2s" repeatCount="indefinite"/>
        </rect>
        <rect x="60" y="360" width="100" height="30" fill="#2c3e50" opacity="0.8">
          <animate attributeName="fill" values="#2c3e50;#4a90e2;#2c3e50" dur="3.2s" repeatCount="indefinite"/>
        </rect>
        <rect x="60" y="400" width="100" height="30" fill="#2c3e50" opacity="0.8">
          <animate attributeName="fill" values="#2c3e50;#4a90e2;#2c3e50" dur="2.9s" repeatCount="indefinite"/>
        </rect>
        <!-- 状态指示灯 -->
        <circle cx="170" cy="135" r="3" fill="#00ff00" opacity="0.8">
          <animate attributeName="opacity" values="0.8;1;0.8" dur="1.5s" repeatCount="indefinite"/>
        </circle>
        <circle cx="170" cy="175" r="3" fill="#00ff00" opacity="0.8">
          <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite"/>
        </circle>
        <circle cx="170" cy="215" r="3" fill="#ffaa00" opacity="0.8">
          <animate attributeName="opacity" values="0.8;1;0.8" dur="1.2s" repeatCount="indefinite"/>
        </circle>
        <circle cx="170" cy="255" r="3" fill="#00ff00" opacity="0.8">
          <animate attributeName="opacity" values="0.8;1;0.8" dur="1.8s" repeatCount="indefinite"/>
        </circle>
      </g>
      
      <!-- 服务器机架 2 -->
      <g class="rack-group rack-2">
        <rect x="250" y="80" width="120" height="440" fill="none" stroke="#4a90e2" stroke-width="2" opacity="0.6"/>
        <!-- 服务器单元 -->
        <rect x="260" y="100" width="100" height="30" fill="#2c3e50" opacity="0.8">
          <animate attributeName="fill" values="#2c3e50;#4a90e2;#2c3e50" dur="3.8s" repeatCount="indefinite"/>
        </rect>
        <rect x="260" y="140" width="100" height="30" fill="#2c3e50" opacity="0.8">
          <animate attributeName="fill" values="#2c3e50;#4a90e2;#2c3e50" dur="2.7s" repeatCount="indefinite"/>
        </rect>
        <rect x="260" y="180" width="100" height="30" fill="#2c3e50" opacity="0.8">
          <animate attributeName="fill" values="#2c3e50;#4a90e2;#2c3e50" dur="4.1s" repeatCount="indefinite"/>
        </rect>
        <rect x="260" y="220" width="100" height="30" fill="#2c3e50" opacity="0.8">
          <animate attributeName="fill" values="#2c3e50;#4a90e2;#2c3e50" dur="3.1s" repeatCount="indefinite"/>
        </rect>
        <rect x="260" y="260" width="100" height="30" fill="#2c3e50" opacity="0.8">
          <animate attributeName="fill" values="#2c3e50;#4a90e2;#2c3e50" dur="2.4s" repeatCount="indefinite"/>
        </rect>
        <rect x="260" y="300" width="100" height="30" fill="#2c3e50" opacity="0.8">
          <animate attributeName="fill" values="#2c3e50;#4a90e2;#2c3e50" dur="3.6s" repeatCount="indefinite"/>
        </rect>
        <rect x="260" y="340" width="100" height="30" fill="#2c3e50" opacity="0.8">
          <animate attributeName="fill" values="#2c3e50;#4a90e2;#2c3e50" dur="2.9s" repeatCount="indefinite"/>
        </rect>
        <rect x="260" y="380" width="100" height="30" fill="#2c3e50" opacity="0.8">
          <animate attributeName="fill" values="#2c3e50;#4a90e2;#2c3e50" dur="4.3s" repeatCount="indefinite"/>
        </rect>
        <rect x="260" y="420" width="100" height="30" fill="#2c3e50" opacity="0.8">
          <animate attributeName="fill" values="#2c3e50;#4a90e2;#2c3e50" dur="3.4s" repeatCount="indefinite"/>
        </rect>
        <rect x="260" y="460" width="100" height="30" fill="#2c3e50" opacity="0.8">
          <animate attributeName="fill" values="#2c3e50;#4a90e2;#2c3e50" dur="2.6s" repeatCount="indefinite"/>
        </rect>
        <!-- 状态指示灯 -->
        <circle cx="370" cy="115" r="3" fill="#00ff00" opacity="0.8">
          <animate attributeName="opacity" values="0.8;1;0.8" dur="1.7s" repeatCount="indefinite"/>
        </circle>
        <circle cx="370" cy="155" r="3" fill="#00ff00" opacity="0.8">
          <animate attributeName="opacity" values="0.8;1;0.8" dur="1.3s" repeatCount="indefinite"/>
        </circle>
        <circle cx="370" cy="195" r="3" fill="#00ff00" opacity="0.8">
          <animate attributeName="opacity" values="0.8;1;0.8" dur="1.9s" repeatCount="indefinite"/>
        </circle>
        <circle cx="370" cy="235" r="3" fill="#ffaa00" opacity="0.8">
          <animate attributeName="opacity" values="0.8;1;0.8" dur="1.4s" repeatCount="indefinite"/>
        </circle>
        <circle cx="370" cy="275" r="3" fill="#00ff00" opacity="0.8">
          <animate attributeName="opacity" values="0.8;1;0.8" dur="1.6s" repeatCount="indefinite"/>
        </circle>
      </g>
      
      <!-- 服务器机架 3 -->
      <g class="rack-group rack-3">
        <rect x="450" y="120" width="120" height="360" fill="none" stroke="#4a90e2" stroke-width="2" opacity="0.6"/>
        <!-- 服务器单元 -->
        <rect x="460" y="140" width="100" height="30" fill="#2c3e50" opacity="0.8">
          <animate attributeName="fill" values="#2c3e50;#4a90e2;#2c3e50" dur="3.3s" repeatCount="indefinite"/>
        </rect>
        <rect x="460" y="180" width="100" height="30" fill="#2c3e50" opacity="0.8">
          <animate attributeName="fill" values="#2c3e50;#4a90e2;#2c3e50" dur="2.8s" repeatCount="indefinite"/>
        </rect>
        <rect x="460" y="220" width="100" height="30" fill="#2c3e50" opacity="0.8">
          <animate attributeName="fill" values="#2c3e50;#4a90e2;#2c3e50" dur="4.0s" repeatCount="indefinite"/>
        </rect>
        <rect x="460" y="260" width="100" height="30" fill="#2c3e50" opacity="0.8">
          <animate attributeName="fill" values="#2c3e50;#4a90e2;#2c3e50" dur="3.2s" repeatCount="indefinite"/>
        </rect>
        <rect x="460" y="300" width="100" height="30" fill="#2c3e50" opacity="0.8">
          <animate attributeName="fill" values="#2c3e50;#4a90e2;#2c3e50" dur="2.5s" repeatCount="indefinite"/>
        </rect>
        <rect x="460" y="340" width="100" height="30" fill="#2c3e50" opacity="0.8">
          <animate attributeName="fill" values="#2c3e50;#4a90e2;#2c3e50" dur="3.7s" repeatCount="indefinite"/>
        </rect>
        <rect x="460" y="380" width="100" height="30" fill="#2c3e50" opacity="0.8">
          <animate attributeName="fill" values="#2c3e50;#4a90e2;#2c3e50" dur="2.9s" repeatCount="indefinite"/>
        </rect>
        <rect x="460" y="420" width="100" height="30" fill="#2c3e50" opacity="0.8">
          <animate attributeName="fill" values="#2c3e50;#4a90e2;#2c3e50" dur="4.2s" repeatCount="indefinite"/>
        </rect>
        <!-- 状态指示灯 -->
        <circle cx="570" cy="155" r="3" fill="#00ff00" opacity="0.8">
          <animate attributeName="opacity" values="0.8;1;0.8" dur="1.5s" repeatCount="indefinite"/>
        </circle>
        <circle cx="570" cy="195" r="3" fill="#00ff00" opacity="0.8">
          <animate attributeName="opacity" values="0.8;1;0.8" dur="1.8s" repeatCount="indefinite"/>
        </circle>
        <circle cx="570" cy="235" r="3" fill="#00ff00" opacity="0.8">
          <animate attributeName="opacity" values="0.8;1;0.8" dur="1.2s" repeatCount="indefinite"/>
        </circle>
        <circle cx="570" cy="275" r="3" fill="#ffaa00" opacity="0.8">
          <animate attributeName="opacity" values="0.8;1;0.8" dur="1.6s" repeatCount="indefinite"/>
        </circle>
        <circle cx="570" cy="315" r="3" fill="#00ff00" opacity="0.8">
          <animate attributeName="opacity" values="0.8;1;0.8" dur="1.4s" repeatCount="indefinite"/>
        </circle>
      </g>
      
      <!-- 网络连接线 -->
      <g class="network-lines">
        <!-- 机架间连接线 -->
        <line x1="170" y1="250" x2="250" y2="250" stroke="#4a90e2" stroke-width="2" opacity="0.4">
          <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2s" repeatCount="indefinite"/>
        </line>
        <line x1="370" y1="300" x2="450" y2="300" stroke="#4a90e2" stroke-width="2" opacity="0.4">
          <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2.5s" repeatCount="indefinite"/>
        </line>
        
        <!-- 数据流动画 -->
        <g class="data-flow">
          <circle r="3" fill="#00ff88" opacity="0.8">
            <animateMotion dur="3s" repeatCount="indefinite">
              <path d="M 170 250 L 250 250"/>
            </animateMotion>
            <animate attributeName="opacity" values="0;1;0" dur="3s" repeatCount="indefinite"/>
          </circle>
          <circle r="3" fill="#00ff88" opacity="0.8">
            <animateMotion dur="3s" repeatCount="indefinite" begin="1s">
              <path d="M 170 250 L 250 250"/>
            </animateMotion>
            <animate attributeName="opacity" values="0;1;0" dur="3s" repeatCount="indefinite" begin="1s"/>
          </circle>
          <circle r="3" fill="#00ff88" opacity="0.8">
            <animateMotion dur="3s" repeatCount="indefinite" begin="2s">
              <path d="M 170 250 L 250 250"/>
            </animateMotion>
            <animate attributeName="opacity" values="0;1;0" dur="3s" repeatCount="indefinite" begin="2s"/>
          </circle>
        </g>
        
        <g class="data-flow-2">
          <circle r="3" fill="#00ff88" opacity="0.8">
            <animateMotion dur="4s" repeatCount="indefinite">
              <path d="M 370 300 L 450 300"/>
            </animateMotion>
            <animate attributeName="opacity" values="0;1;0" dur="4s" repeatCount="indefinite"/>
          </circle>
          <circle r="3" fill="#00ff88" opacity="0.8">
            <animateMotion dur="4s" repeatCount="indefinite" begin="1.5s">
              <path d="M 370 300 L 450 300"/>
            </animateMotion>
            <animate attributeName="opacity" values="0;1;0" dur="4s" repeatCount="indefinite" begin="1.5s"/>
          </circle>
        </g>
      </g>
      
      <!-- 云服务器图标 -->
      <g class="cloud-servers">
        <g class="cloud-1">
          <ellipse cx="100" cy="50" rx="40" ry="20" fill="#4a90e2" opacity="0.6"/>
          <text x="100" y="55" text-anchor="middle" fill="white" font-size="12" font-family="Arial">Cloud</text>
          <line x1="100" y1="70" x2="100" y2="100" stroke="#4a90e2" stroke-width="2" opacity="0.6">
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/>
          </line>
        </g>
        
        <g class="cloud-2">
          <ellipse cx="700" cy="80" rx="40" ry="20" fill="#4a90e2" opacity="0.6"/>
          <text x="700" y="85" text-anchor="middle" fill="white" font-size="12" font-family="Arial">Cloud</text>
          <line x1="700" y1="100" x2="700" y2="120" stroke="#4a90e2" stroke-width="2" opacity="0.6">
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2.5s" repeatCount="indefinite"/>
          </line>
        </g>
      </g>
    </svg>
    
    <!-- 浮动数据包 -->
    <div class="floating-data">
      <div class="data-packet packet-1">📊</div>
      <div class="data-packet packet-2">💾</div>
      <div class="data-packet packet-3">🔒</div>
      <div class="data-packet packet-4">⚡</div>
      <div class="data-packet packet-5">🌐</div>
      <div class="data-packet packet-6">📈</div>
    </div>
    
    <!-- 扫描线效果 -->
    <div class="scan-lines">
      <div class="scan-line line-1"></div>
      <div class="scan-line line-2"></div>
      <div class="scan-line line-3"></div>
    </div>
  </div>
</template>

<script setup>
// 可以添加 props 来控制背景效果
defineProps({
  // 可以添加配置选项，比如动画速度、颜色等
})
</script>

<style scoped>
.server-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  overflow: hidden;
  background: linear-gradient(135deg, #0f1419 0%, #1a2332 50%, #0f1419 100%);
}

/* 网格背景 */
.grid-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    linear-gradient(rgba(74, 144, 226, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(74, 144, 226, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: gridMove 20s linear infinite;
}

@keyframes gridMove {
  0% { transform: translate(0, 0); }
  100% { transform: translate(50px, 50px); }
}

/* SVG 服务器机架 */
.server-racks {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.8;
}

.rack-group {
  animation: rackGlow 4s ease-in-out infinite;
}

.rack-1 { animation-delay: 0s; }
.rack-2 { animation-delay: 1.3s; }
.rack-3 { animation-delay: 2.6s; }

@keyframes rackGlow {
  0%, 100% { filter: brightness(1); }
  50% { filter: brightness(1.2); }
}

/* 浮动数据包 */
.floating-data {
  position: absolute;
  width: 100%;
  height: 100%;
}

.data-packet {
  position: absolute;
  font-size: 20px;
  opacity: 0.7;
  animation: floatPacket 8s ease-in-out infinite;
}

.packet-1 {
  top: 20%;
  left: 10%;
  animation-delay: 0s;
  animation-duration: 10s;
}

.packet-2 {
  top: 60%;
  left: 85%;
  animation-delay: 2s;
  animation-duration: 8s;
}

.packet-3 {
  top: 40%;
  left: 5%;
  animation-delay: 4s;
  animation-duration: 12s;
}

.packet-4 {
  top: 80%;
  left: 15%;
  animation-delay: 1s;
  animation-duration: 9s;
}

.packet-5 {
  top: 10%;
  left: 70%;
  animation-delay: 3s;
  animation-duration: 11s;
}

.packet-6 {
  top: 70%;
  left: 90%;
  animation-delay: 5s;
  animation-duration: 7s;
}

@keyframes floatPacket {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
    opacity: 0.7;
  }
  25% {
    transform: translateY(-30px) rotate(90deg);
    opacity: 1;
  }
  50% {
    transform: translateY(-15px) rotate(180deg);
    opacity: 0.8;
  }
  75% {
    transform: translateY(-40px) rotate(270deg);
    opacity: 0.9;
  }
}

/* 扫描线效果 */
.scan-lines {
  position: absolute;
  width: 100%;
  height: 100%;
}

.scan-line {
  position: absolute;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #00ff88, transparent);
  opacity: 0.6;
  animation: scanMove 6s linear infinite;
}

.line-1 {
  top: 25%;
  animation-delay: 0s;
  animation-duration: 8s;
}

.line-2 {
  top: 50%;
  animation-delay: 2.5s;
  animation-duration: 6s;
}

.line-3 {
  top: 75%;
  animation-delay: 5s;
  animation-duration: 7s;
}

@keyframes scanMove {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  10% {
    opacity: 0.6;
  }
  90% {
    opacity: 0.6;
  }
  100% {
    transform: translateX(100%);
    opacity: 0;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .server-racks {
    transform: scale(0.8);
  }
  
  .data-packet {
    font-size: 16px;
  }
  
  .grid-overlay {
    background-size: 30px 30px;
  }
}
</style>
