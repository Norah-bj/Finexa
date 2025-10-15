import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly txService: TransactionsService) {}

  @Post()
  async create(@Body() dto: CreateTransactionDto) {
    // ⚠️ For demo only: taking userId from body.
    // In production, use AuthGuard + request.user.
    return this.txService.create(dto, { id: dto.userId } as any);
  }

  @Get()
  async findAll() {
    return this.txService.findAll();
  }

  @Get('user/:userId')
  async forUser(@Param('userId') userId: string) {
    return this.txService.findAllForUser(userId);
  }

  @Get('totals/:userId')
  async totals(@Param('userId') userId: string) {
    return this.txService.getTotals(userId);
  }
}

