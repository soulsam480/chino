function t(t){return t&&"object"==typeof t&&"default"in t?t:{default:t}}var e=/*#__PURE__*/t(require("axios"));function r(){return r=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var o in r)Object.prototype.hasOwnProperty.call(r,o)&&(t[o]=r[o])}return t},r.apply(this,arguments)}var o=0;function i(t){return"__private_"+o+++"_"+t}function n(t,e){if(!Object.prototype.hasOwnProperty.call(t,e))throw new TypeError("attempted to use private field on non-instance");return t}var s=["get","delete","head","options","post","put","patch"],a=/*#__PURE__*/i("options"),h=/*#__PURE__*/i("getLogMessage"),u=/*#__PURE__*/i("getPathAndMethod");function c(t){return"[Chino]: "+t}function d(t){if(!t.includes("#"))throw new Error(n(this,h)[h]("route method delimiter # is missing"));var e=t.split("#");if(2!==e.length)throw new Error(n(this,h)[h]("route should have both method and path"));if(!s.includes(e[0].toLowerCase()))throw new Error(n(this,h)[h]("invalid route method"));return e}exports.ChinoClient=/*#__PURE__*/function(){function t(t){Object.defineProperty(this,u,{value:d}),Object.defineProperty(this,h,{value:c}),this.axios=void 0,Object.defineProperty(this,a,{writable:!0,value:void 0}),n(this,a)[a]=t,this.axios=e.default.create(n(this,a)[a])}return t.prototype.fetch=function(t,e,o){void 0===o&&(o={});try{var i=n(this,u)[u](t),s=i[1];return Promise.resolve(this.axios.request(r({method:i[0],url:s.startsWith("/")?s:"/"+s},o,e)))}catch(t){return Promise.reject(t)}},t}();
//# sourceMappingURL=chino.js.map
