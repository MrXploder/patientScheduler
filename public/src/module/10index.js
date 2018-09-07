(function(angular, undefined) {
'use strict';

angular.module('angularApp', ['ui.router', 'ngStorage', 'ngResource', 'ngDialog', 'ngAnimate', 'platanus.rut', 'angular-loading-bar', 'angularUtils.directives.dirPagination', 'angular-local-resource', 'focus-if', 'angularMoment', 'chart.js', 'ngNotify', 'templates-main'])

.constant('ENV', {shortSHA:'6a22f2d',lastCommitTime:'"2018-08-24 06:08:22 -0300"',lastCommitMessage:'"clean\'d up\r\n"',currentUser:'MrXploder',lastCommitNumber:'7',name:'development',SHA:'6a22f2dd94ffeb760c1df1b302e5f6d6eb01089a',lastCommitAuthor:'"MrXploder"'})

;
})(angular);