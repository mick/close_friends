/*
 * Code-samples JavaScript
 */

var ttsInput, txtPhone, textMsgNum, textMsg, txtFilename,txtBinFilename, txtContents,txtBinContents, txtRead, txtDelete;

function init() {

	// Create Expandable regions
	x$(".group").addClass("closed");
	x$(".group .title").on("click", function() {
		var el = x$(this.parentNode);
		if (el.hasClass("closed"))
			el.removeClass("closed");
		else
			el.addClass("closed");
	});
	
	// BUTTON AND INPUT WIDGETS
	
	// Dial Phone Number
	txtPhone = new gm.widgets.TextField({
			value:"1234567890",
			parentElement: document.getElementById('phone-input')
		});
	txtPhone.render(); // associated html element id=phone-input
	var phoneBtn = new gm.widgets.Button({
			callBack: callPhone,
			label:"Dial Number",
	        parentElement: document.getElementById('phone-button')
		});
	phoneBtn.render(); // associated html element id=phone-button
	
	// Get Radio Info
	var radioBtn = new gm.widgets.Button({
		callBack: getRadio,
		label:"Get Radio Info",
        parentElement: document.getElementById('radio-btn')
	});
	radioBtn.render(); //associated html element
	
	// GPS
	var gpsBtn = new gm.widgets.Button({
		callBack: getPosition,
		label:"Get location",
        parentElement: document.getElementById('gps-button')
	});
	gpsBtn.render();

	var watchGPS = new gm.widgets.Button({
		callBack: watchPosition,
		label:"Watch GPS location",
        parentElement: document.getElementById('watch-gps-button')
	});
	watchGPS.render();
	
	//NAV
	
	var watchDestBtn = new gm.widgets.Button({
		callBack: watchDest,
		label:"Watch Destination",
        parentElement: document.getElementById('watchDest-button')
	});
	watchDestBtn.render();
	
	var clearDestBtn = new gm.widgets.Button({
		callBack: clearDest,
		label:"Clear Destination",
        parentElement: document.getElementById('clearDest-button')
	});
	clearDestBtn.render();
	
	// Write to file
	txtFilename = new gm.widgets.TextField({
		value:"dir/subdir/myfile.txt",
		parentElement: document.getElementById('file-name-input')
	});
	txtFilename.render();
	
	txtBinFilename = new gm.widgets.TextField({
		value:"dir/subdir/myfile.txt",
		parentElement: document.getElementById('binfile-name-input')
	});
	txtBinFilename.render();
	
	txtContents = new gm.widgets.TextField({
		value:"file contents",
		parentElement: document.getElementById('contents-input')
	});
	txtContents.render();
	
	txtBinContents = new gm.widgets.TextField({
		value:"file contents",
		parentElement: document.getElementById('bincontents-input')
	});
	txtBinContents.render();

	var fileWriteBtn = new gm.widgets.Button({
				callBack: writeFile,
				label:"Write file",
		        parentElement: document.getElementById('file-write-btn')
			});
	fileWriteBtn.render();
	
	var binFileWriteBtn = new gm.widgets.Button({
		callBack: writeBinFile,
		label:"Write Binary file",
        parentElement: document.getElementById('binfile-write-btn')
	});
	binFileWriteBtn.render();
	
	// Read from file
	txtRead = new gm.widgets.TextField({
		value:"dir/subdir/myfile.txt",
		parentElement: document.getElementById('file-read-input')
	});
	txtRead.render();

	var fileReadBtn = new gm.widgets.Button({
				callBack: readFile,
				label:"Read file",
		        parentElement: document.getElementById('file-read-btn')
			});
	fileReadBtn.render();
	
	// Delete file
	txtDelete = new gm.widgets.TextField({
		value:"dir/subdir/myfile.txt",
		parentElement: document.getElementById('file-del-input')
	});
	txtDelete.render();

	var fileDelBtn = new gm.widgets.Button({
				callBack: deleteFile,
				label:"Delete file",
		        parentElement: document.getElementById('file-del-btn')
			});
	fileDelBtn.render('#file-del-btn');
	
	
	// Audio Control
	var playBtn = new gm.widgets.Button({ callBack: play, label: "Play",
        parentElement: document.getElementById('audio-play') });
	playBtn.render();

	var pauseBtn = new gm.widgets.Button({ callBack: pause, label: "Pause",
        parentElement: document.getElementById('audio-pause') });
	pauseBtn.render();
	
	var seekBtn = new gm.widgets.Button({ callBack: seek, label: "Seek to 30 sec",
        parentElement: document.getElementById('audio-seek') });
	seekBtn.render();
	
	var stopBtn = new gm.widgets.Button({ callBack: stop, label: "Stop",
        parentElement: document.getElementById('audio-stop') });
	stopBtn.render();
	
	var playVideo = new gm.widgets.Button({ callBack: playVid, label: "Play video",
        parentElement: document.getElementById('video-play') });
	playVideo.render();
	
	// Get Vehicle configuration information
	var configButton = new gm.widgets.Button({ label: "Get Vehicle Configuration Information", 
		callBack: getConfig,
        parentElement: document.getElementById('vehicle-config-button')
	});
	configButton.render();
	
	// Get Vehicle data
	var vehicleDataBtn = new gm.widgets.Button({ label: "Get Vehicle Data", 
		callBack: getVehicleData,
        parentElement: document.getElementById('vehicle-data-button')
	});
	vehicleDataBtn.render();
	
	// Show alert
	var alertBtn = new gm.widgets.Button({ label: "Show alert", 
		callBack: showAlert,
        parentElement: document.getElementById('show-alert-button')
	});
	alertBtn.render();

    var keyboardBtn = new gm.widgets.Button({ label: "Show keyboard",
        callBack: showKeyboard,
        parentElement: document.getElementById('keyboard')
    });
    keyboardBtn.render();

    var keyboardBtn = new gm.widgets.Button({ label: "Show keyboard",
    	callBack: showKeyboardEmail,
        parentElement: document.getElementById('keyboardEmail')
    });
    keyboardBtn.render();

    var numpadBtn = new gm.widgets.Button({ label: "Show numpad",
        callBack: showNumpad,
        parentElement: document.getElementById('numpadS')
    });
    numpadBtn.render();

    var numpadMultBtn = new gm.widgets.Button({ label: "Init numpad",
        callBack: showNumpadMult,
        parentElement: document.getElementById('numpadMult')
    });
    numpadMultBtn.render();

    var keyboardMultBtn = new gm.widgets.Button({ label: "Init keyboard",
        callBack: showKeyboardMult,
        parentElement: document.getElementById('keyboardMult')
    });
    keyboardMultBtn.render();
    
    var watchNetworkCB = function () {
    	watchNetworkConnectivityID = gm.comm.watchNetworkConnectivity(
    function(response) {
        console.log('Success: watchNetworkConnectivity.  Network Connectivity: ' + response);
    },
    function() {
        console.log('Failure: watchNetworkConnectivity.');
    }
);
    };
    
    var watchNet = new gm.widgets.Button({ label: "Watch Network",
        callBack: watchNetworkCB,
        parentElement: document.getElementById('watchNetwork')
    });
    watchNet.render();
    
    var clearNetworkCB = function () {
    	if(typeof watchNetworkConnectivityID !== 'undefined') gm.comm.clearNetworkConnectivity(watchNetworkConnectivityID);
    };
    
    var clearNet = new gm.widgets.Button({ label: "Clear Network",
        callBack: clearNetworkCB,
        parentElement: document.getElementById('clearNetwork')
    });
    clearNet.render();
    
    var getNetworkCB = function () {
    	var isNetworkConnected = gm.comm.getNetworkConnectivity();
    	console.log('Network Connectivity: ' + isNetworkConnected);
    };
    
    var getNet = new gm.widgets.Button({ label: "Get Network",
        callBack: getNetworkCB,
        parentElement: document.getElementById('getNetwork')
    });
    getNet.render();
    
    var clearPositionCB = function () {
    	gm.info.clearPosition(watchPositionID);
    };
    
    var clearPos = new gm.widgets.Button({ label: "Clear Position",
        callBack: clearPositionCB,
        parentElement: document.getElementById('clear-gps-button')
    });
    clearPos.render();
    
    var watchVehicleDataCB = function () {
    	// Pass null for options to get all signals
watchVehicleDataID = gm.info.watchVehicleData(
    function(responseObj) {
        console.log('Success: watchVehicleData ' , responseObj);
    },
    function(responseObj) {
        console.log('Failure: watchVehicleData ', responseObj);
    },
    [
        'yaw_rate',
        'gps_lat',
        'engine_oil_pressure',
        'shift_lever_position'
    ]
);
    };
    
    var watchVehPos = new gm.widgets.Button({ label: "Watch Vehicle Data",
        callBack: watchVehicleDataCB,
        parentElement: document.getElementById('watchVehicle-data-button')
    });
    watchVehPos.render();
    
    var clearVehicleCB = function () {
    	if(typeof watchVehicleDataID !== 'undefined') gm.info.clearVehicleData(watchVehicleDataID);
    };
    
    var clearVehicle = new gm.widgets.Button({ label: "Clear Vehicle Data",
        callBack: clearVehicleCB,
        parentElement: document.getElementById('clearVehicle-data-button')
    });
    clearVehicle.render();
    
    var getVINCB = function () {
    	console.log("Vehicle identification number: " + gm.info.getVIN());
    };
    
    var getVin = new gm.widgets.Button({ label: "Get VIN",
        callBack: getVINCB,
        parentElement: document.getElementById('VIN-data-button')
    });
    getVin.render();
    
    var watchRadioCB = function () {
    	watchRadioID = gm.info.watchRadioInfo(
    function(radioInfoObj) {
        console.log('Success: watchRadioInfo.');
        console.log('Song title: ' + radioInfoObj.song.title + ', Song artist: ' + radioInfoObj.song.artist);
    },
    function() {
        console.log('Failure: watchRadioInfo.');
    }
);
    };
    
    var watchRadio = new gm.widgets.Button({ label: "Watch Radio",
        callBack: watchRadioCB,
        parentElement: document.getElementById('watch-radio-button')
    });
    watchRadio.render();
    
    var clearRadioCB = function () {
    	if(typeof watchRadioID !== 'undefined') gm.info.clearRadioInfo(watchRadioID);
    };
    
    var clearRadio = new gm.widgets.Button({ label: "Clear Radio",
        callBack: clearRadioCB,
        parentElement: document.getElementById('clear-radio-button')
    });
    clearRadio.render();
    
    var getUserCB = function () {
    	console.log("Username: " + gm.info.getUser());
    };
    
    var getUser = new gm.widgets.Button({ label: "Get User",
        callBack: getUserCB,
        parentElement: document.getElementById('get-user-button')
    });
    getUser.render();
    
    var watchRotaryCB = function () {
    	watchRotaryControlID = gm.info.watchRotaryControl(
    function(rotaryEnum) {
        console.log('Success: watchRotaryControl. RotaryEnum: ' + rotaryEnum);
    },
    function() {
        console.log('Failure: watchRotaryControl.');
    }
);
    };
    
    var watchRotary = new gm.widgets.Button({ label: "Watch Rotary",
        callBack: watchRotaryCB,
        parentElement: document.getElementById('watch-rotary-button')
    });
    watchRotary.render();
    
    var clearRotaryCB = function () {
    	if(typeof watchRotaryControlID !== 'undefined') gm.info.clearRotaryControl(watchRotaryControlID);
    };
    
    var clearRotary = new gm.widgets.Button({ label: "Clear Rotary",
        callBack: clearRotaryCB,
        parentElement: document.getElementById('clear-rotary-button')
    });
    clearRotary.render();
    
    var watchDeviceCB = function () {
    	watchActiveDeviceConnectedID = gm.info.watchActiveDeviceConnected (
    function(connected) {
        console.log('Success: watchActiveDeviceConnected. Device is -> ' + connected);
    },
    function() {
        console.log('Failure: watchActiveDeviceConnected.');
    }
);
    };
    
    var watchDevice = new gm.widgets.Button({ label: "Watch Device",
        callBack: watchDeviceCB,
        parentElement: document.getElementById('watch-device-button')
    });
    watchDevice.render();    
    
    var clearDeviceCB = function () {
    	if(typeof watchActiveDeviceConnectedID !== 'undefined') gm.info.clearActiveDeviceConnected(watchActiveDeviceConnectedID);
    };
    
    var clearDevice = new gm.widgets.Button({ label: "Clear Device",
        callBack: clearDeviceCB,
        parentElement: document.getElementById('clear-device-button')
    });
    clearDevice.render();
    
    var watchButtonsCB = function () {
    	watchButtonsID = gm.info.watchButtons(
    function(controlId) {
        console.log('Success: watchButtons.');
        if (controlId == "BACK_SWITCH"){
            alert('Back was clicked.');
        }
    },
    function() {
        console.log('Failure: watchButtons.');
    },
    {}
);
    };
    
    var watchButtons = new gm.widgets.Button({ label: "Watch Back Button",
        callBack: watchButtonsCB,
        parentElement: document.getElementById('watch-button-button')
    });
    watchButtons.render();
    
    var clearButtonCB = function () {
    	if (typeof watchButtonsID !== 'undefined') gm.info.clearButtons(watchButtonsID);
    };
    
    var clearButtons = new gm.widgets.Button({ label: "Clear Buttons",
        callBack: clearButtonCB,
        parentElement: document.getElementById('clear-button-button')
    });
    clearButtons.render();
    
    var getVersionCB = function () {
    	console.log(gm.info.getVersion());
    };
    
    var getVersion = new gm.widgets.Button({ label: "Get Version",
        callBack: getVersionCB,
        parentElement: document.getElementById('get-version-button')
    });
    getVersion.render();   
    
    var getNetworkInfoCB = function () {
    	if (gm.info.getNetworkConnectivity())
    		console.log('We have internet!');
    	else
    		console.log('No internet!');   	
    	};
    
    var getNetworkInfo = new gm.widgets.Button({ label: "Get Network",
        callBack: getNetworkInfoCB,
        parentElement: document.getElementById('get-network-button')
    });
    getNetworkInfo.render();
    
    var getDestCB = function () {
    	gm.nav.getDestination(
    function(responseObj) {
        console.log('Success: getDestination -> Latitude: ' + responseObj.latitude + ' longitude: ' + responseObj.longitude);
    },
    function() {
        console.log('Failure: getDestination.');
    }
);
    };
    
    var getDest = new gm.widgets.Button({ label: "Get Destination",
        callBack: getDestCB,
        parentElement: document.getElementById('getDest-button')
    });
    getDest.render();
    
    var setDestCB = function () {
    	gm.nav.setDestination(
    function(responseObj) {
        console.log('Success: setDestination.');
    },
    function() {
        console.log('Failure: setDestination.');
    },
    {
        "state" : "MI",
        "city" : "Detroit",
        "street" : "Campus Martius",
        "house": "1",
        "zip": "48226"
    }
);
    };
    
    var setDest = new gm.widgets.Button({ label: "Set Destination",
        callBack: setDestCB,
        parentElement: document.getElementById('setDest-button')
    });
    setDest.render();
    
    var watchFocusCB = function () {
    	watchFocusID = gm.system.watchFocus(
    function(focusEnum) {
        console.log('Success: watchFocus, Focus enum: ' + focusEnum);
    },
    function() {
        console.log('Failure: watchFocus');
    }
);
    };
    
    var watchFocus = new gm.widgets.Button({ label: "Watch Focus",
        callBack: watchFocusCB,
        parentElement: document.getElementById('watch-focus-button')
    });
    watchFocus.render();
    
    
    var clearFocusCB = function () {
    	if(typeof watchFocusID !== 'undefined') gm.system.clearFocus(watchFocusID);
    };
    
    var clearFocus = new gm.widgets.Button({ label: "Clear Focus",
        callBack: clearFocusCB,
        parentElement: document.getElementById('clear-focus-button')
    });
    clearFocus.render();
    
    
    
    
    
    var watchSpeedCB = function () {
    	watchSpeedID = gm.system.watchSpeed(
    function(speedEnum) {
        console.log('Success: watchSpeed. SpeedEnum: ' + speedEnum);
    },
    function() {
        console.log('Failure: watchSpeed.');
    }
);
    };
    
    var watchSpeed = new gm.widgets.Button({ label: "Watch Speed",
        callBack: watchSpeedCB,
        parentElement: document.getElementById('watch-speed-button')
    });
    watchSpeed.render();
    
    
    var clearSpeedCB = function () {
    	if(typeof watchSpeedID !== 'undefined') gm.system.clearSpeed(watchSpeedID);
    };
    
    var clearSpeed = new gm.widgets.Button({ label: "Clear Speed",
        callBack: clearSpeedCB,
        parentElement: document.getElementById('clear-speed-button')
    });
    clearSpeed.render();
    
    var getSpeedCB = function () {
    	console.log(gm.system.getSpeed());
    };
    
    var getSpeed = new gm.widgets.Button({ label: "Get Speed",
        callBack: getSpeedCB,
        parentElement: document.getElementById('get-speed-button')
    });
    getSpeed.render();
    
    var restartAppCB = function () {
    	gm.system.restartApp();
    };
    
    var restartApp = new gm.widgets.Button({ label: "Restart App",
        callBack: restartAppCB,
        parentElement: document.getElementById('restart-app-button')
    });
    restartApp.render();
    
    var closeAppCB = function () {
    	gm.system.closeApp();
    };
    
    var closeApp = new gm.widgets.Button({ label: "Close App",
        callBack: closeAppCB,
        parentElement: document.getElementById('close-app-button')
    });
    closeApp.render();
    
    var setShutdownCB = function () {
    	gm.system.setShutdown(
    function() {
        console.log('Success: setShutdown');
    },
    function() {
        console.log('Failure: setShutdown');
    }
);
    };
    
    var setShutdown = new gm.widgets.Button({ label: "Set Shutdown",
        callBack: setShutdownCB,
        parentElement: document.getElementById('set-shutdown-button')
    });
    setShutdown.render();
    
    
    
    // gm.system.requestFocus
    var requestFocusBtnCallBack = function(){
		gm.system.requestFocus(
		    function() {
		        console.log('Success: requestFocus');
		    },
		    function() {
		        console.log('Failure: requestFocus');
		    }
		);
	}
	var rfBtn = new gm.widgets.Button({"callBack":requestFocusBtnCallBack,"label":"requestFocus","parentElement":document.getElementById("request-focus")});
	rfBtn.render();
	
    // gm.system.releaseFocus
    var releaseFocusBtnCallBack = function(){
		gm.system.releaseFocus(
		    function() {
		        console.log('Success: releaseFocus');
		    },
		    function() {
		        console.log('Failure: releaseFocus!');
		    }
		);
	}
	var relfBtn = new gm.widgets.Button({"callBack":releaseFocusBtnCallBack,"label":"releaseFocus","parentElement":document.getElementById("release-focus")});
	relfBtn.render();
    
    // gm.system.changeFriendlyName
    var friendlyNameCount = 0;
	var changeFriendlyNameCallBack = function(){
		friendlyNameCount++;	
		var name = "New App Friendly Name " + String(friendlyNameCount);
			gm.system.changeFriendlyName(
			    name,
			    function() {
			        console.log('Failure: changeFriendlyName');
			    }
			);
	}
	var chngFrndlyNmBtn = new gm.widgets.Button({"callBack":changeFriendlyNameCallBack,"label":"changeFriendlyName","parentElement":document.getElementById("change-friendly-name")});
	chngFrndlyNmBtn.render();
    
    
    dataIsValidTF = new gm.widgets.TextField({
		value:"test",
		parentElement: document.getElementById('data-valid-input')
	});
    dataIsValidTF.render();
    
    var dataIsValidCB = function () {
    	console.log(gm.system.dataIsValid(dataIsValidTF.getValue()));
    };
    
    var dataIsValid = new gm.widgets.Button({ label: "Check data",
        callBack: dataIsValidCB,
        parentElement: document.getElementById('data-valid-button')
    });
    dataIsValid.render();
    
    var logEventCB = function () {
    	gm.util.logEvent("Info", "Test Log", function () {
    console.log("logEvent Success");
}, function () {
    console.log("logEvent Fail");
});
    	};
    
    var logEvent = new gm.widgets.Button({ label: "Log Event",
        callBack: logEventCB,
        parentElement: document.getElementById('log-event-button')
    });
    logEvent.render();
    
    var getResourceCB = function () {
    	gm.io.getResource(
    function(response){
        console.log('Success: getResource. Path: ' + response);
    },
    function(){
        console.log('Failure: getResource');
    },
    "myfile.txt",
    {
        "number": 0,
        "searchLocations": "all"
    }
);
    	};
    
    var getResource = new gm.widgets.Button({ label: "Get Resource",
        callBack: getResourceCB,
        parentElement: document.getElementById('get-resource-button')
    });
    getResource.render();
    
    var getVersionDispCB = function () {
    	console.log(gm.info.getVersionDisplayText());
    };
    
    var getVersionDisp = new gm.widgets.Button({ label: "Get Version Display",
        callBack: getVersionDispCB,
        parentElement: document.getElementById('get-versiondisplay-button')
    });
    getVersionDisp.render();
    
    var getMyVersionDispCB = function () {
    	console.log("MyVersion: " + gm.info.getMyVersion());
    };
    
    var getMyVersionDisp = new gm.widgets.Button({ label: "Get My Version",
        callBack: getMyVersionDispCB,
        parentElement: document.getElementById('get-myversion-button')
    });
    getMyVersionDisp.render();
    
    // other widget rewrites
    var new_cb01 = new gm.widgets.Checkbox({"label":"Checkbox","parentElement":document.getElementById("checkboxDiv")});
	var new_cb02 = new gm.widgets.Checkbox({"label":"Checkbox - checked","checked":"checked","parentElement":document.getElementById("checkboxDiv")});
	var new_cb03 = new gm.widgets.Checkbox({"label":"Checkbox checked & disabled","disabled":"true","checked":"checked","parentElement":document.getElementById("checkboxDiv")});
	new_cb01.render();
	new_cb02.render();
	new_cb03.render();
	
	var rbCallBack = function(){
		console.log("The radio button selection is now " + String(new_rb01.getValue()));
	};
	
	var new_rb01 = new gm.widgets.RadioButton({
		"label":"Test Radio Button Group",
		"groupName":"TestRadioButtonGroup",
		"callBack":rbCallBack,
		"parentElement":document.getElementById("radiobuttonDiv"),
		"choices":[
			{"label":"Option 01", "value":"option 01","checked":"checked"},
			{"label":"Option 02", "value":"option 02"},
			{"label":"Option 03","value":"option 03"},
			{"label":"Disabled Option 04","value":"option 04", "disabled":"disabled"},
			{"label":"Option 05","value":"option 05"},
			{"label":"Disabled Option 06","value":"option 06","disabled":"disabled"}
		]
	});
	new_rb01.render();

	var new_tf = new gm.widgets.TextField({"label":"Text Field","parentElement":document.getElementById("textfieldDiv")});
	new_tf.render();

	var new_pwf = new gm.widgets.PasswordField({"label":"Password Field","parentElement":document.getElementById("passwordDiv"),"inputType":"password"});
	new_pwf.render();

	var new_nf = new gm.widgets.NumberField({"label":"Numberfield","min":"0","max":"100","parentElement":document.getElementById("numberfieldDiv")});
	new_nf.render();   
}

