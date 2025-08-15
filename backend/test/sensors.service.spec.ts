import { Test, TestingModule } from '@nestjs/testing';
import { SensorsService } from '../src/sensors/sensors.service.js';

describe('SensorsService', () => {
  let service: SensorsService;
  let mockModel: any;

  beforeEach(async () => {
    mockModel = {
      create: jest.fn(async (doc) => ({ toObject: () => doc })),
      aggregate: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue([]) }),
      find: jest.fn().mockReturnValue({ sort: () => ({ limit: () => ({ lean: () => ({ exec: jest.fn().mockResolvedValue([]) }) }) }) }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SensorsService,
        { provide: 'ReadingModel', useValue: mockModel }
      ],
    })
    .useMocker((token) => {
      if (token && typeof token === 'function' && token.name === 'getModelToken') return mockModel;
    })
    .compile();

    service = module.get<SensorsService>(SensorsService);
    // @ts-ignore override injected model
    service = new SensorsService(mockModel);
  });

  it('creates a reading', async () => {
    const created = await service.create({ deviceId: 'dev1', temperature: 20, humidity: 50, power: 100 });
    expect(created.deviceId).toBe('dev1');
  });

  it('gets latest per device', async () => {
    const res = await service.latestPerDevice();
    expect(Array.isArray(res)).toBe(true);
  });
});
