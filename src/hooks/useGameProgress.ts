// EXPORTS: IGameProgress, IPlantedCrop, useGameProgress, STORAGE_KEY

import { useState, useEffect, useCallback } from 'react';
import { getCropById, getCropsByTermId } from '@/data/crops';
import { BASE_MATERIAL_IDS } from '@/data/items';
import { MOCK_HANDCRAFTS } from '@/data/handcrafts';
import { MOCK_VISITORS } from '@/data/visitors';

const STORAGE_KEY = '__game_suishiji_progress_v2';

/**
 * 独立部署：直接用浏览器 localStorage 持久化（替代原平台 scopedStorage），
 * 不复用任何平台依赖，保证脱离飞书环境后进度仍可正常存取。
 */
function loadProgress(): IGameProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...INITIAL_PROGRESS, ...parsed };
    }
  } catch {
    // ignore
  }
  return INITIAL_PROGRESS;
}

function saveProgress(progress: IGameProgress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // ignore
  }
}

export interface IPlantedCrop {
  /** 作物 id（crops.ts） */
  cropId: string;
  /** 种植时间戳（ms） */
  plantedAt: number;
}

export interface IGameProgress {
  /** 当前累计岁时值 */
  yearValue: number;
  /** 已完成的活动ID列表 */
  completedActivities: string[];
  /** 已收集的物候ID列表 (格式: termId-phenologyIndex) */
  collectedPhenology: string[];
  /** 已收集的作物ID列表 (格式: termId-cropName) */
  collectedCrops: string[];
  /** 已收集的食膳ID列表 (格式: termId-foodName) */
  collectedFoods: string[];
  /** 已收集的器物ID列表 */
  collectedArtifacts: string[];
  /** 已收集的花卉ID列表 */
  collectedFlowers: string[];
  /** 已遇到的访客ID列表 */
  metVisitors: string[];
  /** 庭院装饰物放置记录，key为区域ID，value为装饰物ID */
  decorations: Record<string, string>;
  /** 庭院美观度评分 */
  beautyScore: number;
  /** 当前选中节气ID */
  currentTermId: string;
  /** 菜畦种植记录：key为地块ID，value为种植信息 */
  crops: Record<string, IPlantedCrop>;
  /** 访客好感度：visitorId → 好感度数值 */
  visitorAffinity: Record<string, number>;
  /** 背包库存：物品id（items.ts）→ 数量 */
  inventory: Record<string, number>;
}

const INITIAL_PROGRESS: IGameProgress = {
  yearValue: 0,
  completedActivities: [],
  collectedPhenology: [],
  collectedCrops: [],
  collectedFoods: [],
  collectedArtifacts: [],
  collectedFlowers: [],
  metVisitors: [],
  decorations: {},
  beautyScore: 0,
  currentTermId: 'lichun',
  crops: {},
  visitorAffinity: {},
  inventory: {},
};

