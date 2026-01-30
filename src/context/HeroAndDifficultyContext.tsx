import { createContext, useState } from "react";

type HeroesAndDiffType = {
  heroId: number | null,
  difficulty: string | null,

  setHeroId: (id: number) => void; 
  setDifficulty: (diff: string) => void;
}

export const HeroAndDifficultyContext = createContext<HeroesAndDiffType | null>(null);

export function HeroAndDifficultyContextProvider ({ children }: {children: React.ReactNode}) {
  const [heroId, setHeroId] = useState<number | null>(null);
  const [difficulty, setDifficulty] = useState<string | null>(null);

  const value: HeroesAndDiffType = {
    heroId,
    difficulty,

    setHeroId: (heroId: number) => setHeroId(heroId),
    setDifficulty: (diff: string) => setDifficulty(diff),
  };

  return (
    <HeroAndDifficultyContext.Provider value={value}>
      {children}
    </HeroAndDifficultyContext.Provider>
  );
};
