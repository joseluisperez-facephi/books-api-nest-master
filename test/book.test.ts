import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { BooksModule } from '../src/books/books.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from '../src/books/entities/book.entity';
import { send } from 'process';
import { AppModule } from '../src/app.module';


jest.setTimeout(1 * 60 * 1000);

export default () => {
  let app: INestApplication;

  

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });


 

  afterAll(async () => {
    await app.close();
  });

  describe('/book (GET) findByAutor', () => {
    it('OK (Happy Path)', async () => {
      const response = await request(app.getHttpServer()).get(
        '/books/Carlos Pérez Tumbado',
      );

      expect(response.statusCode).toBe(200);
      expect(response.body.id).toBe('5a7d0029-6e12-46e0-ae3a-4f0f8c1002a4');
    });

    it('ERR Not found Author', async () => {
      const response = await request(app.getHttpServer()).get(
        '/books/Jose Luis Gómez',
      );

      expect(response.statusCode).toBe(404);
    });
  });

  describe('/ (POST) create', () => {
    it('OK (Happy Path)', async () => {
      const response = await request(app.getHttpServer())
        .post('/books')
        .send({
          titulo: 'PRUEBACA',
          isbn: '55555wr6-00f0-00b0-x000-00000e5306b0',
          resumen: 'Nunca hubo uno pero seguimos estudiandolos 2',
          autor: 'Raimundo Colorado Pelado',
          editorial: 'PAPAYA',
          urlPDF: '',
          categoria: ['La mejor'],
          idioma: ['ENG'],
          valoracion: 10,
        });
      
      console.log('MIRA AQUI2', response.body);
      expect(response.statusCode).toBe(201);
      expect(response.body.isbn).toEqual(
        '55555wr6-00f0-00b0-x000-00000e5306b0',
      );

      //expect(response.body.book).toBe( Book);
    });

    it('ERR Not create book', async () => {
      const response = await request(app.getHttpServer())
        .post('/books')
        .send({
          titulo: 'PRUEBACA',
          isbn: '34238xx9-80f0-44b6-x778-14617e5306c1',
          resumen: 'Nunca hubo uno pero seguimos estudiandolos 2',
          autor: 'Raimundo Colorado Pelado',
          editorial: 'PAPAYA',
          urlPDF: '',
          categoria: ['La mejor'],
          idioma: ['ENG'],
          valoracion: 10,
        });

      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({
        statusCode: 400,
        message:
          'Key (isbn)=(34238xx9-80f0-44b6-x778-14617e5306c1) already exists.',
        error: 'Bad Request',
      });
    });
  });

  describe('/book (DELETE) delete', () => {
    it('OK (Happy Path)', async () => {
      const response = await request(app.getHttpServer()).delete(
        '/books/88329128-e661-495e-bade-4b8406a9451b',
      );

      expect(response.statusCode).toBe(200);
    });

    it('ERR Not delete book', async () => {
      const response = await request(app.getHttpServer()).delete(
        '/books/871b85bf-67d2-41b2-8c74-90ee3256eef8',
      );

      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({
        statusCode: 404,
        message:
          'El producto con el id 871b85bf-67d2-41b2-8c74-90ee3256eef8 no ha sido encontrado',
        error: 'Not Found',
      });
    });
  });

  describe('/:id (PATCH) update', () => {
    it('OK (Happy Path)', async () => {
      const response = await request(app.getHttpServer()).patch(
        '/books/5a7d0029-6e12-46e0-ae3a-4f0f8c1002a4',
      ).send({ 
        isbn: "32238xx9-80f0-44b6-x778-14617e5306c1",
        editorial: "Ed Papata"});

        console.log(response.body)
      expect(response.statusCode).toBe(200);
      expect(response.body.isbn).toEqual("32238xx9-80f0-44b6-x778-14617e5306c1");
      expect(response.body.editorial).toEqual("Ed Papata");
    });

    it('ERR Not update book)', async () => {
      const response = await request(app.getHttpServer()).patch(
        '/books/26bfee99-3925-4372-b62f-343fa8b47f22',
      ).send({ 
        editorial: "Ed Papata"});

        console.log(response.body)
      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({ 
        statusCode: 404,
        message: "El libro con el id: 26bfee99-3925-4372-b62f-343fa8b47f22 no ha sido encontrado",
        error: "Not Found"});
      
    });
  });


  describe('/:term (GET) findOne', () => {
    it('OK (Happy Path)', async () => {
      const response = await request(app.getHttpServer()).get(
        '/books/ba50fb54-3c03-4db9-8b8c-1264cf337a0f',
      );

      expect(response.statusCode).toBe(200);
      expect(response.body.id).toEqual('ba50fb54-3c03-4db9-8b8c-1264cf337a0f');
    });

    it('ERR Not found BookID', async () => {
      const response = await request(app.getHttpServer()).get(
        '/books/992f6338-ecad-4270-8985-e7f300006e99',
      );

      console.log("mira aqui3",response.body)
      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({
        statusCode: 404,
        message: "El producto con el id 992f6338-ecad-4270-8985-e7f300006e99 no ha sido encontrado",
        error: "Not Found"});
    });
  });

  describe('/ (GET) findAll', () => {


  });


};

