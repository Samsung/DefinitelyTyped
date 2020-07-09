import { application } from 'tizen-common-web';
import { ApplicationControlLaunchMode, ApplicationInformation, ApplicationControl } from 'application';
import { WebAPIError } from 'tizen';

var app = application.getCurrentApplication();
var watchId = app.addEventListener({ appId: app.appInfo.id, name: 'custom_user_event' }, function (event, data) {
    console.log('Data: ' + JSON.stringify(data));
    // Do something.
});

ApplicationControlLaunchMode.GROUP;
ApplicationControlLaunchMode.SINGLE;

var appControl = new ApplicationControl('http://tizen.org/appcontrol/operation/pick', 'null', 'image/jpeg', 'null');

function successCB(appInfos: ApplicationInformation[], appControl: ApplicationControl) {
    // appControl is same object with the value passed as first parameter to findAppControl().
    var appControlReplyCallback = {
        // Callee sent a reply.
        onsuccess: function () {
            // for (var i = 0; i < data.length; i++) {
            //     if (
            //         data[i].key ==
            //         'http://tizen.org/appcontrol/data/selected'
            //     ) {
            //         console.log(
            //             'Selected image is ' + data[i].value[0]
            //         );
            //     }
            // }
            console.log('[222]success');
        },
        // Callee returned failure.
        onfailure: function () {
            console.log('The launch application control failed');
        },
    };

    var appId = appInfos[0].id; // Select first app's id.

    application.launchAppControl(
        appControl,
        appId,
        function () {
            console.log('Launch application control succeed');
        },
        function (e: WebAPIError) {
            console.log('Launch application control failed, reason: ' + e.message);
        },
        appControlReplyCallback,
    );
}

application.findAppControl(appControl, successCB);
