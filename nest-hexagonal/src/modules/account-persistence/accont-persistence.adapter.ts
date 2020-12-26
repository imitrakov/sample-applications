import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  AccountEntity,
  AccountId,
} from '../../domains/entities/account.entity';
import { LoadAccountPort } from '../../domains/ports/out/load-account.port';
import { UpdateAccountStatePort } from '../../domains/ports/out/update-account-state.port';
import { AccountMapper } from './account.mapper';
import { AccountOrmEntity } from './account.orm-entity';
import { ActivityOrmEntity } from './activity.orm-entity';

@Injectable()
export class AccountPersistenceAdapter
  implements LoadAccountPort, UpdateAccountStatePort {
  constructor(
    @InjectRepository(AccountOrmEntity)
    private readonly _accountRepository: Repository<AccountOrmEntity>,
    @InjectRepository(ActivityOrmEntity)
    private readonly _activitytRepository: Repository<ActivityOrmEntity>,
  ) {}

  async loadAccount(accountId: AccountId): Promise<AccountEntity> {
    const account = await this._accountRepository.findOne({
      userId: accountId,
    });

    if (account === undefined) {
      throw new Error('Account not found');
    }
    const activities = await this._activitytRepository.find({
      ownerAccountId: accountId,
    });

    return AccountMapper.mapToDomain(account, activities);
  }

  updateActivities(account: AccountEntity) {
    account.activityWindow.activities.forEach((activity) => {
      if (activity.id === null) {
        this._activitytRepository.save(
          AccountMapper.mapToActivityOrmEntity(activity),
        );
      }
    });
  }
}
