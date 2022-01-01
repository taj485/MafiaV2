import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})

export class HomeServices {
    
    users;

    constructor() {

    }

    hubConnection: signalR.HubConnection;

    initializeNewGame(){
        this.hubConnection.invoke("AddUserToGroup", "gameOwner")
            .catch(err => console.error(err));
    }

    listenForWaitingScreen() {
        this.hubConnection.on("loadWaitingRoom", (users, gameId) => {
            return {users, gameId};
        })
    }
      
    askServerListener() {
        this.hubConnection.on("AskServerResponse", (someText) => {
            console.log(someText)
        });
    }

}

