import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-weather-report',
  templateUrl: './weather-report.component.html',
  styleUrls: ['./weather-report.component.css']
})
export class WeatherReportComponent implements OnInit {
  public city;
  public apiKey = "b9feb11dd0284ae1a415f94d50777169";
  public searchDone: boolean = false;
  public currentWeather;
  public weekWeather;
  public weatherDescription;
  public temperature;
  public place;
  public errorCity: boolean = false;;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  getCurrentWeather(city) {
    /* URL to get current weather data from APi*/
    let currentWeatherUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + this.apiKey;
    return this.http.get(currentWeatherUrl);
  }
  getWeekWeather(city) {
    /* URL to get weekly weather data from APi*/
    let weekWeatherData = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + this.apiKey;
    return this.http.get(weekWeatherData);
  }

  showWeather(city) {
    this.searchDone = false;
    this.errorCity = false;
    this.getCurrentWeather(city).subscribe(
      (data) => {
        this.currentWeather = data;
        console.log(this.currentWeather);
        this.weatherDescription = this.currentWeather.weather[0].main;
        this.temperature = this.currentWeather.main.temp;
        this.place = this.currentWeather.name;
      },
      err => {
        console.log(err);
        this.searchDone = false;
        this.errorCity = true;
      },
      () => {
        console.log("DONE");
      }
    );

    this.getWeekWeather(city).subscribe(
      (data) => {
        this.weekWeather = data;
        this.searchDone = true;
        console.log(this.weekWeather);
      },
      err => {
        console.log(err);
        this.searchDone = false;
        this.errorCity = true;
      },
      () => {
        console.log("DONE");
      }
    );
  }
}
