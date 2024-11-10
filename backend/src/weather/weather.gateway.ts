import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ namespace: '/weather', cors: { origin: '*' } })
export class WeatherGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  constructor() {}

  async afterInit() {
    console.log('Weather WebSocket initialized');
  }

  async handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
  }

  async handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
  }

  async sendWeatherUpdate(city: string, weatherData: any) {
    this.server.emit('weatherUpdate', { city, weatherData });
  }
}
