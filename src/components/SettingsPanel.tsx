import { motion } from 'framer-motion';

interface SettingsPanelProps {
  yearValue: number;
  onReset: () => void;
}

export default function SettingsPanel({ yearValue, onReset }: SettingsPanelProps) {
  return (
    <div className="space-y-5">
      <div className="text-center pb-4 border-b border-border/40">
        <p className="text-sm text-muted-foreground mb-1">设置</p>
        <h3 className="text-lg font-serif text-foreground">游戏设置</h3>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-accent/30 rounded-sm">
          <p className="text-sm font-serif text-foreground mb-1">累计岁时值</p>
          <p className="text-2xl font-serif text-primary">{yearValue}</p>
        </div>

        <div className="p-4 border border-border/60 rounded-sm space-y-3">
          <h4 className="font-serif text-foreground">进度管理</h4>
          <p className="text-sm text-muted-foreground">
            重置所有游戏进度，包括已收集的风物、已完成的活动、已遇访客等。
          </p>
          <button
            onClick={onReset}
            className="w-full py-2 rounded-sm border border-destructive/40 text-destructive font-serif hover:bg-destructive/10 transition-colors"
          >
            重置游戏进度
          </button>
        </div>

        <div className="p-4 border border-border/60 rounded-sm space-y-3">
          <h4 className="font-serif text-foreground">关于《岁时记》</h4>
          <p className="text-sm text-foreground/80 leading-relaxed">
            一款以中国二十四节气为主题的古风悠闲经营游戏。玩家以隐士身份随二十四节气轮转经营庭院，参与节气活动，收集物候风物，邂逅山中访客，享受田园之趣。
          </p>
          <p className="text-xs text-muted-foreground">
            春耕夏耘 秋收冬藏 一岁四时 自有清欢
          </p>
        </div>
      </div>
    </div>
  );
}
