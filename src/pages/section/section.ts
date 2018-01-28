import { Component } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import { CsaService } from '../../app/services/csa.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  templateUrl : 'section.html'
})
export class SectionPage {

    strToken    :     string;
    intCourseId :     number;
    arrmixCourse :    any;
    arrmixContents :  any;

    strTestURl :      any;

  constructor( public navCtrl: NavController, 
              public params:NavParams, 
              public loadingCtrl: LoadingController, 
              private csaService: CsaService,
              private sanitizer: DomSanitizer ) {

    this.arrmixCourse = params.get( 'arrmixCourse' );
    this.strToken     = params.get( 'strToken' );  
  }

	ngOnInit() {
		this.handleViewSection();
	}

	handleViewSection() {

	}

  photoURL( strUrl ) {
    // console.log(strUrl);
    this.strTestURl = this.sanitizer.bypassSecurityTrustUrl( strUrl );
    return this.strTestURl.changingThisBreaksApplicationSecurity;
  }

}