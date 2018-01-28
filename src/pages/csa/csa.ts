import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetailsPage } from '../details/details';
import { LoadingController } from 'ionic-angular';
import { CsaService } from '../../app/services/csa.service';

@Component({
  selector    : 'csa',
  templateUrl : 'csa.html',
//   pipe : 'EscapeHtmlPipe'
})
export class CsaPage {

  strToken :		        string;
  arrmixCourses :           any;
  arrmixUserData :          any;
  arrmixEnrolledCourses :   any;

  constructor( public navCtrl: NavController, public loadingCtrl: LoadingController, private csaService: CsaService ) {

  }

  ngOnInit() {
    this.handleInit();
  }

    handleInit() {

        let loading = this.loadingCtrl.create({
            content: 'Loading....'
        });
        loading.present();

        this.csaService.handleInit().subscribe( response => {
            this.strToken = response.token;

            this.csaService.handleGetUsersData( this.strToken ).subscribe( response => {
                this.arrmixUserData = response;
                this.csaService.arrmixUserData = response;

                this.csaService.handleGetAllCourses( this.strToken ).subscribe( response => {
                    this.arrmixCourses = response.courses;
                    this.csaService.handleGetAllEnrolledCoursesByUserId( this.strToken, this.arrmixUserData[0].id ).subscribe( response => {
                        this.arrmixEnrolledCourses = response;
                    } );
                } );
            } );

            loading.dismiss();
        } );
    }

  handleGetAllCourses() {
      // this.csaService.handleGetAllCourses();
  }

  handleViewCourseContent( arrmixCourse ) {

    // console.log(arrmixCourse);
    this.navCtrl.push( DetailsPage, {
      arrmixCourse  : arrmixCourse,
      intCourseId   : arrmixCourse.id,
      strToken      : this.strToken
    } );

  }
}
