import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(HttpService)
      .useValue({
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
      })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/users (GET)', () => {
    it('should return a manipulated array of users based on an external API call', async () => {
      const expectedResponse = {
        success: true,
        data: [
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
        ]
      };

      return request(app.getHttpServer())
        .get('/users')
        .expect(200)
        .expect(expectedResponse);
    });
  });
});
