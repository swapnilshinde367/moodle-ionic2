import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

@Injectable()
export class CsaService {

    http:               any;
    intRoleId :         number;
    strToken :          string;
    strAuthUrl :        string;
    strUserName :       string
    strPassword :       string;
    strEnrolmentKey :   string;
    strWebServiceUrl :  string;
    arrmixUserData :    any;

    constructor( http:Http ) {
        this.http               = http;
        this.intRoleId          = 5; // Student Role Id
        this.strAuthUrl         = 'http://14.1.197.36/lms-upgradedlogin/token.php?service=moodle_mobile_app';
        this.strEnrolmentKey    = 'keytosuccess';
        this.strWebServiceUrl   = 'http://14.1.197.36/lms-upgradedwebservice/rest/server.php?&moodlewsrestformat=json';
    }

    handleInit() {

        this.strUserName = 'cv.raman';
        this.strPassword = 'Password@12345';

        return this.http
            .post( this.strAuthUrl + '&username=' + this.strUserName + '&password=' + this.strPassword )
            .map( objResponse => objResponse.json() );
    }

    handleStoreToken( strToken )  {
        this.strToken = strToken;
        console.log( this.strToken );
    }

    handleGetAllCourses( strToken ) {
        return this.http
        .post( this.strWebServiceUrl + '&wstoken=' + strToken + '&wsfunction=core_course_get_courses_by_field' )
        .map( res => res.json() );
    }

    handleGetCourseById( strToken, intCourseId ) {
        return this.http
            .post( this.strWebServiceUrl + '&wstoken=' + strToken + '&courseid=' + intCourseId + '&wsfunction=core_course_get_contents' )
            .map( objResponse => objResponse.json() );
    }

    handleGetUsersData( strToken ) {
        this.arrmixUserData = this.http
            .post( this.strWebServiceUrl + '&wstoken=' + strToken + '&values[]=' + this.strUserName +
                    '&wsfunction=core_user_get_users_by_field&field=username' )
            .map( objResponse => objResponse.json() );
        return this.arrmixUserData ;
    }

    handleGetAllEnrolledCoursesByUserId( strToken, intUserid ) {
        return this.http
            .post( this.strWebServiceUrl + '&wstoken=' + strToken + '&userid=' + intUserid + '&wsfunction=core_enrol_get_users_courses' )
            .map( objResponse => objResponse.json() );
    }

    handleEnrolUserToCourse( arrmixCourse, strToken ) {
        // console.log( arrmixCourse.id );
        // console.log( this.arrmixUserData[0].id );
        return this.http
            .post( this.strWebServiceUrl +
                    '&wstoken=' + strToken +
                    '&password=' + this.strEnrolmentKey +
                    '&courseid=' + arrmixCourse.id +
                    '&wsfunction=enrol_self_enrol_user' )
            .map( objResponse => objResponse.json() );

            // console.log(this.strWebServiceUrl +
            //         '&wstoken=' + strToken +
            //         '&password=' + this.strEnrolmentKey +
            //         '&courseid=' + arrmixCourse.id +
            //         '&wsfunction=enrol_self_enrol_user' );
    }


    //copied from Moodle Mobile
        handleDecodeHTML (text) {
            if (typeof text == 'undefined' || text === null || (typeof text == 'number' && isNaN(text))) {
                return '';
            } else if (typeof text != 'string') {
                return '' + text;
            }
            return text
                .replace(/&amp;/g, '&')
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&quot;/g, '"')
                .replace(/&#039;/g, "'")
                .replace(/&nbsp;/g, ' ');
        }
}

