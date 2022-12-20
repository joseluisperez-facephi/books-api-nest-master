import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './books/books.module';
import { CommonModule } from './common/common.module';
import { AuthBooksModule } from './auth_books/auth_books.module';

@Module({
  imports: [
    ConfigModule.forRoot(),

    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: process.env.DB_HOST,
    //   port: +process.env.DB_PORT,
    //   database: process.env.DB_NAME,
    //   username: process.env.DB_USERNAME,
    //   password: process.env.DB_PASSWORD,
    //   autoLoadEntities: true,
    //   synchronize: true,
    // }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory:
        process.env.NODE_ENV === "test"
          ? (configService: ConfigService) => ({
            type: "postgres",
            host: configService.get("DB_HOST"),
            port: configService.get("DB_PORT_TEST"),
            username: configService.get("DB_USERNAME"),
            password: configService.get("DB_PASSWORD"),
            database: configService.get("DB_NAME_TEST"),
            autoLoadEntities: true,
            synchronize: true,
          }) : async (configService: ConfigService) => {
            return {
              type: "postgres",
              database: configService.get("DB_NAME"),
              host: configService.get("DB_HOST"),
              port: configService.get("DB_PORT"),
              username: configService.get("DB_USERNAME"),
              password: configService.get("DB_PASSWORD"),
              autoLoadEntities: true,
              synchronize: true,
            }
          },
    }),
    BooksModule,

    CommonModule,

    AuthBooksModule,
  ],
})
export class AppModule {}
