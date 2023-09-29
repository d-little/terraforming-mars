import {CardName} from '../../../common/cards/CardName';
import {ModuleManifest} from '../ModuleManifest';

import {AdamasCorporation} from './AdamasCorporation';
import {Aerotech} from './Aerotech';
import {AppliedNanotech} from './AppliedNanotech';
import {AndersonRocketManufacturing} from './AndersonRocketManufacturing';
import {AstroBiotics} from './AstroBiotics';

import {MadritchFoodServices} from './MadritchFoodServices';

export const CHEMICAL_CORPORATIONS_CARD_MANIFEST = new ModuleManifest({
  module: 'chemicalCorporations',
  corporationCards: {
    [CardName.ADAMAS_CORPORATION]: {Factory: AdamasCorporation},
    [CardName.AEROTECH]: {Factory: Aerotech},
    [CardName.APPLIED_NANOTECH]: {Factory: AppliedNanotech},
    [CardName.ANDERSON_ROCKET_MANUFACTURING]: {Factory: AndersonRocketManufacturing, compatibility: 'turmoil'},
    [CardName.ASTRO_BIOTICS]: {Factory: AstroBiotics},
    [CardName.MADRITCH_FOOD_SERVICES]: {Factory: MadritchFoodServices},
  },
});
