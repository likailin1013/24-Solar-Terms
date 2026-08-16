// EXPORTS: IDecoration, MOCK_DECORATIONS
export interface IDecoration {
  id: string
  name: string
  season: 'spring' | 'summer' | 'autumn' | 'winter'
  icon: string
  beautyValue: number
  description: string
}

export const MOCK_DECORATIONS: IDecoration[] = [
  { id: '1', name: '石灯', season: 'spring', icon: '🏮', beautyValue: 5, description: '古朴石灯，点缀庭院' },
  { id: '2', name: '兰草盆', season: 'spring', icon: '🌿', beautyValue: 4, description: '清雅兰草，春意盎然' },
  { id: '3', name: '桃花枝', season: 'spring', icon: '🌸', beautyValue: 6, description: '粉桃一枝，春色满园' },
  { id: '4', name: '荷缸', season: 'summer', icon: '🪷', beautyValue: 6, description: '青荷出水，夏意清凉' },
  { id: '5', name: '竹帘', season: 'summer', icon: '🎋', beautyValue: 4, description: '竹帘半卷，清风徐来' },
  { id: '6', name: '萤火灯', season: 'summer', icon: '✨', beautyValue: 5, description: '萤火点点，夏夜静谧' },
  { id: '7', name: '菊盆栽', season: 'autumn', icon: '🌼', beautyValue: 5, description: '秋菊盈枝，霜下争妍' },
  { id: '8', name: '红叶树', season: 'autumn', icon: '🍁', beautyValue: 6, description: '丹枫如火，秋色绚烂' },
  { id: '9', name: '桂花架', season: 'autumn', icon: '🍂', beautyValue: 5, description: '金桂飘香，秋风送爽' },
  { id: '10', name: '梅桩', season: 'winter', icon: '🌺', beautyValue: 6, description: '寒梅傲雪，暗香浮动' },
  { id: '11', name: '雪石', season: 'winter', icon: '🪨', beautyValue: 4, description: '积雪奇石，素雅明净' },
  { id: '12', name: '暖炉', season: 'winter', icon: '🔥', beautyValue: 5, description: '围炉煮茶，冬日暖意' },
]