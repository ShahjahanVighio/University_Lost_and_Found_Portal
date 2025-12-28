import { Test, TestingModule } from '@nestjs/testing';
import { FoundController } from './found.controller';

describe('FoundController', () => {
  let controller: FoundController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FoundController],
    }).compile();

    controller = module.get<FoundController>(FoundController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
