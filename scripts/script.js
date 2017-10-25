window.onload = function() {

	//global variables:
	var lat;
	var long;
	var loc;
	var temp;
	var api;
	var apiKey = "appid=4b0e87c08f6783e9bc90e8e36b709a63";
	var units = "&units=metric&";
	var url;

	//getting DOM elements:

	var temperatureField = document.getElementById("temperature");
	var unitsC = document.getElementById("celsius");
	var image = document.getElementById("image");

	//mano Promise function:
	function get (url) {
		return new Promise (function(resolve, reject){
			var xhttp = new XMLHttpRequest();
			xhttp.open("GET", url, true);
			xhttp.onload =function () {
				if (xhttp.status == 200) {
					resolve(JSON.parse(xhttp.response));
				}else {
					reject(xhttp.statusText);
				}
			};
			xhttp.onerror = function () {
				reject(xhttp.statusText);
			};
				xhttp.send();
			});
		}

		//getting data from IP ir open weather apis

		var promise = get("http://ip-api.com/json");
			promise.then(function(locationData){

			loc = locationData.city;
			lat = locationData.lat;
			long = locationData.lon;
			api = "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long;
			url = api + units + apiKey;
			return get (url);

		}).then(function(weatherData){
			var location = document.getElementById("location");
			location.textContent = loc + ", " + weatherData.sys.country;
			temp = Math.round(weatherData.main.temp);
			temperatureField.textContent = temp;
			if (weatherData.weather[0].main == "Snow") {
            image.src = "images/snow.gif";
			}else if (weatherData.weather[0].main == "Clear") {
            image.src = "images/sunny.gif";
			}else if (weatherData.weather[0].main == "Clouds") {
            image.src = "images/cloudy.gif";
			} else if (weatherData.weather[0].main == "Rain" || weatherData.weather[0].main == "Drizzle" || weatherData.weather[0].main == "Thunderstorm") {
            image.src = "images/rain.gif";

			}
		}).catch(function(){
			var error = "Strange, we cannot find you! Please try again later!";
			alert(error);
		});	

	};






