//Written by Ludvig Olausson
var data_lat;
var data_lon;
$(document).ready(function() {
	let baseUrl_bored = 'http://www.boredapi.com/api/activity';
	var Url_weather = 'http://api.weatherapi.com/v1/current.json';
	let weather_key = "808893812dfc447bb81132327200904";
	let type = "1";
	let wrapper = $('.wrapper');
	let text = $('.text');
	let forcaster = $('.forecaster_img');
	let ip_wrapper = $('.ip_wrapper');
		$.get('http://ip-api.com/json/?fields=61439', function(response) {
			data_lat = response.lat;
			data_lon = response.lon;
			$.get(
				Url_weather + '?key=' + weather_key + '&'+ 'q=' + data_lat + ',' + data_lon,
				function(response) {
					let temperature = response.current.temp_c;
					let temperature_f = response.current.temp_f;
					let icon = response.current.condition.code;
					let now = response.current.condition.text;
					let dayornight = response.current.is_day;
					let farenh = response.location.country;
						if(farenh != "United States of America"){
							ip_wrapper.html(temperature + "&#730;C");
						}else{
							ip_wrapper.html(temperature_f + "&#730;F");
						}
						$.get(
							baseUrl_bored + '?participants=' + type,
							function(response) {
								let activity = response.activity;
								if(dayornight === 0){
									forcaster.attr("src", "icons/night/" + icon + ".png");
									wrapper.html("Sleep");
									$('head').append('<link rel="stylesheet" href="style.css">');
									$('head').append('<link rel="stylesheet" href="style_night.css">');
								}else{
									forcaster.attr("src", "icons/" + icon + ".png");
									wrapper.html(activity);
									$('head').append('<link rel="stylesheet" href="style.css">');
								}
							},
							'json'
						),
						text.html(now);
				},
				'json'
			)
		})
	})
