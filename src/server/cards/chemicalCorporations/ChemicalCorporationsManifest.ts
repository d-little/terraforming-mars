import {CardName} from '../../../common/cards/CardName';
import {ModuleManifest} from '../ModuleManifest';

import {AdamasCorporation} from './AdamasCorporation';
import {AstroBiotics} from './AstroBiotics';
import {AndersonRocketManufacturing} from './AndersonRocketManufacturing';

export const CHEMICAL_CORPORATIONS_CARD_MANIFEST = new ModuleManifest({
  module: 'chemicalCorporations',
  corporationCards: {
    [CardName.ADAMAS_CORPORATION]: {Factory: AdamasCorporation},
    [CardName.ANDERSON_ROCKET_MANUFACTURING]: {Factory: AndersonRocketManufacturing, compatibility: 'turmoil'},
    [CardName.ASTRO_BIOTICS]: {Factory: AstroBiotics},
  },
});
