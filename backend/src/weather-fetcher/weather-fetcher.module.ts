import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { WeatherFetcherService } from './weather-fetcher.service';
import { CityModule } from '../city/city.module';

@Module({
  imports: [HttpModule, CityModule],
  providers: [WeatherFetcherService],
  exports: [WeatherFetcherService],
})
export class WeatherFetcherModule {}