// GM API CALLS

var audioHandle;

var play = function() {
	audioHandle = gm.media.play('test.mp3', 'mixedAudio');
	console.log('clicked');
};

var pause = function(e) {
	gm.media.pause(audioHandle);
};

var stop = function() {
	gm.media.stop(audioHandle);
};

var seek = function() {
	gm.media.seek(audioHandle, 30000);
};

var startTTS = function(args) {
	gm.voice.startTTS(function(){}, function(){}, ttsInput.getValue());
};

var callPhone = function(args) {
	gm.phone.dialPhoneNumber(function(){}, function(){}, { 
		phone: txtPhone.getValue(),  
		callParameters: { 
			"noiseSuppression": "Standard", 
			"phoneSource": "OnStar", 
			"deviceHandle": 123455
		} 
	});
};

var getRadio = function(args) {
	gm.info.getRadioInfo(function(data) {
		x$("#radio-output").inner(JSON.stringify(data));
	});
};

var getPosition = function() {
	gm.info.getCurrentPosition(function(pos){
		console.log('success');
		x$("#gps-output").html(pos.coords.latitude + "'" + pos.coords.longitude + "\"");
	}, function(args) {
		console.log('fail');
		x$("#gps-output").html("no gps data - load a route");
	}, {});
};

var watchPosition = function() {
	
	watchPositionID = gm.info.watchPosition(function(pos){
		console.log('success');
		x$("#watch-gps-output").html(pos.coords.latitude + "'" + pos.coords.longitude + "\"");
	}, function(args) {
		console.log('fail');
		x$("#watch-gps-output").html("no gps data - load a route");
	}, {});
};

