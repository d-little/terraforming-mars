import {CardName} from '../../../common/cards/CardName';
import {ModuleManifest} from '../ModuleManifest';
import {AstroBiotics} from './AstroBiotics';

export const CHEMICAL_CORPORATIONS_CARD_MANIFEST = new ModuleManifest({
  module: 'chemicalCorporations',
  corporationCards: {
    [CardName.ASTRO_BIOTICS]: {Factory: AstroBiotics},
  },
});
