// weatherEffectSystem.js 天气视觉特效
const WeatherEffectSystem = {
    container: null,
    effectTimer: null,

    init() {
        if(this.container) return; // 防止重复创建容器
        this.container = document.createElement("div");
        this.container.className = "weather-effect-container";
        document.body.appendChild(this.container);
    },

    // 清除全部天气特效
    clearAll() {
        if (this.effectTimer) clearInterval(this.effectTimer);
        this.effectTimer = null;
        if(this.container) this.container.innerHTML = "";
    },

    // 根据天气id启动对应特效
    startEffect(weatherId) {
        this.clearAll();
        if(!weatherId) return;
        switch (weatherId) {
            case "rain":
                this.createRain();
                break;
            case "snow":
                this.createSnow();
                break;
            case "wind":
                this.createWind();
                break;
            default:
                // 晴、多云无粒子特效
                this.clearAll();
        }
    },

    createRain() {
        this.effectTimer = setInterval(() => {
            const drop = document.createElement("div");
            drop.className = "rain-drop";
            drop.style.left = Math.random() * 100 + "vw";
            drop.style.animationDuration = (0.3 + Math.random() * 0.4) + "s";
            this.container.appendChild(drop);
            setTimeout(() => drop.remove(), 1000);
        }, 30);
    },

    createSnow() {
        this.effectTimer = setInterval(() => {
            const flake = document.createElement("div");
            flake.className = "snow-flake";
            flake.style.left = Math.random() * 100 + "vw";
            flake.style.animationDuration = (3 + Math.random() * 4) + "s";
            flake.style.opacity = 0.4 + Math.random() * 0.6;
            flake.style.width = (3 + Math.random() * 6) + "px";
            flake.style.height = (3 + Math.random() * 6) + "px";
            this.container.appendChild(flake);
            setTimeout(() => flake.remove(), 7000);
        }, 80);
    },

    createWind() {
        this.effectTimer = setInterval(() => {
            const line = document.createElement("div");
            line.className = "wind-line";
            line.style.top = Math.random() * 100 + "vh";
            line.style.animationDuration = (1 + Math.random() * 1.5) + "s";
            this.container.appendChild(line);
            setTimeout(() => line.remove(), 1500);
        }, 120);
    }
};
