import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})

export class SignalrService {
    constructor() {

    }

    hubConnection: signalR.HubConnection;

    startConnection()  {
        return new Observable(observer => {
            this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl('https://localhost:44355/mafia')
            .build();

            this.hubConnection
                .start()
                .then(() => {
                    observer.next()
                    console.log('Hub connection started');
                })
                .catch(err => console.log('Error while starting connection: ' + err))
        })
    }

    askServerListener() {
        this.hubConnection.on("AskServerResponse", (someText) => {
            console.log(someText)
        });
    }

    askServer() {
        this.hubConnection.invoke("AskServer", "hey")
            .catch(err => console.error(err))

    }


}

