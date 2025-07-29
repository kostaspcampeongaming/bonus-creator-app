// gameProportions.ts

import { baseGameList } from './gameLists';

export function getZeroGameProportions(): Record<string, number> {
  return Object.fromEntries(
    Object.keys(baseGameList).map(game => [game, 0])
  );
}


export function getBonusProportions(formType: 'casino' | 'liveCasino'): Record<string, number> {
  console.log("getBonusProportions got:", formType); // Add this
  const proportions = {
    ...getZeroGameProportions(),
  };

  if (formType === 'casino') {
    proportions['SLOT_GAMES'] = 100;
    proportions['VIRTUAL_GAMES'] = 50;
    proportions['CASINO_GAMES'] = 20;
    proportions['LUCKY_GAMES'] = 50;
  } else if (formType === 'liveCasino') {
    proportions['ROULETTE'] = 20;
    proportions['BLACKJACK'] = 10;
    proportions['BACCARAT'] = 5;
    proportions['OTHER'] = 10;
  }

  return proportions;
}

