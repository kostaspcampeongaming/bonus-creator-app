import { cleanCurrencyMap } from './cleanCurrencyMap';
import { getBonusProportions } from '../data/gameProportions';

export function buildBonusJson(formData: any) {
  // ✅ External Bonus
  if (formData.type === 'external') {
    console.log('🔍 [External] RAW cost:', formData.cost);
    console.log('🔍 [External] RAW multiplier:', formData.multiplier);
    console.log('🔍 [External] RAW maximumBets:', formData.maximumBets);
    console.log('🔍 [External] RAW maximumWithdraw:', formData.maximumWithdraw);

    return {
      id: formData.name,
      trigger: {
        type: 'external',
        duration: formData.duration || '2d',
        name: {
          '*': formData.triggerName,
        },
      },
      config: {
        cost: cleanCurrencyMap(formData.cost),
        multiplier: cleanCurrencyMap(formData.multiplier),
        maximumBets: cleanCurrencyMap(formData.maximumBets),
        provider: formData.provider || '',
        brand: formData.brand || '',
        type: 'free_bet',
        withdrawActive: !!formData.withdrawActive,
        category: formData.category || 'games',
        maximumWithdraw: cleanCurrencyMap(formData.maximumWithdraw),
        expiry: formData.expiry || '2d',
        extra: {
          games: formData.games
            ? formData.games.split(',').map((g: string) => g.trim()).filter(Boolean)
            : [],
        },
      },
      type: 'bonus_template',
    };
  }

  // ✅ Manual Bonus
  if (formData.type === 'manual') {
    console.log('🔍 [Manual] RAW cost:', formData.cost);
    console.log('🔍 [Manual] RAW multiplier:', formData.multiplier);
    console.log('🔍 [Manual] RAW maximumBets:', formData.maximumBets);
    console.log('🔍 [Manual] RAW maximumWithdraw:', formData.maximumWithdraw);

    return {
      id: formData.name,
      trigger: {
        type: 'manual',
        name: {
          '*': formData.triggerName,
        },
      },
      config: {
        cost: cleanCurrencyMap(formData.cost),
        multiplier: cleanCurrencyMap(formData.multiplier),
        maximumBets: cleanCurrencyMap(formData.maximumBets),
        provider: formData.provider || '',
        brand: formData.brand || '',
        type: 'free_bet',
        withdrawActive: !!formData.withdrawActive,
        category: formData.category || 'games',
        maximumWithdraw: cleanCurrencyMap(formData.maximumWithdraw),
        expiry: formData.expiry || '2d',
        extra: {
          games: formData.games
            ? formData.games.split(',').map((g: string) => g.trim()).filter(Boolean)
            : [],
        },
      },
      type: 'bonus_template',
    };
  }

  // ✅ Open (FS Package) Bonus
  if (formData.type === 'open') {
    console.log('🔍 [Open] RAW cost:', formData.cost);
    console.log('🔍 [Open] RAW multiplier:', formData.multiplier);
    console.log('🔍 [Open] RAW maximumBets:', formData.maximumBets);
    console.log('🔍 [Open] RAW minimumAmount:', formData.minimumAmount);
    console.log('🔍 [Open] RAW maximumWithdraw:', formData.maximumWithdraw);

    return {
      id: formData.name,
      trigger: {
        type: 'open',
        name: {
          '*': formData.triggerName,
        },
        duration: formData.duration || '2d',
        ids: formData.triggerIds
          ? formData.triggerIds.split(',').map((id: string) => id.trim()).filter(Boolean)
          : [],
        minimumAmount: cleanCurrencyMap(formData.minimumAmount),
      },
      config: {
        cost: cleanCurrencyMap(formData.cost),
        multiplier: cleanCurrencyMap(formData.multiplier),
        maximumBets: cleanCurrencyMap(formData.maximumBets),
        provider: formData.provider || '',
        brand: formData.brand || '',
        type: 'free_bet',
        withdrawActive: !!formData.withdrawActive,
        category: formData.category || 'games',
        maximumWithdraw: cleanCurrencyMap(formData.maximumWithdraw),
        expiry: formData.expiry || '2d',
        extra: {
          games: formData.games
            ? formData.games.split(',').map((g: string) => g.trim()).filter(Boolean)
            : [],
        },
      },
      type: 'bonus_template',
    };
  }

  // ✅ Deposit Bonus (Casino or Live)
  if (formData.type !== 'deposit') {
    throw new Error('Unsupported bonus type');
  }

  console.log('🔍 [Deposit] RAW minimumAmount:', formData.minimumAmount);
  console.log('🔍 [Deposit] RAW maximumAmount:', formData.maximumAmount);
  console.log('🔍 [Deposit] RAW maximumWithdraw:', formData.maximumWithdraw);

  return {
    id: formData.name,
    schedule: {
      type: 'period',
      from: formData.from,
      to: formData.to,
    },
    trigger: {
      name: {
        en: formData.triggerName,
      },
      description: {
        en: formData.triggerDescription,
      },
      type: 'deposit',
      minimumAmount: cleanCurrencyMap(formData.minimumAmount),
      iterations: Number(formData.iterations) || 1,
      segments: formData.segments
        ? formData.segments.split(',').map((s: string) => s.trim()).filter(Boolean)
        : [],
    },
    config: {
      compensateOverspending: !!formData.compensateOverspending,
      maximumAmount: cleanCurrencyMap(formData.maximumAmount),
      percentage: Number(formData.percentage),
      wageringMultiplier: Number(formData.wageringMultiplier),
      includeAmountOnTargetWagerCalculation: !!formData.includeAmountOnTargetWagerCalculation,
      capCalculationAmountToMaximumBonus: !!formData.capCalculationAmountToMaximumBonus,
      type: 'cash',
      withdrawActive: !!formData.withdrawActive,
      category: formData.category || 'games',
      maximumWithdraw: cleanCurrencyMap(formData.maximumWithdraw),
      expiry: formData.expiry || '30d',
      extra: {
        proportions: getBonusProportions(formData.formType),
      },
    },
    type: 'bonus_template',
  };
}
