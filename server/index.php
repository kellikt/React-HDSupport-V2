<?php

// server should keep session data for AT LEAST 4 hours
ini_set('session.gc_maxlifetime', 14400);

// each client should remember their session id for EXACTLY 4 hours
session_set_cookie_params(14400);

session_start();
include "./do_auth.php";

if (isset($_SESSION["host"])) {
    $host = $_SESSION["host"];
} else {
    $host = "https://www.hawaii.edu/help/hdsupport/";
}

?>

<!doctype html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no"/><meta name="theme-color" content="#000000"/><link rel="manifest" href="/help/hdsupport/dev4/manifest.json"/><title>HDSupport</title><link href="/help/hdsupport/dev4/static/css/1.bd779434.chunk.css" rel="stylesheet"><link href="/help/hdsupport/dev4/static/css/main.30d5aca2.chunk.css" rel="stylesheet"></head><body><noscript>You need to enable JavaScript to run this app.</noscript><div id="root"></div><script>!function(p){function e(e){for(var r,t,n=e[0],o=e[1],u=e[2],i=0,l=[];i<n.length;i++)t=n[i],a[t]&&l.push(a[t][0]),a[t]=0;for(r in o)Object.prototype.hasOwnProperty.call(o,r)&&(p[r]=o[r]);for(d&&d(e);l.length;)l.shift()();return c.push.apply(c,u||[]),f()}function f(){for(var e,r=0;r<c.length;r++){for(var t=c[r],n=!0,o=1;o<t.length;o++){var u=t[o];0!==a[u]&&(n=!1)}n&&(c.splice(r--,1),e=i(i.s=t[0]))}return e}var t={},a={2:0},c=[];function i(e){if(t[e])return t[e].exports;var r=t[e]={i:e,l:!1,exports:{}};return p[e].call(r.exports,r,r.exports,i),r.l=!0,r.exports}i.m=p,i.c=t,i.d=function(e,r,t){i.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:t})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(r,e){if(1&e&&(r=i(r)),8&e)return r;if(4&e&&"object"==typeof r&&r&&r.__esModule)return r;var t=Object.create(null);if(i.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:r}),2&e&&"string"!=typeof r)for(var n in r)i.d(t,n,function(e){return r[e]}.bind(null,n));return t},i.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(r,"a",r),r},i.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},i.p="/help/hdsupport/dev4/";var r=window.webpackJsonp=window.webpackJsonp||[],n=r.push.bind(r);r.push=e,r=r.slice();for(var o=0;o<r.length;o++)e(r[o]);var d=n;f()}([])</script><script src="/help/hdsupport/dev4/static/js/1.6a8bf78a.chunk.js"></script><script src="/help/hdsupport/dev4/static/js/main.6878e74d.chunk.js"></script></body></html>