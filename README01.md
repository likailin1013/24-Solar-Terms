# 24-Solar-Terms
二十四节气(岁时记)
sui_shi_ji/
├─ index.html
├─ css/
│  └─ main.css
├─ js/
│  ├─ config.js
│  ├─ gameState.js
│  ├─ audioSystem.js
│  ├─ weatherSystem.js
│  ├─ weatherEffectSystem.js
│  ├─ timeSystem.js
│  └─ uiSystem.js
├─ images/
│  └─ xuanzhi_texture.png
└─ audio/



文件	职责	不做什么
config.js	常量、24 节气、天气配置	业务逻辑、DOM、状态修改
gameState.js	游戏状态、localStorage 存档读写	DOM、音频、UI 渲染
audioSystem.js	BGM 播放、静音	修改游戏状态、DOM
weatherSystem.js	随机生成天气	DOM 操作、修改状态
timeSystem.js	定时器、天数推进、节气切换逻辑	直接操作 DOM
uiSystem.js	DOM 渲染、弹窗、按钮事件绑定	修改游戏底层状态
index.html	DOM 结构，脚本引入	业务逻辑
