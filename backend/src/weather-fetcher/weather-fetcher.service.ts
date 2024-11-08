import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { City } from '../city/schemas/city.schema';
import * as dotenv from 'dotenv';

dotenv.config();
@Injectable()
export class WeatherFetcherService {
  constructor(private readonly httpService: HttpService) {}

  async fetchWeatherData(city: City): Promise<any> {
    console.log(city.name);
    const response = await firstValueFrom(
      this.httpService.get('http://api.weatherapi.com/v1/current.json', {
        params: {
          key: process.env.WEATHER_API_KEY,
          q: city.name.normalize('NFD').replace(/[\u0300-\u036f]/g, ''),
          aqi: 'no',
        },
      }),
    );
    return response.data;
  }
}
