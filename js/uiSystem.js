// uiSystem.js UI渲染 & 事件绑定
const UiSystem = {
    dom: {},

    initDom(){
        this.dom.sceneBg = document.querySelector(".scene-bg");
        this.dom.termTitle = document.getElementById("termTitle");
        this.dom.dayDisplay = document.getElementById("dayDisplay");
        this.dom.weatherDisplay = document.getElementById("weatherDisplay");
        this.dom.speedValue = document.getElementById("speedValue");
        this.dom.speedSlider = document.getElementById("speedSlider");
        this.dom.pauseBtn = document.getElementById("pauseBtn");
        this.dom.muteBtn = document.getElementById("btnMute");
        this.dom.btnPrevTerm = document.getElementById("btnPrevTerm");
        this.dom.btnNextTerm = document.getElementById("btnNextTerm");
        this.dom.btnAdvanceDay = document.getElementById("btnAdvanceDay");
        this.dom.btnSave = document.getElementById("btnSave");
        this.dom.btnLoad = document.getElementById("btnLoad");
        this.dom.btnReset = document.getElementById("btnReset");

        this.dom.termModal = document.getElementById("termModal");
        this.dom.modalTitle = document.getElementById("modalTitle");
        this.dom.modalDesc = document.getElementById("modalDesc");
        this.dom.btnCloseTermModal = document.getElementById("btnCloseTermModal");

        this.dom.eventModal = document.getElementById("eventModal");
        this.dom.eventTitle = document.getElementById("eventTitle");
        this.dom.eventDesc = document.getElementById("eventDesc");
        this.dom.btnCloseEventModal = document.getElementById("btnCloseEventModal");
    },

    bindEvents(){
        // 流速滑块
        this.dom.speedSlider.addEventListener("input", (e)=>{
            const val = Number(e.target.value);
            TimeSystem.setSpeed(val);
            this.refreshAllUI();
        });

        // 暂停按钮
        this.dom.pauseBtn.addEventListener("click", ()=>{
            TimeSystem.togglePause();
            this.refreshAllUI();
        });

        // 静音
        this.dom.muteBtn.addEventListener("click", ()=>{
            AudioSystem.toggleMute();
            this.refreshAllUI();
        });

        // 手动推进一天
        this.dom.btnAdvanceDay.addEventListener("click", ()=>{
            TimeSystem.advanceOneDay();
        });

        // 上一节气
        this.dom.btnPrevTerm.addEventListener("click", ()=>{
            let idx = GameState.currentTermIndex -1;
            if(idx<0) idx = CONFIG.SOLAR_TERMS.length-1;
            GameState.currentTermIndex = idx;
            const term = CONFIG.SOLAR_TERMS[idx];
            AudioSystem.play(term.audio);
            WeatherSystem.generateWeather();
            if(GameState.currentWeather){
                WeatherEffectSystem.startEffect(GameState.currentWeather.id);
            }
            UiSystem.showTermModal(term);
            UiSystem.showRandomEvent(term);
            TimeSystem.lastTermTriggered = idx; // 手动切换节气也要更新冷却
            GameState.save();
            this.refreshAllUI();
        });

        // 下一节气
        this.dom.btnNextTerm.addEventListener("click", ()=>{
            let idx = GameState.currentTermIndex +1;
            if(idx >= CONFIG.SOLAR_TERMS.length) idx =0;
            GameState.currentTermIndex = idx;
            const term = CONFIG.SOLAR_TERMS[idx];
            AudioSystem.play(term.audio);
            WeatherSystem.generateWeather();
            if(GameState.currentWeather){
                WeatherEffectSystem.startEffect(GameState.currentWeather.id);
            }
            UiSystem.showTermModal(term);
            UiSystem.showRandomEvent(term);
            TimeSystem.lastTermTriggered = idx; // 手动切换节气也要更新冷却
            GameState.save();
            this.refreshAllUI();
        });

        // 关闭弹窗
        this.dom.btnCloseTermModal.addEventListener("click", ()=>{
            if(this.dom.termModal) this.dom.termModal.style.display = "none";
        });
        this.dom.btnCloseEventModal.addEventListener("click", ()=>{
            if(this.dom.eventModal) this.dom.eventModal.style.display = "none";
        });

        // 点击遮罩关闭
        this.dom.termModal.addEventListener("click", (e)=>{
            if(e.target === this.dom.termModal) this.dom.termModal.style.display = "none";
        });
        this.dom.eventModal.addEventListener("click", (e)=>{
            if(e.target === this.dom.eventModal) this.dom.eventModal.style.display = "none";
        });

        // 手动存档
        this.dom.btnSave.addEventListener("click", ()=>{
            GameState.save();
            alert("已保存当前进度");
        });

        // 读取存档
        this.dom.btnLoad.addEventListener("click", ()=>{
            const ok = GameState.load();
            if(ok){
                if(GameState.currentWeather){
                    WeatherEffectSystem.startEffect(GameState.currentWeather.id);
                }
                AudioSystem.play(CONFIG.SOLAR_TERMS[GameState.currentTermIndex].audio);
                this.refreshAllUI();
                alert("存档读取成功");
            }else{
                alert("没有找到存档");
            }
        });

        // 重置游戏
        this.dom.btnReset.addEventListener("click", ()=>{
            if(confirm("确定要重置全部进度吗？所有存档将会清除！")){
                GameState.reset();
                TimeSystem.resetTriggerMark();
                WeatherEffectSystem.clearAll();
                WeatherSystem.generateWeather();
                if(GameState.currentWeather){
                    WeatherEffectSystem.startEffect(GameState.currentWeather.id);
                }
                AudioSystem.play(CONFIG.SOLAR_TERMS[GameState.currentTermIndex].audio);
                this.refreshAllUI();
            }
        });
    },

    showTermModal(term){
        if(!this.dom.termModal) return;
        this.dom.modalTitle.innerText = term.name;
        this.dom.modalDesc.innerText = term.desc;
        this.dom.termModal.style.display = "flex";
    },

    showRandomEvent(term){
        if(!this.dom.eventModal) return;
        const evts = term.events;
        const evt = evts[Math.floor(Math.random()*evts.length)];
        this.dom.eventTitle.innerText = evt.title;
        this.dom.eventDesc.innerText = evt.desc;
        this.dom.eventModal.style.display = "flex";
    },

    refreshAllUI(){
        const term = CONFIG.SOLAR_TERMS[GameState.currentTermIndex];
        // 背景
        if(this.dom.sceneBg){
            this.dom.sceneBg.className = "scene-bg";
            this.dom.sceneBg.classList.add(term.bgClass);
        }
        // 节气名称
        if(this.dom.termTitle) this.dom.termTitle.innerText = term.name;
        // 天数
        if(this.dom.dayDisplay) this.dom.dayDisplay.innerText = `岁时 · 第 ${GameState.gameDay} 日`;
        // 天气
        if(this.dom.weatherDisplay) this.dom.weatherDisplay.innerText = `天气：${WeatherSystem.getWeatherName()}`;
        // 流速
        if(this.dom.speedValue) this.dom.speedValue.innerText = GameState.realSecondPerGameDay;
        if(this.dom.speedSlider) this.dom.speedSlider.value = GameState.realSecondPerGameDay;
        // 暂停按钮文字
        if(this.dom.pauseBtn) this.dom.pauseBtn.innerText = GameState.isPaused ? "继续时间" : "暂停时间";
        // 静音按钮文字
        if(this.dom.muteBtn) this.dom.muteBtn.innerText = GameState.isMuted ? "解除静音" : "静音";
    },

    // 页面初始化入口
    init(){
        WeatherEffectSystem.init();
        this.initDom();
        this.bindEvents();

        // 加载存档
        const hasSave = GameState.load();
        if(!hasSave){
            // 无存档，初始化天气
            WeatherSystem.generateWeather();
        }
        // 初始化天气特效
        if(GameState.currentWeather){
            WeatherEffectSystem.startEffect(GameState.currentWeather.id);
        }

        // 初始播放BGM
        const term = CONFIG.SOLAR_TERMS[GameState.currentTermIndex];
        AudioSystem.play(term.audio);
        this.refreshAllUI();
        TimeSystem.startTimer();
    }
};

// 页面加载完成后启动UI
window.addEventListener("load", ()=>{
    UiSystem.init();
});
