// EXPORTS: IGameProgress, useGameProgress, STORAGE_KEY

import { useState, useEffect, useCallback } from 'react';

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
      return {
        ...prev,
        yearValue: prev.yearValue + yearValue,
        completedActivities: [...prev.completedActivities, activityId],
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
    resetProgress,
  };
}
