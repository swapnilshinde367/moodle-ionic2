import { Component } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import { SectionPage } from '../section/section';
import { CsaService } from '../../app/services/csa.service';

@Component({
  templateUrl : 'details.html'
})
export class DetailsPage {

    strToken    :     string;
    intCourseId :     number;
    arrmixCourse :    any;
    arrmixContents :  any;

  constructor( public navCtrl: NavController, 
  				public params:NavParams, 
				public loadingCtrl: LoadingController, 
				private csaService: CsaService ) {
    this.arrmixCourse = params.get( 'arrmixCourse' );
    this.intCourseId  = params.get( 'intCourseId' );
    this.strToken     = params.get( 'strToken' );  
  }

  ngOnInit() {
    this.handleGetCourseById();
  }

	handleGetCourseById() {
		if( undefined == this.arrmixCourse.enrollmentmethods ) {

				let loading = this.loadingCtrl.create( {
					content: 'Loading....'
				} );

				loading.present();

				this.csaService.handleGetCourseById( this.strToken, this.intCourseId ).subscribe( objResponse => {
					this.arrmixContents = objResponse;
				
					loading.dismiss();

				} );
		}

		if( undefined != this.arrmixCourse.enrollmentmethods &&  -1 != this.arrmixCourse.enrollmentmethods.indexOf( 'self' ) ) {
			this.arrmixCourse.enrollmentmethods = 'self';
		}
	}

	handleEnrolUserToCourse( arrmixCourse ) {
		this.csaService.handleEnrolUserToCourse( arrmixCourse, this.strToken ).subscribe( objResponse => {
			// console.log(objResponse);
		} );

	}

	handleViewCourseContent( arrmixCourse ) {
		this.navCtrl.push( SectionPage, {
			arrmixCourse  : arrmixCourse,
			strToken      : this.strToken
		} );
	}

}