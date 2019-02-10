import { Component, OnInit } from '@angular/core';
import {HttpServiceService} from '../http-service.service';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  constructor(private http: HttpServiceService, private toast: ToastController) { }

  public registeredPlayers: any;
  public teams: any;

  ngOnInit() {
    this.getRegisteredUsers();

    this.http.do('get', '/getTeam/all')
      .then((response) => {
        this.teams = response.body;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  public changeTeam(playerId, e) {
    this.http.do('post', '/assign', {playerId: playerId, teamId: e.detail.value})
      .then((response) => {
        this.getRegisteredUsers();
        this.presentToast('Team changed success');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  private async presentToast(message) {
    const toast = await this.toast.create({
      message: message,
      position: 'top',
      duration: 2000
    });
    toast.present();
  }

  private getRegisteredUsers() {
    this.http.do('get', '/registered')
      .then((response) => {
        this.registeredPlayers = response.body;
      })
      .catch((err) => {
        console.log(err);
      });
  }

}