var sendText = function(args) {
	gm.phone.sendTextMessage(
			function(){console.log('text success');}, 
			function(){console.log('text error');}, 
			{ 
				phone : textMsgNum.getValue(),
				message : textMsg.getValue()
			});
};

var writeFile = function(args) {
	var result = gm.io.writeFile(txtFilename.getValue(), txtContents.getValue());
	if (result == 11) {
		console.log('Successfully wrote to file');
	}
	else {
		console.log('Failed to write to file');
	}
};

var writeBinFile = function(args) {
	// TODO Change filename and contents.  Optionally add options.
	var result = gm.io.writeBinaryFile(txtBinFilename.getValue(), txtBinContents.getValue());
	if (result == 11) {
		console.log('Successfully wrote to file');
	}
	else {
		console.log('Failed to write to file');
	}
};

var readFile = function(args) {
	var result = gm.io.readFile(txtRead.getValue());
	if(typeof result === 'number') {
		console.log('Failed to read file');
	} else {
		alert('File contents: ' + result);
	}

};

var deleteFile = function(args) {
	var result = gm.io.deleteFile(txtDelete.getValue());
	if (result == 11) {
		console.log('Successfully deleted file');
	}
	else {
		console.log('Failed to delete file');
	}
};

var watchProx = function() {
	gm.info.watchProximity(function(isOn) {
		x$("#prox-output").inner(isOn == true ? 
				"Proximity triggered (user's hand is near)" :
				"Proximity off (user's hand not detected)"
		);
	});
};

