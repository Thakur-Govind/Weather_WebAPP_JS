$(document).ready(function(){
	$('.short').hide()
	if (navigator.geolocation)
	{
		var currentPosition = '';
		navigator.geolocation.getCurrentPosition(function(position){
			currentPosition = position;
			var lat = currentPosition.coords.latitude
			var long = currentPosition.coords.longitude
			// console.log(lat, long);
			// console.log(currentPosition);
			var url = 'http://api.weatherstack.com/current?access_key=b3b244a8e42c5297ba0439c97b884029&query='
			$.getJSON(url+lat+','+long, function(data){
				$('.short').show();
				//console.log(data)
				var data = JSON.stringify(data);
				var json = JSON.parse(data);
				var country = json.location.country;
				var city = json.location.name;
				var state = json.location.region;
				var temp = json.current.temperature;
				var tempf = 1.8*temp + 32;
				//var last_up = json.current.last_updated.replace("-". " ");
				var wind = json.current.wind_speed
				var humid = json.current.humidity;
				var time = json.location.localtime.split(' ')[1];
				var cloud = json.current.cloudcover;
				console.log(data);
				$('#weather').html(city + ", " + state + ", " + country);
				$('#info1').html(time);
				$('#info2').html(wind + "km/hour");
				$('#info3').html(temp + '&#8451');
				var yes = true;
				$('#switch').on("click",function(){
					if(yes){
						$("#info3").html(tempf + '&#8457');
						yes = false;
						$("#switch").html("Show in degree Celcuis");
					}
					else{
						$('#info3').html(temp + '&#8451');
						yes = true;
						$("#switch").html("Show in degree Farenheit");		
					}

				});
				if (cloud <= 30){
						$('#info5').html('Clear Sky');
					}
					else
					{
						$('#info5').html('Cloudy Sky');
					}
					$('#info6').html("Humidity: " + humid + "%");

			});

		});
	}
});

