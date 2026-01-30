import { useContext } from 'react';

import { HeroAndDifficultyContext } from '../context/HeroAndDifficultyContext';

export function useHeroAndDifficulty () {
  const context = useContext(HeroAndDifficultyContext);

  if (!context) {
    throw new Error ('useSettings should be used by Provider');
  };

  return context;
};
