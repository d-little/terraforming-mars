import {IPlayer} from '../IPlayer';
import {SelectPayment} from '../inputs/SelectPayment';
import {Payment} from '../../common/inputs/Payment';
import {DeferredAction, Priority} from './DeferredAction';
import {CardName} from '../../common/cards/CardName';
import {Message} from '../../common/logs/Message';

export type Options = {
  canUseSteel?: boolean;
  canUseTitanium?: boolean;
  canUseSeeds?: boolean,
  canUseAuroraiData?: boolean,
  canUseGraphene?: boolean;
  canUseAsteroids?: boolean;
  canUseSpireScience?: boolean,
  title?: string | Message;
  afterPay?(): void;
}

export class SelectPaymentDeferred extends DeferredAction {
  constructor(
    player: IPlayer,
    public amount: number,
    public options: Options = {},
  ) {
    super(player, Priority.DEFAULT);
  }

  private mustPayWithMegacredits() {
    if (this.player.canUseHeatAsMegaCredits && this.player.availableHeat() > 0) {
      return false;
    }
    if (this.options.canUseSteel && this.player.steel > 0) {
      return false;
    }
    if (this.options.canUseTitanium && this.player.titanium > 0) {
      return false;
    }
    if (this.options.canUseGraphene && this.player.resourcesOnCard(CardName.CARBON_NANOSYSTEMS) > 0) {
      return false;
    }
    if (this.options.canUseAsteroids && this.player.resourcesOnCard(CardName.KUIPER_COOPERATIVE) > 0) {
      return false;
    }
    // HOOK: Luna Trade Federation
    if (this.player.isCorporation(CardName.LUNA_TRADE_FEDERATION) && this.player.titanium > 0) {
      return false;
    }
    if (this.options.canUseSeeds && (this.player.resourcesOnCard(CardName.SOYLENT_SEEDLING_SYSTEMS) > 0)) {
      return false;
    }
    if (this.options.canUseAuroraiData && (this.player.resourcesOnCard(CardName.AURORAI) > 0)) {
      return false;
    }
    if (this.options.canUseSpireScience && (this.player.resourcesOnCard(CardName.SPIRE) > 0)) {
      return false;
    }

    return true;
  }

  public execute() {
    if (this.mustPayWithMegacredits()) {
      if (this.player.megaCredits < this.amount) {
        throw new Error(`Player does not have ${this.amount} M€`);
      }
      this.player.pay(Payment.of({megaCredits: this.amount}));
      this.options.afterPay?.();
      return undefined;
    }

    return new SelectPayment(
      this.options.title || 'Select how to spend ' + this.amount + ' M€',
      this.amount,
      {
        steel: this.options.canUseSteel || false,
        titanium: this.options.canUseTitanium || false,
        heat: this.player.canUseHeatAsMegaCredits,
        seeds: this.options.canUseSeeds || false,
        auroraiData: this.options.canUseAuroraiData || false,
        spireScience: this.options.canUseSpireScience || false,
        lunaTradeFederationTitanium: this.player.canUseTitaniumAsMegacredits,
        kuiperAsteroids: this.options.canUseAsteroids || false,
      },
      (payment: Payment) => {
        this.player.pay(payment);
        this.options.afterPay?.();
        return undefined;
      },
    );
  }
}
