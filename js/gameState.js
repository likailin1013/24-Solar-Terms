// gameState.js 游戏状态管理 & 本地存档
const GameState = {
    gameDay: 1,
    currentTermIndex: 0,
    realSecondPerGameDay: CONFIG.DEFAULT_SPEED,
    isPaused: false,
    isMuted: false,
    currentWeather: null,

    // 保存到localStorage
    save(){
        const saveData = {
            gameDay: this.gameDay,
            currentTermIndex: this.currentTermIndex,
            realSecondPerGameDay: this.realSecondPerGameDay,
            isPaused: this.isPaused,
            isMuted: this.isMuted,
            currentWeather: this.currentWeather
        };
        localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(saveData));
    },

    // 从localStorage读取存档
    load(){
        const str = localStorage.getItem(CONFIG.STORAGE_KEY);
        if(!str) return false;
        try{
            const data = JSON.parse(str);
            this.gameDay = data.gameDay;
            this.currentTermIndex = data.currentTermIndex;
            this.realSecondPerGameDay = data.realSecondPerGameDay;
            this.isPaused = data.isPaused;
            this.isMuted = data.isMuted;
            this.currentWeather = data.currentWeather;
            return true;
        }catch(e){
            console.warn("存档读取失败，使用初始状态", e);
            return false;
        }
    },

    // 重置存档
    reset(){
        this.gameDay = 1;
        this.currentTermIndex = 0;
        this.realSecondPerGameDay = CONFIG.DEFAULT_SPEED;
        this.isPaused = false;
        this.isMuted = false;
        this.currentWeather = null;
        localStorage.removeItem(CONFIG.STORAGE_KEY);
    },

    // 计算当前节气索引
    calcTermIndexByDay(){
        const idx = Math.floor((this.gameDay -1)/CONFIG.DAYS_PER_TERM);
        return idx % CONFIG.SOLAR_TERMS.length;
    }
};
