(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-3edb","chunk-50d1"],{HShi:function(t,a,e){},WFHM:function(t,a,e){"use strict";e.r(a);var n=e("uA/Y"),s=e.n(n),i=e("0rWU"),o={name:"DashboardEditor",components:{PanThumb:e("PLwA").a},data:function(){return{emptyGif:"https://wpimg.wallstcn.com/0e03b7da-db9e-4819-ba10-9016ddfdaed3"}},computed:s()({},Object(i.b)(["name","avatar","roles"]))},r=(e("opXu"),e("/VdH")),c=Object(r.a)(o,function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"dashboard-editor-container"},[e("div",{staticClass:" clearfix"},[e("pan-thumb",{staticStyle:{float:"left"},attrs:{image:t.avatar}},[t._v("\n      Your roles:\n      "),t._l(t.roles,function(a){return e("span",{key:a,staticClass:"pan-info-roles"},[t._v(t._s(a))])})],2),t._v(" "),e("github-corner",{staticStyle:{position:"absolute",top:"0px",border:"0",right:"0"}}),t._v(" "),e("div",{staticClass:"info-container"},[e("span",{staticClass:"display_name"},[t._v(t._s(t.name))]),t._v(" "),e("span",{staticStyle:{"font-size":"20px","padding-top":"20px",display:"inline-block"}},[t._v("Editor's Dashboard")])])],1),t._v(" "),e("div",[e("img",{staticClass:"emptyGif",attrs:{src:t.emptyGif}})])])},[],!1,null,"4107ff9b",null);c.options.__file="index.vue";a.default=c.exports},lAbF:function(t,a,e){"use strict";e.r(a);var n=e("uA/Y"),s=e.n(n),i=e("0rWU"),o=e("PyyF"),r=e("WFHM"),c={name:"Dashboard",components:{adminDashboard:o.default,editorDashboard:r.default},data:function(){return{currentRole:"adminDashboard"}},computed:s()({},Object(i.b)(["roles"])),created:function(){this.roles.includes("admin")||(this.currentRole="editorDashboard")}},d=e("/VdH"),l=Object(d.a)(c,function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"dashboard-container"},[a(this.currentRole,{tag:"component"})],1)},[],!1,null,null,null);l.options.__file="index.vue";a.default=l.exports},opXu:function(t,a,e){"use strict";var n=e("HShi");e.n(n).a}}]);