import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({
    providedIn: 'root',
})

export class SignalrService {
    constructor() {

    }

    hubConnection: signalR.HubConnection;

    startConnection() {
        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl('https://localhost:5001/mafia')
            .build();

        this.hubConnection
            .start()
            .then(() => {
                console.log('Hub connection started');
            })
            .catch(err => console.log('Error while starting connection: ' + err))
    }

    askServer() {
        this.hubConnection.invoke("AskServer", "hey")
            .catch(err => console.error(err))

    }

    askServerListener() {
        this.hubConnection.on("AskServerResponse", (someText) => {
            console.log(someText)
        });
    }






}

