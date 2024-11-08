import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { CityService } from '../city/city.service';
import { WeatherFetcherService } from '../weather-fetcher/weather-fetcher.service';
import { WeatherGateway } from './weather.gateway';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class WeatherService {
  private isFetching = false;
  constructor(
    private readonly cityService: CityService,
    private readonly weatherFetcherService: WeatherFetcherService,
    private readonly weatherGateway: WeatherGateway,
  ) {}

  async getWeatherByCityName(cityName: string): Promise<any> {
    const city = await this.cityService.findByName(cityName);
    if (!city) {
      throw new Error(`City with name ${cityName} not found`);
    }
    const weatherData = await this.weatherFetcherService.fetchWeatherData(city);
    if (weatherData) {
      await this.weatherGateway.sendWeatherUpdate(city.name, weatherData);
    }
    return weatherData;
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async fetchWeatherAndUpdate() {
    if (this.isFetching) {
      console.log('Cron task already running, skipping this run.');
      return;
    }

    this.isFetching = true;
    try {
      const cities = await this.cityService.getAllCities();
      console.log(
        `Fetching weather data for all cities at ${new Date().toISOString()}`,
      );

      const promises = cities.map(async (city) => {
        const weatherData =
          await this.weatherFetcherService.fetchWeatherData(city);
        if (weatherData) {
          await this.weatherGateway.sendWeatherUpdate(city.name, weatherData);
        }
      });

      await Promise.all(promises);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    } finally {
      this.isFetching = false;
    }
  }
}
