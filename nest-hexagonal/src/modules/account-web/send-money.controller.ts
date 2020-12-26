import { Controller, Get, Inject, Query } from '@nestjs/common';
import { MoneyEntity } from '../../domains/entities/money.entity';
import { SendMoneyCommand } from '../../domains/ports/in/send-money.command';
import {
  SendMoneyUseCase,
  SendMoneyUseCaseSymbol,
} from '../../domains/ports/in/send-money.use-case';

@Controller('/account/send')
export class SendMoneyController {
  constructor(
    @Inject(SendMoneyUseCaseSymbol)
    private readonly _sendMoneyUseCase: SendMoneyUseCase,
  ) {}

  @Get('/')
  async SendMoney(
    @Query('sourceAccountId') sourceAccountId: string,
    @Query('targetAccountId') targetAccountId: string,
    @Query('amount') amount: number,
  ) {
    const command = new SendMoneyCommand(
      sourceAccountId,
      targetAccountId,
      MoneyEntity.of(amount),
    );
    const result = await this._sendMoneyUseCase.sendMoney(command);
    return { result };
  }
}
