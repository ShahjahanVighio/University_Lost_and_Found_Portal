import { Test, TestingModule } from '@nestjs/testing';
import { FoundService } from './found.service';

describe('FoundService', () => {
  let service: FoundService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FoundService],
    }).compile();

    service = module.get<FoundService>(FoundService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
