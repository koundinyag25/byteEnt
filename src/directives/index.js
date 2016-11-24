import angular from 'angular';

let directives = angular.module('directives',[]);

import videoDirective from './video.directive.js';
directives.directive('videoDirectives',videoDirective);




export default directives;
