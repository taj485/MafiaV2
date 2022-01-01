import { Component } from '@angular/core';
import { SignalrService } from './signalr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';
  connection;

  constructor(public signalrService: SignalrService)
  {
  }

  ngOnInit() {
    this.connection = this.signalrService.startConnection().subscribe(x => {
      this.signalrService.askServerListener();
      this.signalrService.askServer();
    });
  }

  ngOnDestroy(){
    this.connection.unsubscribe();
  }
}
