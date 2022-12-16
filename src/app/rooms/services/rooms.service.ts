import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { shareReplay } from 'rxjs';
import { AppConfig } from '../../AppConfig/appconfig.interface';
import { APP_SERVICE_CONFIG } from '../../AppConfig/appconfig.service';
import { RoomsList } from '../rooms';


@Injectable({
  providedIn: 'root',
})
export class RoomsService {
  roomList: RoomsList[] = [];
  //headers = new HttpHeaders({ 'token': '1324884310849hcdsnnd' });
  getRooms$ = this.http.get<RoomsList[]>('/api/rooms').pipe(shareReplay(1));

  constructor(@Inject(APP_SERVICE_CONFIG) private config: AppConfig,
    private http: HttpClient) {
    console.log(this.config.apiEndpoint);
    console.log('Rooms Service Intialized...');
  }

  getRooms() {
    return this.http.get<RoomsList[]>('/api/rooms');
  }

  addRoom(room: RoomsList) {
    return this.http.post<RoomsList[]>('/api/rooms', room);
  }

  editRoom(room: RoomsList) {
    return this.http.put<RoomsList[]>(`/api/rooms/${room.roomNumber}`, room);
  }

  delete(id: string) {
    return this.http.delete<RoomsList[]>(`/api/rooms/${id}`);
  }

  getPhotos() {
    const request = new HttpRequest('GET', `https://jsonplaceholder.typicode.com/photos`, {
      reportProgress: true,
    });

    return this.http.request(request);
  }
}
