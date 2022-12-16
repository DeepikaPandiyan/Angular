import { HttpEventType } from '@angular/common/http';
import { AfterViewChecked, AfterViewInit, Component, DoCheck, OnDestroy, OnInit, QueryList, SkipSelf, ViewChild, ViewChildren } from '@angular/core';
import { catchError, map, Observable, of, Subject, Subscriber, Subscription } from 'rxjs';
import { HeaderComponent } from '../header/header.component';
import { Room, RoomsList } from './rooms';
import { RoomsService } from './services/rooms.service';

@Component({
  selector: 'hinv-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit, DoCheck, AfterViewInit, AfterViewChecked {

  hotelName = 'RHR Hotel';
  numberOfRooms = 10;
  hideRooms = true;
  selectedRoom!: RoomsList;

  rooms: Room = {
    totalRooms: 20,
    availableRooms: 10,
    bookedRooms: 5,
  };

  title = 'Room List';

  roomList: RoomsList[] = [];

  stream = new Observable<string>(observer => {
    observer.next('user1');
    observer.next('user2');
    observer.next('user3');
    observer.complete();
  });

  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;

  @ViewChildren(HeaderComponent) headerChildrenComponent!: QueryList<HeaderComponent>;

  //roomService = new RoomsService();//this is a service

  totalBytes = 0;

  subscription !: Subscription;

  error$ = new Subject<string>();

  getError$ = this.error$.asObservable();

  rooms$ = this.roomsService.getRooms$.pipe(
    catchError((err) => {
      //console.log(err);
      this.error$.next(err.message);
      return of([]);
    })
  );

  roomsCount$ = this.roomsService.getRooms$.pipe(
    map((rooms) => rooms.length)
  )

  constructor(@SkipSelf() private roomsService: RoomsService) {

  }

  ngOnInit(): void {
    this.roomsService.getPhotos().subscribe((event) => {
      switch (event.type) {
        case HttpEventType.Sent: {
          console.log('Request has been made!');
          break;
        }
        case HttpEventType.ResponseHeader: {
          console.log('Request success!');
          break;
        }
        case HttpEventType.DownloadProgress: {
          this.totalBytes += event.loaded;
          break;
        }
        case HttpEventType.Response: {
          console.log(event.body);
        }
      }
    })

    this.stream.subscribe({
      next: (value) => console.log(value),
      complete: () => console.log('complete'),
      error: (err) => console.log(err),

    });
    this.stream.subscribe((data) => console.log(data));
    // this.roomsService.getRooms$.subscribe(rooms => {
    //   this.roomList =rooms;
    // })

  }
  ngDoCheck(): void {
    console.log('On changes is called ')
  }

  ngAfterViewInit(): void {
    this.headerComponent.title = "Rooms View";
    this.headerChildrenComponent.last.title = "Last Title";
    //this.headerChildrenComponent.get(0).title ="First Title"; 
  }

  ngAfterViewChecked(): void {

  }

  toggle() {
    this.hideRooms = !this.hideRooms;
    this.title = "Room List";
  }

  selectRoom(room: RoomsList) {
    this.selectedRoom = room;
  }

  addRoom() {
    const room: RoomsList = {
      //roomNumber: '4',
      roomType: 'Delexe Room',
      amenities: 'Air Conditioner, Free Wi-Fi, TV, Bathroom, Kitchen',
      price: 5000,
      photos: 'https://images.unsplash.com/photo-1670537114483-6f16e9d0107a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80',
      checkinTime: new Date('25-May-2022'),
      checkoutTime: new Date('27-May-2022'),
      rating: 3.5,
    };
    //this.roomList.push(room);

    //this.roomList = [...this.roomList, room];

    this.roomsService.addRoom(room).subscribe((data) => {
      this.roomList = data;
    });

  };

  editRoom() {
    const room: RoomsList = {
      roomNumber: '3',
      roomType: 'Delexe Room',
      amenities: 'Air Conditioner, Free Wi-Fi, TV, Bathroom, Kitchen',
      price: 5000,
      photos: 'https://images.unsplash.com/photo-1670537114483-6f16e9d0107a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80',
      checkinTime: new Date('25-May-2022'),
      checkoutTime: new Date('27-May-2022'),
      rating: 3.5,
    };

    this.roomsService.editRoom(room).subscribe((data) => {
      this.roomList = data;
    });
  }

  deleteRoom() {
    this.roomsService.delete('3').subscribe((data) => {
      this.roomList = data;
    })

  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}


