import angular from 'angular';
import 'angular-ui-router';
import 'angular-material';
import ngScrollable from '../bower_components/ngScrollable/min/ng-scrollable.min.js';
import HomeController from './home/home.controller.js';
import MovieController from './movie/movie.controller.js';
import 'angular-sanitize';
import 'videogular';
import 'videogular-controls';
import 'videogular-buffering';
import 'videogular-overlay-play';





let app = angular.module('myApp',['ui.router','ngMaterial','ngScrollable','ngSanitize',
			'com.2fdevs.videogular',
			'com.2fdevs.videogular.plugins.controls',
			'com.2fdevs.videogular.plugins.overlayplay',
			'com.2fdevs.videogular.plugins.buffering'
			]);

app.config(($stateProvider,$urlRouterProvider,$locationProvider)=>{
  $stateProvider.state('home',{
    url:'/',
    template: require('./home/home.html'),
    controller: HomeController,
    params: {
      magnetUri: 'null'
    }
  }).state('movie',{
    url:'/movie/:magnetUri',
    template: require('./movie/movie.html'),
    controller: MovieController,
    params:{
      magnetUri: null
    }
  });

  $urlRouterProvider.otherwise('/');
});



export default app;
