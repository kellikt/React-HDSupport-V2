<?php

session_start();
include "./do_auth.php";

if (isset($_SESSION["host"])) {
    $host = $_SESSION["host"];
} else {
    $host = "https://www.hawaii.edu/help/hdsupport/";
}

?>

<!doctype html><html lang="en"><head><meta charset="utf-8"/><link rel="shortcut icon" href="/help/hdsupport/dev/favicon.ico"/><meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no"/><meta name="theme-color" content="#000000"/><link rel="manifest" href="/help/hdsupport/dev/manifest.json"/><title>HDSupport</title><link href="/help/hdsupport/dev/static/css/1.47810393.chunk.css" rel="stylesheet"><link href="/help/hdsupport/dev/static/css/main.b220c4c6.chunk.css" rel="stylesheet"></head><body><noscript>You need to enable JavaScript to run this app.</noscript><div id="root"></div><script>!function(i){function e(e){for(var r,t,n=e[0],o=e[1],u=e[2],l=0,f=[];l<n.length;l++)t=n[l],a[t]&&f.push(a[t][0]),a[t]=0;for(r in o)Object.prototype.hasOwnProperty.call(o,r)&&(i[r]=o[r]);for(s&&s(e);f.length;)f.shift()();return c.push.apply(c,u||[]),p()}function p(){for(var e,r=0;r<c.length;r++){for(var t=c[r],n=!0,o=1;o<t.length;o++){var u=t[o];0!==a[u]&&(n=!1)}n&&(c.splice(r--,1),e=l(l.s=t[0]))}return e}var t={},a={2:0},c=[];function l(e){if(t[e])return t[e].exports;var r=t[e]={i:e,l:!1,exports:{}};return i[e].call(r.exports,r,r.exports,l),r.l=!0,r.exports}l.m=i,l.c=t,l.d=function(e,r,t){l.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:t})},l.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(r,e){if(1&e&&(r=l(r)),8&e)return r;if(4&e&&"object"==typeof r&&r&&r.__esModule)return r;var t=Object.create(null);if(l.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:r}),2&e&&"string"!=typeof r)for(var n in r)l.d(t,n,function(e){return r[e]}.bind(null,n));return t},l.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return l.d(r,"a",r),r},l.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},l.p="/help/hdsupport/dev/";var r=window.webpackJsonp=window.webpackJsonp||[],n=r.push.bind(r);r.push=e,r=r.slice();for(var o=0;o<r.length;o++)e(r[o]);var s=n;p()}([])</script><script src="/help/hdsupport/dev/static/js/1.978c83ba.chunk.js"></script><script src="/help/hdsupport/dev/static/js/main.758db346.chunk.js"></script></body></html>