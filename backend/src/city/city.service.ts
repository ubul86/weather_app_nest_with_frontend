import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { City, CityDocument } from './schemas/city.schema';
import { Model } from 'mongoose';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { CreateCityDto } from './dto/create-city.dto';

@Injectable()
export class CityService {
  constructor(
    @InjectModel(City.name) private cityModel: Model<CityDocument>,
    private readonly httpService: HttpService,
  ) {}

  async getAllCities(): Promise<City[]> {
    return this.cityModel.find().exec();
  }

  async findByName(cityName: string): Promise<City> {
    return this.cityModel.findOne({ name: cityName }).exec();
  }

  async findByCoords(latitude: number, longitude: number): Promise<City> {
    return this.cityModel
      .findOne({ latitude: latitude, longitude: longitude })
      .exec();
  }

  async create(createCityDto: CreateCityDto): Promise<City> {
    const createdCity = new this.cityModel({
      name: createCityDto.name,
      latitude: createCityDto.latitude,
      longitude: createCityDto.longitude,
    });

    return createdCity.save();
  }

  async findByNameOrCreate(createCityDto: CreateCityDto): Promise<City> {
    const existingCity = await this.cityModel.findOne({
      name: createCityDto.name,
    });

    if (existingCity) {
      return existingCity;
    }

    return await this.create(createCityDto);
  }

  async getCityNameByCoords(
    latitude: number,
    longitude: number,
  ): Promise<string> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(
          'https://api.bigdatacloud.net/data/reverse-geocode-client',
          {
            params: {
              latitude,
              longitude,
              localityLanguage: 'hu',
            },
          },
        ),
      );
      const city = response.data.city;

      if (!city) {
        throw new HttpException(
          `City not found for the given location`,
          HttpStatus.NOT_FOUND,
        );
      }

      return city;
    } catch (error) {
      throw new HttpException(
        `Failed to fetch city data`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
