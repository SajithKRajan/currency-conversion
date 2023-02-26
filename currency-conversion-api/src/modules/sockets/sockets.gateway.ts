import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { BroadcastService } from './broadcast.service';
import { SocketEvents } from './events';
import { FilterPayload } from '../exchange/filter.payload';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  path: '/socket.io/',
})
export class SocketsGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @WebSocketServer()
  public server: Server;

  constructor(private broadcastService: BroadcastService) {}
  afterInit(server: Server) {
    console.debug('Socket server initialized');
  }

  handleConnection(@ConnectedSocket() client: any) {
    console.debug(`User with socket ${client.id} Connected`);
    client.join(client.id);
  }

  handleDisconnect(@ConnectedSocket() client: any) {
    console.debug(`User with socket ${client.id} Disconnected`);
    this.broadcastService.stopSubscribingLiveData(client.id);
    client.leave(client.id);
  }

  @SubscribeMessage(SocketEvents.start.toString())
  startDataSubscription(
    @ConnectedSocket() client: any,
    @MessageBody() body: FilterPayload,
  ): void {
    // Stop subscribing if already sbscribed.
    this.broadcastService.stopSubscribingLiveData(client.id);
    this.broadcastService.startSubscribingLiveData(
      this.server,
      client.id,
      body,
    );
    console.debug(`User with socket ${client.id} started subscription`);
  }

  @SubscribeMessage(SocketEvents.stop.toString())
  stopDataSubscription(@ConnectedSocket() client: any): void {
    this.broadcastService.stopSubscribingLiveData(client.id);
    console.debug(`User with socket ${client.id} stopped subscription`);
  }
}