var playVid = function() {
	gm.media.play("http://static.clipcanvas.com/sample/clipcanvas_14348_H264_640x360.mp4", "video");
};

var getConfig = function() {
	gm.info.getVehicleConfiguration(function(args) {
		x$("#vehicle-config-output").inner(JSON.stringify(args));
	});
};

var getVehicleData = function() {
	gm.info.getVehicleData(function(args) {
		x$("#vehicle-data-output").inner(JSON.stringify(args));
	});
};

var setFave = function() {
	gm.ui.setFavorite(function(faveId) {
		x$("#fave-output").inner("success, favorite Id: " + faveId);
	}, function() {
		x$("#fave-output").inner("failed");
	}, {
		title: "Nitobi Software",
		URL: "http://www.nitobi.com"
	});
};

var showAlert = function() {
	var alertOptions = {
			alertTitle : 'The Alert Title', 
			alertDetail : 'Some details about the alert.',
			primaryAction : function(){
				x$("#show-alert-output").inner("primary action clicked");
			},
			secondaryAction : function() {
				x$("#show-alert-output").inner("secondary action clicked");
			},
			primaryButtonText : 'OK',
			secondaryButtonText : 'Cancel' 
	};

	gm.ui.showAlert(function(){}, function(){}, alertOptions);
};

