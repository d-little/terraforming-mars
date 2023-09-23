import {CardName} from '../../../common/cards/CardName';
import {ModuleManifest} from '../ModuleManifest';
import {AstroBiotics} from './AstroBiotics';
import {AndersonRocketManufacturing} from './AndersonRocketManufacturing';

export const CHEMICAL_CORPORATIONS_CARD_MANIFEST = new ModuleManifest({
  module: 'chemicalCorporations',
  corporationCards: {
    [CardName.ANDERSON_ROCKET_MANUFACTURING]: {Factory: AndersonRocketManufacturing},
    [CardName.ASTRO_BIOTICS]: {Factory: AstroBiotics},
  },
});
