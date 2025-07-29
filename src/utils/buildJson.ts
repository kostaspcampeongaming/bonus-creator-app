import { getBonusProportions } from '../data/gameProportions';

export function buildBonusJson(formData: any) {
  // ✅ External Bonus
  if (formData.type === 'external') {
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
        cost: formData.cost || {},
        multiplier: formData.multiplier || {},
        maximumBets: formData.maximumBets || {},
        provider: formData.provider || '',
        brand: formData.brand || '',
        type: 'free_bet',
        withdrawActive: formData.withdrawActive || false,
        category: formData.category || 'games',
        maximumWithdraw: formData.maximumWithdraw || {},
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
        name: {
          '*': formData.triggerName,
        },
      },
      config: {
        cost: formData.cost || {},
        multiplier: formData.multiplier || {},
        maximumBets: formData.maximumBets || {},
        provider: formData.provider || '',
        brand: formData.brand || '',
        type: 'free_bet',
        withdrawActive: formData.withdrawActive || false,
        category: formData.category || 'games',
        maximumWithdraw: formData.maximumWithdraw || {},
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
        name: {
          '*': formData.triggerName,
        },
        duration: formData.duration || '2d',
        ids: formData.triggerIds
          ? formData.triggerIds.split(',').map((id: string) => id.trim()).filter(Boolean)
          : [],
        minimumAmount: formData.minimumAmount || {},
      },
      config: {
        cost: formData.cost || {},
        multiplier: formData.multiplier || {},
        maximumBets: formData.maximumBets || {},
        provider: formData.provider || '',
        brand: formData.brand || '',
        type: 'free_bet',
        withdrawActive: formData.withdrawActive || false,
        category: formData.category || 'games',
        maximumWithdraw: formData.maximumWithdraw || {},
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

  // ✅ Deposit Bonus
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
      name: {
        en: formData.triggerName,
      },
      description: {
        en: formData.triggerDescription,
      },
      type: 'deposit',
      minimumAmount: formData.minimumAmount || {},
      iterations: formData.iterations || 1,
      segments: formData.segments
        ? formData.segments.split(',').map((s: string) => s.trim()).filter(Boolean)
        : [],
    },
    config: {
      compensateOverspending: formData.compensateOverspending || false,
      maximumAmount: formData.maximumAmount || {},
      percentage: formData.percentage,
      wageringMultiplier: formData.wageringMultiplier,
      includeAmountOnTargetWagerCalculation: formData.includeAmountOnTargetWagerCalculation || false,
      capCalculationAmountToMaximumBonus: formData.capCalculationAmountToMaximumBonus || false,
      type: 'cash',
      withdrawActive: formData.withdrawActive || false,
      category: formData.category || 'games',
      maximumWithdraw: formData.maximumWithdraw || {},
      expiry: formData.expiry || '30d',
      extra: {
        proportions: getBonusProportions(formData.formType),
      },
    },
    type: 'bonus_template',
  };
}