var setMenu = function() {
	gm.ui.setInteractionSelector(function() {
		console.log('error');
	}, menuOpts);
};

var menuOpts = {
	button1_type:"text",
	button1_text:"BUTTON ONE",
	button1_action: function(arg) { ok(true, "button 1 should get clicked once"); },
	button2_type:"icon",
	button2_text:"Icon.png",
	button2_action: function(arg) { console.log('button 2!' + arg);},
	button3_type:"text",
	button3_text:"BUTTON THREE",
	button3_action: function(arg) { console.log('button 3!' + arg);},
	button4_type:"text",
	button4_text:"BUTTON FOUR",
	button4_action: function(arg) { console.log('button 4!' + arg);},
	button5_type:"text",
	button5_text:"BUTTON FIVE",
	button5_action: function(arg) { console.log('button 5!' + arg);},
	button6_type:"text",
	button6_text:"BUTTON SIX",
	button6_action: function(arg) { console.log('button 6!' + arg);},
	button7_type:"text",
	button7_text:"BUTTON SEVEN",
	button7_action: function(arg) { console.log('button 7!' + arg);}
};

var showKeyboard = function() {
	var onDoneCallBack = function (data) {
		console.log('onDone called with -> ' + data.value);
	};

	var onCancelCallBack = function () {
		console.log('Canceled!');
	};

	var keyboard = new gm.widgets.Keyboard({sender: null, language: "en-US", kbType: 1, feedbackMode: 0, Theme:'gmc', placeholder:'Placeholder', onDone: onDoneCallBack, onCancel:onCancelCallBack});
};

