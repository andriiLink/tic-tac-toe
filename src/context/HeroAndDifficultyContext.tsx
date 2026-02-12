import { createContext, useState } from "react";
import { HeroType } from "../types/HeroType";

type HeroesAndDiffType = {
  hero: HeroType | null,
  difficulty: string | null,

  setHero: (hero: HeroType) => void; 
  setDifficulty: (diff: string) => void;
}

export const HeroAndDifficultyContext = createContext<HeroesAndDiffType | null>(null);

export function HeroAndDifficultyContextProvider ({ children }: {children: React.ReactNode}) {
  const [hero, setHero] = useState<HeroType | null>(null);
  const [difficulty, setDifficulty] = useState<string | null>(null);

  const value: HeroesAndDiffType = {
    hero,
    difficulty,

    setHero: (hero: HeroType) => setHero(hero),
    setDifficulty: (diff: string) => setDifficulty(diff),
  };

  return (
    <HeroAndDifficultyContext.Provider value={value}>
      {children}
    </HeroAndDifficultyContext.Provider>
  );
};
