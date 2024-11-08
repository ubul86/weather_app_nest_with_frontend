import { Module, forwardRef } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { City, CitySchema } from '../city/schemas/city.schema';
import { CityModule } from '../city/city.module';
import { WeatherGateway } from './weather.gateway';
import { WeatherFetcherModule } from '../weather-fetcher/weather-fetcher.module';

@Module({
  imports: [
    HttpModule,
    CityModule,
    MongooseModule.forFeature([{ name: City.name, schema: CitySchema }]),
    forwardRef(() => WeatherFetcherModule),
  ],
  providers: [WeatherService, WeatherGateway],
  controllers: [WeatherController],
  exports: [WeatherService, WeatherGateway],
})
export class WeatherModule {}