var showKeyboardEmail = function() {
	var onDoneCallBack = function (data) {
		console.log('onDone called with -> ' + data.value);
	};

	var onCancelCallBack = function () {
		console.log('Canceled!');
	};
	var keyboardEmail = new gm.widgets.Keyboard({sender: null, language: "en-US", kbType: 2, feedbackMode: 0, Theme:'gmc', placeholder:'Placeholder', onDone: onDoneCallBack, onCancel:onCancelCallBack});
};

var showNumpad = function() {
	var onDoneCallBack = function (data) {
		console.log('onDone called with -> ' + data);
	};

	var onCancelCallBack = function () {
		console.log('Canceled!');
	};
	var numberpad = new gm.widgets.Numberpad({sender: null, language: "en-US",placeholder: "Placeholder", onDone: onDoneCallBack, onCancel:onCancelCallBack});
};

var showNumpadMult = function() {
	var numberpadMult = new gm.widgets.Numberpad({sender: 'numpadDiv', language: "en-US"});
};

var showKeyboardMult = function() {
	var keyboardMult = new gm.widgets.Keyboard({sender: 'keyboardDiv', language: "en-US", kbType:1, feedbackMode: 0, Theme: 'gmc'});
};

var watchDest = function () {
	gm.nav.watchDestination(function (dest) {
		console.log("Watch Destination Success -> "+ dest);
	}, function () {
		console.log("Watch Destination Failed");
	});
};

var clearDest = function () {
	gm.nav.clearDestination();
};

