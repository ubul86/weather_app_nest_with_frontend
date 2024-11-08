import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ namespace: '/weather' })
export class WeatherGateway implements OnGatewayInit {
  @WebSocketServer() server: Server;

  constructor() {}

  async afterInit() {
    console.log('Weather WebSocket initialized');
  }

  async sendWeatherUpdate(city: string, weatherData: any) {
    this.server.emit('weatherUpdate', { city, weatherData });
  }
}
