import { Test, TestingModule } from '@nestjs/testing';
import { LostController } from './lost.controller';

describe('LostController', () => {
  let controller: LostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LostController],
    }).compile();

    controller = module.get<LostController>(LostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
