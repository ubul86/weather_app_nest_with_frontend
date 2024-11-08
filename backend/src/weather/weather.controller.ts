import { Controller, Get, Param } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { CityService } from '../city/city.service';
import { NotFoundException } from '@nestjs/common';

@Controller('weather')
export class WeatherController {
  constructor(
    private readonly weatherService: WeatherService,
    private readonly cityService: CityService,
  ) {}

  @Get(':cityName')
  async getWeatherForCity(@Param('cityName') cityName: string) {
    const city = await this.cityService.findByName(cityName);
    if (!city) {
      throw new NotFoundException('City not found');
    }
    return this.weatherService.getWeatherByCityName(cityName);
  }
}
