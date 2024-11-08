import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CityModule } from './city/city.module';
import { WeatherModule } from './weather/weather.module';
import { SeederService } from './seeder/seeder.service';
import { CitySchema } from './city/schemas/city.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { WeatherFetcherService } from './weather-fetcher/weather-fetcher.service';
import * as dotenv from 'dotenv';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';

dotenv.config();

@Module({
  imports: [
    HttpModule,
    CityModule,
    WeatherModule,
    ScheduleModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    MongooseModule.forFeature([{ name: 'City', schema: CitySchema }]),
  ],
  controllers: [AppController],
  providers: [AppService, SeederService, WeatherFetcherService],
})
export class AppModule {}
