import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Investment } from './entities/investment.entity';
import { InvestmentProduct } from './entities/investment-product.entity';
import { CreateInvestmentDto } from './dto/create-investment.dto';
import { UpdateInvestmentDto } from './dto/update-investment.dto';

@Injectable()
export class InvestmentsService {
  constructor(
    @InjectRepository(Investment)
    private readonly investRepo: Repository<Investment>,
    @InjectRepository(InvestmentProduct)
    private readonly productRepo: Repository<InvestmentProduct>,
  ) {}

  async create(userId: string, dto: CreateInvestmentDto) {
    const product = await this.productRepo.findOneBy({ id: dto.productId });
    if (!product) throw new NotFoundException('Product not found');

    const investment = this.investRepo.create({
      userId,
      productName: product.name,
      riskProfile: product.riskProfile,
      investedAmount: dto.amount,
      currentValue: dto.amount,
    });
    return this.investRepo.save(investment);
  }

  findUserInvestments(userId: string) {
    return this.investRepo.find({ where: { userId } });
  }

  async overview(userId: string) {
    const investments = await this.findUserInvestments(userId);
    const totalInvested = investments.reduce((s, i) => s + Number(i.investedAmount), 0);
    const currentValue = investments.reduce((s, i) => s + Number(i.currentValue), 0);
    return {
      totalInvested,
      currentValue,
      totalGain: currentValue - totalInvested,
      returnPct: totalInvested ? ((currentValue - totalInvested) / totalInvested) * 100 : 0,
    };
  }

  findRiskProfiles() {
    return this.productRepo
      .createQueryBuilder('p')
      .select('DISTINCT p.riskProfile', 'riskProfile')
      .getRawMany();
  }

  recommendations(profile: string) {
    return this.productRepo.find({ where: { riskProfile: profile } });
  }

  async updateValue(id: string, dto: UpdateInvestmentDto) {
    const result = await this.investRepo.update(id, dto);
    if (result.affected === 0) throw new NotFoundException('Investment not found');
    return this.investRepo.findOneBy({ id });
  }
}