export function useGameProgress() {
  const [progress, setProgress] = useState<IGameProgress>(loadProgress);

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const addYearValue = useCallback((val: number) => {
    setProgress((prev) => ({ ...prev, yearValue: prev.yearValue + val }));
  }, []);

  const completeActivity = useCallback((activityId: string, termId: string, yearValue = 10) => {
    setProgress((prev) => {
      if (prev.completedActivities.includes(activityId)) return prev;
      // 活动奖励：本节气时令作物材料 ×1（"收集"渠道）
      const termCrops = getCropsByTermId(termId);
      const seasonal = termCrops.length > 0 ? termCrops[Math.floor(Math.random() * termCrops.length)] : undefined;
      const randomBase = BASE_MATERIAL_IDS[Math.floor(Math.random() * BASE_MATERIAL_IDS.length)];
      const inventory = { ...(prev.inventory ?? {}) };
      if (seasonal && seasonal.yields.length > 0) {
        const first = seasonal.yields[0];
        inventory[first.itemId] = (inventory[first.itemId] ?? 0) + 1;
      }
      if (randomBase) {
        inventory[randomBase] = (inventory[randomBase] ?? 0) + 1;
      }
      return {
        ...prev,
        yearValue: prev.yearValue + yearValue,
        completedActivities: [...prev.completedActivities, activityId],
        inventory,
        // 完成活动时自动收集当前节气的第一候作为奖励
        collectedPhenology: prev.collectedPhenology.includes(`${termId}-0`)
          ? prev.collectedPhenology
          : [...prev.collectedPhenology, `${termId}-0`],
      };
    });
  }, []);

  const collectPhenology = useCallback((termId: string, index: number) => {
    const id = `${termId}-${index}`;
    setProgress((prev) => {
      if (prev.collectedPhenology.includes(id)) return prev;
      return {
        ...prev,
        collectedPhenology: [...prev.collectedPhenology, id],
        yearValue: prev.yearValue + 5,
      };
    });
  }, []);

  const collectFood = useCallback((termId: string, foodName: string) => {
    const id = `${termId}-${foodName}`;
    setProgress((prev) => {
      if (prev.collectedFoods.includes(id)) return prev;
      return {
        ...prev,
        collectedFoods: [...prev.collectedFoods, id],
        yearValue: prev.yearValue + 5,
      };
    });
  }, []);

  const collectCrop = useCallback((termId: string, cropName: string) => {
    const id = `${termId}-${cropName}`;
    setProgress((prev) => {
      if (prev.collectedCrops.includes(id)) return prev;
      return {
        ...prev,
        collectedCrops: [...prev.collectedCrops, id],
        yearValue: prev.yearValue + 5,
      };
    });
  }, []);

  const collectFlower = useCallback((flowerId: string) => {
    setProgress((prev) => {
      if (prev.collectedFlowers.includes(flowerId)) return prev;
      return {
        ...prev,
        collectedFlowers: [...prev.collectedFlowers, flowerId],
        yearValue: prev.yearValue + 5,
      };
    });
  }, []);

  const collectArtifact = useCallback((artifactId: string) => {
    setProgress((prev) => {
      if (prev.collectedArtifacts.includes(artifactId)) return prev;
      return {
        ...prev,
        collectedArtifacts: [...prev.collectedArtifacts, artifactId],
        yearValue: prev.yearValue + 8,
      };
    });
  }, []);

  const meetVisitor = useCallback((visitorId: string) => {
    setProgress((prev) => {
      if (prev.metVisitors.includes(visitorId)) return prev;
      return {
        ...prev,
        metVisitors: [...prev.metVisitors, visitorId],
        yearValue: prev.yearValue + 15,
      };
    });
  }, []);

  const setCurrentTerm = useCallback((termId: string) => {
    setProgress((prev) => ({ ...prev, currentTermId: termId }));
  }, []);

  const setDecoration = useCallback((slotId: string, decorId: string | null) => {
    setProgress((prev) => {
      const newDecor = { ...prev.decorations };
      if (decorId) {
        newDecor[slotId] = decorId;
      } else {
        delete newDecor[slotId];
      }
      return { ...prev, decorations: newDecor };
    });
  }, []);

  /** 在地块上种植作物（同地块重复种植则覆盖） */
  const plantCrop = useCallback((plotId: string, cropId: string) => {
    setProgress((prev) => ({
      ...prev,
      crops: { ...prev.crops, [plotId]: { cropId, plantedAt: Date.now() } },
    }));
  }, []);

  /**
   * 收获地块作物：清空地块，产出记入 collectedCrops（格式 termId-产出名，去重）
   * 与背包 inventory（yields.itemId，按数量累加），每个产出 +3 岁时值。
   */
  const harvestCrop = useCallback((plotId: string) => {
    setProgress((prev) => {
      const planted = prev.crops[plotId];
      if (!planted) return prev;
      const crop = getCropById(planted.cropId);
      if (!crop) return prev;
      let yearValue = prev.yearValue;
      let collectedCrops = [...prev.collectedCrops];
      const inventory = { ...(prev.inventory ?? {}) };
      for (const y of crop.yields) {
        const id = `${crop.termId}-${y.name}`;
        if (!collectedCrops.includes(id)) {
          collectedCrops = [...collectedCrops, id];
          yearValue += 3;
        }
        // 产出入背包
        inventory[y.itemId] = (inventory[y.itemId] ?? 0) + y.count;
      }
      const crops = { ...prev.crops };
      delete crops[plotId];
      return { ...prev, crops, collectedCrops, yearValue, inventory };
    });
  }, []);

  /** 向背包添加物品 */
  const addItem = useCallback((itemId: string, count = 1) => {
    setProgress((prev) => ({
      ...prev,
      inventory: {
        ...(prev.inventory ?? {}),
        [itemId]: (prev.inventory?.[itemId] ?? 0) + count,
      },
    }));
  }, []);

  /**
   * 制作手作：校验配方库存 → 扣除材料 → 计入 collectedArtifacts + 岁时值 +8。
   * 返回是否制作成功（材料不足 / 已制作过返回 false）。
   */
  const craftHandcraft = useCallback((handcraftId: string) => {
    const hc = MOCK_HANDCRAFTS.find((h) => h.id === handcraftId);
    if (!hc) return false;
    let ok = false;
    setProgress((prev) => {
      if (prev.collectedArtifacts.includes(handcraftId)) return prev;
      const inventory = { ...(prev.inventory ?? {}) };
      for (const [itemId, count] of Object.entries(hc.recipe)) {
        if ((inventory[itemId] ?? 0) < count) return prev; // 材料不足
      }
      for (const [itemId, count] of Object.entries(hc.recipe)) {
        inventory[itemId] = (inventory[itemId] ?? 0) - count;
      }
      ok = true;
      return {
        ...prev,
        inventory,
        collectedArtifacts: [...prev.collectedArtifacts, handcraftId],
        yearValue: prev.yearValue + 8,
      };
    });
    return ok;
  }, []);

  /** 访客好感度满后赠送背包物品（+10 岁时值） */
  const grantVisitorGift = useCallback((visitorId: string) => {
    const visitor = MOCK_VISITORS.find((v) => v.id === visitorId);
    if (!visitor) return;
    setProgress((prev) => ({
      ...prev,
      yearValue: prev.yearValue + 10,
      inventory: {
        ...(prev.inventory ?? {}),
        [visitor.giftItemId]: (prev.inventory?.[visitor.giftItemId] ?? 0) + 1,
      },
    }));
  }, []);

  /** 提升访客好感度（delta 可为负） */
  const boostAffinity = useCallback((visitorId: string, delta: number) => {
    setProgress((prev) => ({
      ...prev,
      visitorAffinity: {
        ...prev.visitorAffinity,
        [visitorId]: (prev.visitorAffinity[visitorId] ?? 0) + delta,
      },
    }));
  }, []);

  const resetProgress = useCallback(() => {
    setProgress(INITIAL_PROGRESS);
  }, []);

  return {
    progress,
    addYearValue,
    completeActivity,
    collectPhenology,
    collectFood,
    collectCrop,
    collectFlower,
    collectArtifact,
    meetVisitor,
    setCurrentTerm,
    setDecoration,
    plantCrop,
    harvestCrop,
    boostAffinity,
    addItem,
    craftHandcraft,
    grantVisitorGift,
    resetProgress,
  };
}
