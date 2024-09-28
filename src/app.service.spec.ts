import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';

describe('AppService', () => {
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn().mockImplementation(() =>
              of({
                data: [
                  {
                    id: '0373e634-2d03-457e-a24d-2b0c8c3b7c37',
                    name: 'John Connor',
                    email: 'john.connor@niuco.com.br',
                    status: 'enabled',
                    role: 'admin',
                    last_activity: 1649179152,
                  },
                  {
                    id: '5fb75748-efa6-4d48-9930-14289d87466f',
                    name: 'Kyle Reese',
                    email: 'kyle.reese@gmail.com',
                    status: 'disabled',
                    role: 'editor',
                    last_activity: 1649073600,
                  },
                  {
                    id: '4c3dfa4c-3cee-4acb-b032-c09afad54ab4',
                    name: 'Bob Esponja',
                    email: 'bob.esponja@niuco.com.br',
                    status: 'enabled',
                    role: 'viewer',
                    last_activity: 1649098800,
                  },
                ],
              }),
            ),
          },
        },
      ],
    }).compile();

    appService = module.get<AppService>(AppService);
  });

  describe('getUsers', () => {
    it('should return a manipulated array of users based on an external API call', async () => {
      const expectedResponse = [
        {
          id: '0373e634-2d03-457e-a24d-2b0c8c3b7c37',
          name: 'John Connor',
          email: 'john.connor@niuco.com.br',
          lastActivity: '2022-04-05T17:19:12.000Z',
          isPayer: true,
          isActive: true,
        },
        {
          id: '5fb75748-efa6-4d48-9930-14289d87466f',
          name: 'Kyle Reese',
          email: 'ky******se@gmail.com',
          lastActivity: '2022-04-04T12:00:00.000Z',
          isPayer: false,
          isActive: false,
        },
        {
          id: '4c3dfa4c-3cee-4acb-b032-c09afad54ab4',
          name: 'Bob Esponja',
          email: 'bob.esponja@niuco.com.br',
          lastActivity: '2022-04-04T19:00:00.000Z',
          isPayer: false,
          isActive: true,
        },
      ];

      const result = await appService.getUsers();
      expect(result).toStrictEqual(expectedResponse);
    });
  });
});
