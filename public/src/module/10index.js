(function(angular, undefined) {
'use strict';

angular.module('angularApp', ['ui.router', 'ui.bootstrap', 'ui.select', 'ngStorage', 'ngResource', 'ngDialog', 'ngAnimate', 'ngSanitize', 'ngMessages', 'ngNotify', 'platanus.rut', 'angular-loading-bar', 'angularUtils.directives.dirPagination', 'templates-main'])

.constant('ENV', {currentUser:'MrXploder',SHA:'bb90774485095952ece0ddf8946c9710a13f085a',shortSHA:'bb90774',lastCommitTime:'"2018-09-07 16:59:38 -0300"',name:'master',lastCommitNumber:'1',lastCommitMessage:'"Initial commit\r\n"',lastCommitAuthor:'"MrXploder"'})

;
})(angular);