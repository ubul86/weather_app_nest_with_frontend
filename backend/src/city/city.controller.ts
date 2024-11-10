import {
  Controller,
  Get,
  Post,
  Query,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CityService } from './city.service';
import { formatCityResponse } from '../utils/format-response.util';
import { CreateCityDto } from './dto/create-city.dto';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get()
  async getAllCities() {
    const cities = await this.cityService.getAllCities();
    return cities.map((city) => formatCityResponse(city));
  }

  @Get('/get-city-by-coords')
  async getCityByCoords(
    @Query('latitude') latitude: number,
    @Query('longitude') longitude: number,
  ) {
    const city = await this.cityService.findByCoords(latitude, longitude);

    if (!city) {
      throw new HttpException(`City not found`, HttpStatus.BAD_REQUEST);
    }

    return formatCityResponse(city);
  }

  @Post()
  async create(@Body() CreateCityDto: CreateCityDto) {
    const city = await this.cityService.create(CreateCityDto);
    return formatCityResponse(city);
  }

  @Post('/find-by-name-or-create')
  async findOrCreate(@Body() CreateCityDto: CreateCityDto) {
    const city = await this.cityService.findByNameOrCreate(CreateCityDto);
    return formatCityResponse(city);
  }

  @Get('/get-city-name-by-coords')
  async getCityNameByCoords(
    @Query('latitude') latitude: number,
    @Query('longitude') longitude: number,
  ) {
    if (!latitude || !longitude) {
      throw new HttpException(
        `Latitude and longitude are required`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const city = await this.cityService.getCityNameByCoords(
      latitude,
      longitude,
    );

    return { city };
  }
}
