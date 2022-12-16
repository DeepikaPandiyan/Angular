import { AfterViewInit, Component, ElementRef, Inject, OnInit, Optional, ViewChild, ViewContainerRef } from '@angular/core';
import { RoomsComponent } from './rooms/rooms.component';
import { LoggerService } from './rooms/services/logger.service';
import { localStorageToken } from './localstorage.token';
import { InitService } from './init.service';
@Component({
  selector: 'hinv-root',
  templateUrl: './app.component.html',
  //template : `<h1>Hello World from inline template! <h1>' ,
  //<p>Angular is quite easy</p>`,
  styleUrls: ['./app.component.css']
  //styles: [`h1 {color: skyblue;font-weigt:600;}`]
})
export class AppComponent implements OnInit {
  title = 'hostelinventoryapp';

  @ViewChild('name', {static: true,}) name!: ElementRef;

  constructor(@Optional() private loggerService: LoggerService,
  @Inject(localStorageToken) private localStorage: any,
  private initService: InitService
  ) {
    console.log(initService.config);
  }

  ngOnInit() {
    this.loggerService?.log('AppComponent.ngOnInit()');
    this.name.nativeElement.innerText = "RHR hotel";

    this.localStorage.setItem('name','RHR Hotel');
  }

  // @ViewChild('user', { read: ViewContainerRef }) vcr!: ViewContainerRef;

  // ngAfterViewInit() {
  //   const componentRef = this.vcr.createComponent(RoomsComponent);
  //   componentRef.instance.numberOfRooms = 50;
  // }

}
