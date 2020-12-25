import { ActivityWindowEntity } from './activity-window.entity';
import { ActivityEntity } from './activity.entity';
import { MoneyEntity } from './money.entity';

export type AccountId = string;

export class AccountEntity {
  constructor(
    private readonly _id: AccountId,
    private readonly _baseLineBalance: MoneyEntity,
    private readonly _activityWindow: ActivityWindowEntity,
  ) {}

  public get id(): AccountId {
    return this._id;
  }

  public get baseLineBalance(): MoneyEntity {
    return this._baseLineBalance;
  }

  public get activityWindow(): unknown {
    return this._activityWindow;
  }

  public calculateBalance(): MoneyEntity {
    return MoneyEntity.add(
      this._baseLineBalance,
      this._activityWindow.calculateBalance(this.id),
    );
  }

  public withdraw(money: MoneyEntity, targetAccountId: AccountId): boolean {
    if (!this._mayWithdrawMoney(money)) {
      return false;
    }

    const withdrawal = new ActivityEntity(
      this.id,
      targetAccountId,
      new Date(),
      money,
    );

    this._activityWindow.addActivity(withdrawal);
    return true;
  }

  public deposit(money: MoneyEntity, sourceAccountId: AccountId) {
    const deposit: ActivityEntity = new ActivityEntity(
      sourceAccountId,
      this.id,
      new Date(),
      money,
    );
    this._activityWindow.addActivity(deposit);
    return true;
  }

  private _mayWithdrawMoney(money: MoneyEntity) {
    return MoneyEntity.add(
      this.calculateBalance(),
      money.negate(),
    ).isPositiveOrZero();
  }
}
