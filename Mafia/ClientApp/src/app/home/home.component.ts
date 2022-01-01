import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HomeServices } from './home.services';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {

  newGameForm = new FormGroup ({
    name: new FormControl('')
  })

  constructor(private _HomeServices: HomeServices){

  }

  newGame(){
    this._HomeServices.initializeNewGame();
    this._HomeServices.listenForWaitingScreen();
  }

//   document.getElementById("newGameStartBtn").addEventListener("click", function (event) {
//     connection.invoke("AddUserToGroup", "gameOwner").catch(function (error) {
//         return console.error(error.toString());
//     });
//     var user = document.getElementById("nameInputStart").value;
//     connection.invoke("StartGame", user).catch(function (err) {
//         return alert("User already exists");
//     });
//     event.preventDefault();
// });

}
