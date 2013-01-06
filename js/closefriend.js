var cf = {
	att_access:"939af17dd3b89136fecb25acd3236efb",
	access_token:"KLGGOIXSKQFH0RWDPW5UIKI1HZUP4533D31SUA4GKZ5YVPBB",
	clientID:"GITUUR0NOFQTYQ54NHGBGZSNXC1RZ4SQ0AODF0PV5QKVJTXC",
	mostRecent:0,
	friends:[],
	init:function(){
		gm.system.init();
		
		var url = 'http://a.tiles.mapbox.com/v3/dmt.map-cdkzgmkx.jsonp';  
	    cf.map = new L.Map('map', {zoomControl:false})  
	        .setView(new L.LatLng(37.774, -98.419), 4);
	      wax.tilejson(url, function(tilejson) {
	        cf.map.addLayer(new wax.leaf.connector(tilejson));
	      });
		
	     
		console.log("INIT");
		cf.watchLocation();
		//setInterval(cf.recentCheckins,60000);
		
		$("div.makecall").on("click", function(){
			cf.makeCall();
			
		});
		$("div.sendsms").on("click", function(){
			console.log("SEND SMS");
			cf.sendSMS();
			
		});
		$("div.dismisscontact").on("click", function(){
			$("div.contact").hide();
		});


	},
	connectAccount:function(){
		
		var url = "http://foursquare.com/oauth2/authenticate"+
		    "?client_id="+cf.clientID+
		    "&response_type=token"+
		    "&redirect_uri="+window.location.href;
		
		window.location = url; 
		
	},
	sendSMS:function(){
		console.log("IN SEND SMS");
		var url = "https://api.att.com/rest/sms/2/messaging/outbox";
		var data = {
			    "Message":"on my way",
			    "Address":"tel:5059206781" 
			};
		$.ajax(url, {type:"POST", 
				headers:{"Authorization":"Bearer "+cf.att_access, "Content-Type":"application/json", "Accept": "application/json"}, 
				data:JSON.stringify(data),
				success:function(data){
					console.log("sent txt", data);
				}});
		
	},
	makeCall:function(){
		var url = "https://api.att.com/rest/sms/2/messaging/outbox";
		var data = {
			    "Message":"a", 
			    "Address":"tel:5059206781" 
			};
		$.ajax(url, {type:"POST", 
				headers:{"Authorization":"Bearer "+cf.att_access, "Content-Type":"application/json", "Accept": "application/json"}, 
				data:JSON.stringify(data),
				success:function(data){
					console.log("sent txt", data);
				}});
		
	},
	recentCheckins:function(){
		
		var url = "https://api.foursquare.com/v2/checkins/recent?oauth_token="+cf.access_token+"&v=20130105";
		var data = {oauth_token:cf.access_token,v:"20130105"};
		if(cf.location){
			data.ll = cf.location.lat+","+cf.location.lon;
		}
		
		$.ajax(url, {data:data, success:function(data){
			console.log("got data", data);
			
			for(r in data.response.recent){
				var recent = data.response.recent[r];
				
				if(recent.venue.location.distance && recent.venue.location.distance <20000){
					console.log("close", recent);
					if(recent.createdAt > cf.mostRecent){
						cf.mostRecent = recent.createdAt;
						console.log("ALERT");
						cf.showAlert(recent);
					}
				}
				
			}
			
			
			cf.showMap(data);
			
		}});
		
	},
	showAlert:function(checkin){
		var alertOptions = {
				alertTitle : checkin.user.firstName+' '+checkin.user.lastName+' checked in at ' + checkin.venue.name, 
				alertDetail : 'Its only '+Math.round(checkin.venue.location.distance * 0.000621371)+' miles away',
				primaryAction : function(){
					gm.nav.setDestination(
						    function(responseObj) {
						        console.log('Success: setDestination.');
						        cf.showContact(checkin);
						        return true;
						    },
						    function(err) {
						        console.log('Failure: setDestination.', err);
						        return true;
						    },
						    {
						    	 "state" : checkin.venue.location.state,
						         "city" : checkin.venue.location.city,
						         "street" : checkin.venue.location.address,
						         //"house": "1",
						         "zip": checkin.venue.location.postalCode
						    	
								
						    }
						);
					return true;
				},
				secondaryAction : function() {
					console.log("secondary action clicked");
					return true;
				},
				primaryButtonText : 'Take me there',
				secondaryButtonText : 'Dismiss' 
		};

		gm.ui.showAlert(function(){}, function(){}, alertOptions);
		
	},
	showContact:function(){
		
		$("div.contact").show();
		
		
		
		
	},
	watchLocation:function(){
		cf.watchVehicleDataID = gm.info.watchVehicleData(
		    function(responseObj) {
		        console.log('Success: watchVehicleData ' , {lon:responseObj.gps_long/3600000, lat:responseObj.gps_lat/3600000});
		        cf.location = {lon:responseObj.gps_long/3600000, lat:responseObj.gps_lat/3600000};
		        
		        
		        if(cf.locTimeout){
		        	clearTimeout(cf.locTimeout);
		        }
		        cf.locTimeout = setTimeout(cf.foundLocation, 250);
		 
		    },
		    function(responseObj) {
		        console.log('Failure: watchVehicleData ', responseObj);
		    },
		    [
		        'gps_long',
		        'gps_lat'		    
		    ]
		);
	},
	foundLocation:function(){
		
		cf.recentCheckins();
		cf.centerMap();
	},
	centerMap:function(){
		console.log("CENTER", cf.location);
		if(cf.centerMarker){
			cf.map.removeLayer(cf.centerMarker);
			
		}

		cf.map.setZoom(13);
		cf.map.panTo([cf.location.lat, cf.location.lon]);
		
		console.log("current center", cf.map.getCenter());
		cf.centerMarker = L.marker([cf.location.lat, cf.location.lon]).addTo(cf.map);
		
	},
	showMap:function(data){
	   $("#map").show();
	   for(f in cf.friends){
		   cf.map.removeLayer(cf.friends[f]);
	   }
	   cf.friends =[];
	   for(r in data.response.recent){
		   var recent = data.response.recent[r];
		   
		   var userIcon = L.divIcon({className: 'venue-icon',
               iconAnchor:[25, 25],
               iconSize:[50,50],
               html:"<div class='marker'>"+
               "<img src='"+recent.user.photo.prefix+"100x100"+recent.user.photo.suffix+"' />"+
               "</div>"
              });

		   
		   var marker = L.marker([recent.venue.location.lat, recent.venue.location.lng], {icon:userIcon}).addTo(cf.map);
		   marker.checkin = recent;
		   marker.on("click", function(e){
			   	console.log("marker", e);
			   	cf.showCheckin(e.target.checkin);
		   });
		   cf.friends.push(marker);
	   }
		
	},
	showCheckin: function(checkin){
		$("div.user img").attr("src", checkin.user.photo.prefix+"100x100"+checkin.user.photo.suffix);
		$("div.user div.name").html(checkin.user.firstName+ " "+ checkin.user.lastName);
		$("div.user h2").html(checkin.venue.name);
		$("div.user div.description").html(checkin.venue.location.address + " " +
				checkin.venue.location.city+", "+checkin.venue.location.state);
		$("div.user").show();
	
		
		$("div.dismiss").on("click", function(){$("div.user").hide();});
		$("div.getdirections").on("click", function(){ 
			gm.nav.setDestination(
				    function(responseObj) {
				        console.log('Success: setDestination.');  
				    },
				    function(err) {
				        console.log('Failure: setDestination.', err);
				    },
				    {
				    	 "state" : checkin.venue.location.state,
				         "city" : checkin.venue.location.city,
				         "street" : checkin.venue.location.address,
				         //"house": "1",
				         "zip": checkin.venue.location.postalCode
				    	
						
				    }
				);
		});
	}

};


$(function(){
	cf.init();
});