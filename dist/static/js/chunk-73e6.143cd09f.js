(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-73e6"],{"2H1g":function(t,n,e){"use strict";var i=e("ElNR");e.n(i).a},ElNR:function(t,n,e){},n2xe:function(t,n,e){"use strict";e.r(n);var i={data:function(){return{src:"",loading:null}},watch:{$route:{}},mounted:function(){this.resetSrc(this.$store.state.iframe.iframeUrl)},methods:{resetSrc:function(t){this.src=t,this.load()},load:function(){this.loading=this.$loading({lock:!0,text:"loading...",spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.5)",target:document.querySelector("#main-container ")})},onloaded:function(){this.loading&&this.loading.close()}}},o=(e("2H1g"),e("/VdH")),a=Object(o.a)(i,function(){var t=this.$createElement,n=this._self._c||t;return n("div",{staticClass:"iframe-container"},[n("iframe",{staticClass:"frame",attrs:{src:this.src,scrolling:"auto",frameborder:"0",onload:this.onloaded()}})])},[],!1,null,null,null);a.options.__file="IFrame.vue";n.default=a.exports}}]);