import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { RoomsList } from '../rooms';

@Component({
  selector: 'hinv-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.css'],
  changeDetection:  ChangeDetectionStrategy.OnPush
})
export class RoomsListComponent implements OnInit, OnChanges,OnDestroy{
  @Input() rooms: RoomsList[] | null = [];

  @Input() title: string ='';

  @Output() selectedRoom = new EventEmitter<RoomsList>();

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if(changes['title']) {
      this.title = changes['title'].currentValue.toUppercase;     
    }
  }

  ngOnInit(): void {  
    
  }
  selectRoom(room: RoomsList) {
    this.selectedRoom.emit(room);
  }

  
  ngOnDestroy(): void {
    console.log("On destroy is called");
  }

}
    