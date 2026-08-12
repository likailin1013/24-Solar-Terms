// timeSystem.js 时间系统
const TimeSystem = {
    timer: null,
    lastTermTriggered: -1, // 事件冷却标记，仅本模块内部使用

    startTimer(){
        if(this.timer) clearInterval(this.timer);
        this.timer = setInterval(()=>{
            if(!GameState.isPaused){
                this.advanceOneDay();
            }
        }, GameState.realSecondPerGameDay * 1000);
    },

    stopTimer(){
        if(this.timer){
            clearInterval(this.timer);
            this.timer = null;
        }
    },

    // 重置冷却标记，供外部调用
    resetTriggerMark(){
        this.lastTermTriggered = -1;
    },

    // 推进1游戏天
    advanceOneDay(){
        GameState.gameDay +=1;
        const newIdx = GameState.calcTermIndexByDay();
        // 如果节气发生变化
        if(newIdx !== GameState.currentTermIndex){
            GameState.currentTermIndex = newIdx;
            const term = CONFIG.SOLAR_TERMS[newIdx];
            AudioSystem.play(term.audio);
            WeatherSystem.generateWeather();

            // 触发天气视觉效果
            if(GameState.currentWeather){
                WeatherEffectSystem.startEffect(GameState.currentWeather.id);
            }

            // 事件冷却：同一个节气只触发一次事件弹窗
            if(this.lastTermTriggered !== newIdx){
                UiSystem.showTermModal(term);
                UiSystem.showRandomEvent(term);
                this.lastTermTriggered = newIdx;
            }
        }
        GameState.save();
        UiSystem.refreshAllUI();
    },

    // 修改时间流速
    setSpeed(secPerDay){
        GameState.realSecondPerGameDay = secPerDay;
        this.startTimer();
        GameState.save();
    },

    togglePause(){
        GameState.isPaused = !GameState.isPaused;
        GameState.save();
    }
};

// 页面卸载清理定时器，防止内存泄漏
window.addEventListener("beforeunload", ()=>{
    TimeSystem.stopTimer();
});
