import { cleanCurrencyMap } from './cleanCurrencyMap';
import { getBonusProportions } from '../data/gameProportions';

export function buildBonusJson(formData: any) {
  // ✅ External Bonus
  if (formData.type === 'external') {
    return {
      id: formData.name,
      trigger: {
        type: 'external',
        duration: formData.duration || '2d',
        name: { '*': formData.triggerName },
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
    return {
      id: formData.name,
      trigger: {
        type: 'manual',
        name: { '*': formData.triggerName },
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
    return {
      id: formData.name,
      trigger: {
        type: 'open',
        name: { '*': formData.triggerName },
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

  // ✅ Close (FS Winnings) Bonus
if (formData.type === 'close') {
  return {
    id: formData.name,
    schedule: {
      type: 'period',
      from: formData.from,
      to: formData.to,
    },
    trigger: {
      type: 'close',
      duration: formData.duration || '2d',
      name: { '*': formData.triggerName },
      description: { '*': formData.triggerDescription || '' },
      iterations: Number(formData.iterations) || 1,
      triggerIds: formData.triggerIds
        ? formData.triggerIds.split(',').map((id: string) => id.trim()).filter(Boolean)
        : [],
      segments: formData.segments
        ? formData.segments.split(',').map((s: string) => s.trim()).filter(Boolean)
        : [],
      minimumAmount: cleanCurrencyMap(formData.minimumAmount),
      minimumStakeToWager: cleanCurrencyMap(formData.minimumStakeToWager),
      maximumStakeToWager: cleanCurrencyMap(formData.maximumStakeToWager),
    },
    config: {
      maximumAmount: cleanCurrencyMap(formData.maximumAmount),
      percentage: Number(formData.percentage),
      wageringMultiplier: Number(formData.wageringMultiplier),
      capCalculationAmountToMaximumBonus: !!formData.capCalculationAmountToMaximumBonus,
      includeAmountOnTargetWagerCalculation: !!formData.includeAmountOnTargetWagerCalculation,
      compensateOverspending: !!formData.compensateOverspending,
      type: 'cash',
      withdrawActive: !!formData.withdrawActive,
      category: formData.category || 'games',
      maximumWithdraw: cleanCurrencyMap(formData.maximumWithdraw),
      expiry: formData.expiry || '30d',
    },
    type: 'bonus_template',
  };
}


  // ✅ Deposit Bonus (Casino or Live)
  if (formData.type !== 'deposit') {
    throw new Error('Unsupported bonus type');
  }

  return {
    id: formData.name,
    schedule: {
      type: 'period',
      from: formData.from,
      to: formData.to,
    },
    trigger: {
      name: { en: formData.triggerName },
      description: { en: formData.triggerDescription },
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
