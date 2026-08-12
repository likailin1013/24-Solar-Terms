// audioSystem.js 音频系统
const AudioSystem = {
    currentAudio: null,

    play(audioPath){
        if(GameState.isMuted) return;
        if(this.currentAudio) this.currentAudio.pause();
        this.currentAudio = new Audio(audioPath);
        this.currentAudio.loop = true;
        this.currentAudio.volume = 0.4;
        this.currentAudio.play().catch(err=>{
            console.log("音频播放失败：", err);
        });
    },

    stop(){
        if(this.currentAudio){
            this.currentAudio.pause();
            this.currentAudio = null;
        }
    },

    toggleMute(){
        GameState.isMuted = !GameState.isMuted;
        if(GameState.isMuted){
            this.stop();
        }else{
            const term = CONFIG.SOLAR_TERMS[GameState.currentTermIndex];
            this.play(term.audio);
        }
    }
};
