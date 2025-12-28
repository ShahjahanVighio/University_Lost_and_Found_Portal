import { Test, TestingModule } from '@nestjs/testing';
import { LostService } from './lost.service';

describe('LostService', () => {
  let service: LostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LostService],
    }).compile();

    service = module.get<LostService>(LostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
