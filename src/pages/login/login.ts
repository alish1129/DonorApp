import { Component } from '@angular/core';
import { AlertController, IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { User } from "../../types/user";
import { AngularFireAuth } from "angularfire2/auth";
import { SessionManager } from "../../providers/service/session-manager";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {
    email: "kiran.yadubanshi@selu.edu",
    password: "loveuuz",
    displayName: "Morang"
  } as User;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private afAuth: AngularFireAuth,
              private loadCtrl: LoadingController,
              private alertCtrl: AlertController,
              private sessionManager: SessionManager) {
  }

  async login(user: User) {
    let loader = this.loadCtrl.create({
      duration: 10000,
      content: "Signing in... Please wait."
    });
    let alerter = this.alertCtrl.create({
      message: "Could Not Login. Please try again",
      buttons: ["Ok"]
    });

    console.log(this.afAuth.auth.currentUser);
    return loader.present()
      .then(() => this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password))
      .then(() => {
        this.sessionManager.setCurrentUser(this.user);
        console.log(this.afAuth.auth.currentUser);
        return this.navCtrl.setRoot("PatientListPage")
      })
      .then(() => loader.dismiss())
      .catch((error) => {
        console.log(error);
        loader.dismiss()
          .then(() => {
            alerter.setTitle(error.code);
            alerter.setMessage(error.message);
           return alerter.present();
          });
      });
  }

  passwordReset(){

  }

}