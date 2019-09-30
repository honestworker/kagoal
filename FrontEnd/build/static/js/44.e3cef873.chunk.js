(window["webpackJsonpportal-react"]=window["webpackJsonpportal-react"]||[]).push([[44],{1058:function(e,a,t){e.exports={"portal-profile":"profile_portal-profile__JbjeW","portal-profile-before":"profile_portal-profile-before__xZdMV","portal-profile-after":"profile_portal-profile-after__1kdTz",panel:"profile_panel__30lr_","portal-login":"profile_portal-login__2bCDk","portal-profile__header":"profile_portal-profile__header__1BMkp","portal-profile__header-avatar":"profile_portal-profile__header-avatar__1M3Zy","portal-profile__content":"profile_portal-profile__content__3bmFR",card:"profile_card__EqFnp","card-content":"profile_card-content__3L8ml","card-actions":"profile_card-actions__1_Vpm"}},1121:function(e,a,t){"use strict";t.r(a);var n=t(7),r=t(6),l=t(10),o=t(11),i=t(12),s=t(0),c=t.n(s),m=t(20),d=t.n(m),p=t(24),u=t.n(p),h=t(399),f=t(528),E=t(434),g=t(380),b=t(453),w=t(385),v=t(394),_=t(51),x=t(5);function y(e,a){var t=parseInt(e.slice(1),16),n=a<0?0:255,r=a<0?-1*a:a,l=t>>16,o=t>>8&255,i=255&t;return"#"+(16777216+65536*(Math.round((n-l)*r)+l)+256*(Math.round((n-o)*r)+o)+(Math.round((n-i)*r)+i)).toString(16).slice(1)}var C=function(e){return{background:{background:y(e.palette.secondary.main,.22),"&:before":{background:y(e.palette.secondary.main,.12)},"&:after":{background:e.palette.secondary.main},overflow:"auto",color:"#fff"}}},N=t(1058),k=t.n(N),O=t(17),S=t(147),j=t.n(S),W=t(378),P=t(977),q=t(397),F=t(386),T=t(392),I=t(581),M=t.n(I),z=t(1060),L=t.n(z),V=t(163),D=t.n(V),A=t(1061),B=t.n(A),J=t(585),U=t.n(J),Z=t(168),G=t.n(Z),H=t(1062),R=t.n(H),K=t(1059),Q=t.n(K),X=t(1063),Y=t.n(X),$=t(1127);function ee(e){var a=e.children,t=e.dir;return c.a.createElement(_.a,{component:"div",dir:t,style:{padding:24}},a)}var ae=function(e){function a(){var e,t;Object(n.a)(this,a);for(var r=arguments.length,i=new Array(r),s=0;s<r;s++)i[s]=arguments[s];return(t=Object(l.a)(this,(e=Object(o.a)(a)).call.apply(e,[this].concat(i)))).state={value:0,name:"Christos",lastname:"Pantazis",email:"info@oxygenna.com",password:"",newpassword:"",confirmpassword:""},t.handleChange=function(e){return function(a){t.setState(Object(O.a)({},e,a.target.value),function(){t.props.isEnabled(t.state.name,t.state.lastname,t.state.email)})}},t.handleTabChange=function(e,a){t.setState({value:a})},t.handleChangeIndex=function(e){t.setState({value:e})},t}return Object(i.a)(a,e),Object(r.a)(a,[{key:"validate",value:function(e,a,t){return{name:0===e.length,lastname:0===a.length,email:0===t.length}}},{key:"validatePassword",value:function(e,a,t){return{password:0===e.length,newPassword:0===a.length,confirmPassword:0===t.length}}},{key:"render",value:function(){var e=this.props,a=e.classes,t=e.theme,n=this.state,r=n.name,l=n.lastname,o=n.email,i=n.password,s=n.newpassword,m=n.confirmpassword,d=this.validate(r,l,o),p=this.validatePassword(i,s,m);return c.a.createElement("div",{className:a.root},c.a.createElement(W.a,{position:"static",color:"default"},c.a.createElement(q.a,{value:this.state.value,onChange:this.handleTabChange,indicatorColor:"primary",textColor:"secondary",fullWidth:!0},c.a.createElement(F.a,{className:a.tabLabel,label:"Profile",icon:c.a.createElement(M.a,null)}),c.a.createElement(F.a,{className:a.tabLabel,label:"Change Password",icon:c.a.createElement(Q.a,null)}),c.a.createElement(F.a,{className:a.tabLabel,label:"Notifications",icon:c.a.createElement(G.a,null)}))),c.a.createElement(j.a,{axis:"rtl"===t.direction?"x-reverse":"x",index:this.state.value,onChangeIndex:this.handleChangeIndex},c.a.createElement(ee,{dir:t.direction},c.a.createElement("form",{className:a.container,autoComplete:"off"},c.a.createElement(E.a,{container:!0},c.a.createElement(E.a,{item:!0,sm:6,xs:12},c.a.createElement($.a,{id:"name",label:"Enter your first name",className:a.textField,error:d.name,value:r,onChange:this.handleChange("name"),fullWidth:!0,variant:"outlined",required:!0,margin:"normal"}),d.name&&c.a.createElement(P.a,{error:!0},"This is a required field")),c.a.createElement(E.a,{item:!0,sm:6,xs:12},c.a.createElement($.a,{id:"lastname",label:"Enter your last name",className:a.textField,error:d.lastname,value:l,onChange:this.handleChange("lastname"),fullWidth:!0,variant:"outlined",required:!0,margin:"normal"}),d.lastname&&c.a.createElement(P.a,{error:!0},"We also need your last name")),c.a.createElement(E.a,{item:!0,xs:12},c.a.createElement($.a,{id:"email",label:"Enter your email address",className:a.textField,error:d.email,value:o,onChange:this.handleChange("email"),fullWidth:!0,variant:"outlined",required:!0,margin:"normal"}),d.email&&c.a.createElement(P.a,{error:!0},"Please enter your email")),c.a.createElement(E.a,{item:!0,xs:12},c.a.createElement($.a,{id:"location",label:"Enter your location",className:a.textField,defaultValue:"Sitia, Crete, Greece",fullWidth:!0,variant:"outlined",margin:"normal"})),c.a.createElement(E.a,{item:!0,xs:12},c.a.createElement($.a,{id:"website",label:"Website",className:a.textField,defaultValue:"http://www.oxygenna.com",fullWidth:!0,variant:"outlined",margin:"normal"})),c.a.createElement(E.a,{item:!0,xs:12},c.a.createElement($.a,{id:"description",label:"Describe yourself in 255 characters",className:a.textField,defaultValue:"We are a small creative web design agency who are passionate with our pixels.",fullWidth:!0,variant:"outlined",multiline:!0,rowsMax:"4",rows:"4",margin:"normal"}))))),c.a.createElement(ee,{dir:t.direction},c.a.createElement("form",{className:a.container,autoComplete:"off"},c.a.createElement(E.a,{container:!0},c.a.createElement(E.a,{item:!0,xs:12},c.a.createElement($.a,{id:"password",label:"Current password",className:a.textField,error:p.password,value:i,type:"password",onChange:this.handleChange("password"),fullWidth:!0,variant:"outlined",required:!0,margin:"normal"}),p.password&&c.a.createElement(P.a,{error:!0},"This is a required field")),c.a.createElement(E.a,{item:!0,xs:12},c.a.createElement($.a,{id:"newpassword",label:"New password",className:a.textField,error:p.newPassword,value:s,type:"password",onChange:this.handleChange("newpassword"),fullWidth:!0,variant:"outlined",required:!0,margin:"normal"}),p.newPassword&&c.a.createElement(P.a,{error:!0},"This is a required field")),c.a.createElement(E.a,{item:!0,xs:12},c.a.createElement($.a,{id:"confirmpassword",label:"Confirm password",className:a.textField,error:p.confirmPassword,value:m,type:"password",onChange:this.handleChange("confirmpassword"),fullWidth:!0,variant:"outlined",required:!0,margin:"normal"}),p.confirmPassword&&c.a.createElement(P.a,{error:!0},"This is a required field"))))),c.a.createElement(ee,{dir:t.direction},c.a.createElement(E.a,{container:!0,direction:"row"},c.a.createElement(E.a,{item:!0,sm:6,xs:12},c.a.createElement("div",{className:a.toggleContainer},c.a.createElement(D.a,{color:"secondary"}),c.a.createElement(T.a,null),c.a.createElement(_.a,{component:"p"},"Show my location"))),c.a.createElement(E.a,{item:!0,sm:6,xs:12},c.a.createElement("div",{className:a.toggleContainer},c.a.createElement(L.a,{color:"secondary"}),c.a.createElement(T.a,{checked:"true"}),c.a.createElement(_.a,{component:"p"},"Show my avatar"))),c.a.createElement(E.a,{item:!0,sm:6,xs:12},c.a.createElement("div",{className:a.toggleContainer},c.a.createElement(B.a,{color:"secondary"}),c.a.createElement(T.a,{checked:"true"}),c.a.createElement(_.a,{component:"p"},"Show my connections"))),c.a.createElement(E.a,{item:!0,sm:6,xs:12},c.a.createElement("div",{className:a.toggleContainer},c.a.createElement(U.a,{color:"secondary"}),c.a.createElement(T.a,{checked:"true"}),c.a.createElement(_.a,{component:"p"},"Show social links"))),c.a.createElement(E.a,{item:!0,sm:6,xs:12},c.a.createElement("div",{className:a.toggleContainer},c.a.createElement(R.a,{color:"secondary"}),c.a.createElement(T.a,null),c.a.createElement(_.a,{component:"p"},"Send Notifications"))),c.a.createElement(E.a,{item:!0,sm:6,xs:12},c.a.createElement("div",{className:a.toggleContainer},c.a.createElement(Y.a,{color:"secondary"}),c.a.createElement(T.a,null),c.a.createElement(_.a,{component:"p"},"Allow cloud backups")))))))}}]),a}(c.a.Component),te=Object(x.a)(function(e){return{root:{width:"100%",height:"100%",overflow:"hidden"},container:{display:"flex",flexWrap:"wrap"},tabLabel:{maxWidth:"100%",textTransform:"capitalize"},toggleContainer:{flexDirection:"row",boxSizing:"border-box",display:"flex",alignItems:"center"}}},{withTheme:!0})(ae),ne=function(e){function a(){var e,t;Object(n.a)(this,a);for(var r=arguments.length,i=new Array(r),s=0;s<r;s++)i[s]=arguments[s];return(t=Object(l.a)(this,(e=Object(o.a)(a)).call.apply(e,[this].concat(i)))).state={isEnabled:!0,snackbarOpen:!1,snackbarMessage:""},t.onSnackbarOpen=function(){t.setState({snackbarOpen:!0})},t.onSnackbarClose=function(){t.setState({snackbarOpen:!1})},t.checkIfEnabled=function(e,a,n){e&&a&&n?t.setState({isEnabled:!0}):t.setState({isEnabled:!1})},t}return Object(i.a)(a,e),Object(r.a)(a,[{key:"render",value:function(){var e=this,a=this.props.classes,t=this.state.isEnabled,n=c.a.createElement(f.a,{anchorOrigin:{vertical:"bottom",horizontal:"center"},open:this.state.snackbarOpen,autoHideDuration:3e3,onClose:this.onSnackbarClose,ContentProps:{"aria-describedby":"message-id"},message:c.a.createElement("span",{id:"message-id"},"Settings Updated")});return c.a.createElement(E.a,{container:!0,direction:"row",spacing:0,justify:"center",alignItems:"center",className:u()(k.a["portal-profile"],a.background)},c.a.createElement(E.a,{item:!0,sm:10,xs:12,className:k.a.panel},c.a.createElement(E.a,{direction:"column",container:!0,spacing:10},c.a.createElement(E.a,{item:!0,xs:12},c.a.createElement(E.a,{container:!0,direction:"row",spacing:0,justify:"center",alignItems:"center"},c.a.createElement(E.a,{item:!0,xs:12},c.a.createElement("div",{className:k.a["portal-profile__header"]},c.a.createElement("img",{alt:"avatar",src:"assets/images/avatars/male/16.jpg",className:k.a["portal-profile__header-avatar"]}),c.a.createElement("div",null,c.a.createElement(_.a,{variant:"h6",gutterBottom:!0},"Profile / Christos"),c.a.createElement(_.a,{variant:"subtitle2",gutterBottom:!0},"Edit your perfonal information, change your password and set your privacy settings here.")))))),c.a.createElement(E.a,{item:!0,xs:12},c.a.createElement("div",{className:k.a["portal-profile__content"]},c.a.createElement(g.a,{className:k.a.card},c.a.createElement(w.a,{className:k.a["card-content"]},c.a.createElement(E.a,{container:!0},c.a.createElement(te,{isEnabled:this.checkIfEnabled}))),c.a.createElement(b.a,{className:k.a["card-actions"]},c.a.createElement(v.a,{disabled:!t,variant:"contained",color:"secondary",onClick:function(){return e.onSnackbarOpen()}},"Update Settings"))))))),n)}}]),a}(c.a.Component);a.default=d()(Object(h.a)(),Object(x.a)(C,{withTheme:!0}))(ne)}}]);
//# sourceMappingURL=44.e3cef873.chunk.js.map