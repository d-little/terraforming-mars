import {OrOptions} from '../inputs/OrOptions';
import {SelectOption} from '../inputs/SelectOption';
import {IPlayer} from '../IPlayer';
import {PlayerInput} from '../PlayerInput';
import {DeferredAction, Priority} from './DeferredAction';
import {IParty} from '../turmoil/parties/IParty';
import {BonusId, PolicyId} from '../../common/turmoil/Types';
import {policyDescription} from '../turmoil/Policy';

export class ChoosePoliticalAgenda extends DeferredAction {
  constructor(
    player: IPlayer,
    public party: IParty,
    public bonusCb: (bonusId: BonusId) => void,
    public policyCb: (policyId: PolicyId) => void,
  ) {
    super(player, Priority.DEFAULT);
  }

  public execute(): PlayerInput {
    const players = this.player.game.getPlayers();
    const bonuses: Array<SelectOption> = this.party.bonuses.map((bonus) => {
      const description = bonus.description + ' (' + players.map((player) => player.name + ': ' + bonus.getScore(player)).join(' / ') + ')';

      return new SelectOption(description, 'Select', () => {
        this.bonusCb(bonus.id);
        return undefined;
      });
    });

    const orBonuses = new OrOptions(...bonuses);
    orBonuses.title = 'Select a ' + this.party.name + ' bonus.';

    const policies = this.party.policies.map((policy) => {
      return new SelectOption(policyDescription(policy, this.player),
        'Select',
        () => {
          this.policyCb(policy.id);
          return undefined;
        });
    });
    const orPolicies = new OrOptions(...policies);
    orPolicies.title = 'Select a ' + this.party.name + ' policy.';

    return new OrOptions(orBonuses, orPolicies);
  }
}
