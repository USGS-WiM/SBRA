function addCommas(e){e+="";for(var a=e.split("."),t=a[0],i=a.length>1?"."+a[1]:"",o=/(\d+)(\d{3})/;o.test(t);)t=t.replace(o,"$1,$2");return t+i}function camelize(e){return e.replace(/(?:^\w|[A-Z]|\b\w)/g,function(e,a){return 0==a?e.toLowerCase():e.toUpperCase()}).replace(/\s+/g,"")}!function(e){e.fn.confirmModal=function(a){function t(e,a){}var i=e("body"),o={confirmTitle:"Please confirm",confirmMessage:"Are you sure you want to perform this action ?",confirmOk:"Yes",confirmCancel:"Cancel",confirmDirection:"rtl",confirmStyle:"primary",confirmCallback:t,confirmDismiss:!0,confirmAutoOpen:!1},s=e.extend(o,a),r='<div class="modal fade" id="#modalId#" tabindex="-1" role="dialog" aria-labelledby="#AriaLabel#" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><h3>#Heading#</h3></div><div class="modal-body"><p>#Body#</p></div><div class="modal-footer">#buttonTemplate#</div></div></div></div>';return this.each(function(a){var t=e(this),o=t.data(),n=(e.extend(s,o),"confirmModal"+Math.floor(1e9*Math.random())),l=r,c='<button class="btn btn-default" data-dismiss="modal">#Cancel#</button><button class="btn btn-#Style#" data-dismiss="ok">#Ok#</button>';"ltr"==s.confirmDirection&&(c='<button class="btn btn-#Style#" data-dismiss="ok">#Ok#</button><button class="btn btn-default" data-dismiss="modal">#Cancel#</button>');var d=s.confirmTitle;"function"==typeof s.confirmTitle&&(d=s.confirmTitle.call(this));var m=s.confirmMessage;"function"==typeof s.confirmMessage&&(m=s.confirmMessage.call(this)),l=l.replace("#buttonTemplate#",c).replace("#modalId#",n).replace("#AriaLabel#",d).replace("#Heading#",d).replace("#Body#",m).replace("#Ok#",s.confirmOk).replace("#Cancel#",s.confirmCancel).replace("#Style#",s.confirmStyle),i.append(l);var p=e("#"+n);t.on("click",function(e){e.preventDefault(),p.modal("show")}),e('button[data-dismiss="ok"]',p).on("click",function(e){s.confirmDismiss&&p.modal("hide"),s.confirmCallback(t,p)}),s.confirmAutoOpen&&p.modal("show")})}}(jQuery);var allLayers;require(["esri/geometry/Extent","esri/layers/WMSLayerInfo","esri/layers/FeatureLayer","dojo/domReady!"],function(e,a,t){allLayers=[]}),function(){"use strict"}();var sbra=sbra||{bookmarks:[],globals:{mapCenter:[-83.6884,43.7919]}},map,zonalStatsGP,maxLegendHeight,maxLegendDivHeight,printCount=0,storageName="esrijsapi_mapmarks",mapLayers=[],mapLayerIds=[];require(["esri/map","esri/dijit/OverviewMap","esri/SnappingManager","esri/dijit/HomeButton","esri/dijit/LocateButton","esri/dijit/Measurement","esri/dijit/Bookmarks","esri/layers/ArcGISTiledMapServiceLayer","esri/dijit/Search","esri/dijit/Popup","esri/dijit/PopupTemplate","esri/graphic","esri/geometry/Multipoint","esri/symbols/PictureMarkerSymbol","esri/geometry/webMercatorUtils","esri/tasks/GeometryService","esri/tasks/PrintTask","esri/tasks/PrintParameters","esri/tasks/PrintTemplate","esri/tasks/LegendLayer","esri/SpatialReference","esri/geometry/Extent","esri/config","esri/urlUtils","esri/request","dojo/_base/array","dojo/_base/lang","dojo/keys","dojo/cookie","dojo/has","dojo/dom","dojo/dom-class","dojo/dom-construct","dojo/on","dojo/domReady!"],function(e,a,t,i,o,s,r,n,l,c,d,m,p,u,g,h,b,y,v,f,k,L,S,w,x,C,M,I,B,T,A,D,R,z){function O(){if(U){var e=[];C.forEach(sbra.bookmarks,function(a){a.userCreated===!1&&e.push(a.id)});for(var a=sbra.bookmarks.slice(),t=0;t<a.length;t++){var i=a[t];-1!==e.indexOf(i.id)&&(a.splice(t,1),t--)}console.log(a);var o=JSON.stringify(a);window.localStorage.setItem(storageName,o)}else{var s=7;B(storageName,dojo.toJson(sbra.bookmarks),{expires:s})}}function E(){U?window.localStorage.removeItem(storageName):dojo.cookie(storageName,null,{expires:-1});var e=[];C.forEach(sbra.bookmarks,function(a){a.userCreated===!0&&e.push(a.id)});for(var a=0;a<sbra.bookmarks.length;a++){var t=sbra.bookmarks[a];-1!==e.indexOf(t.id)&&(sbra.bookmarks.splice(a,1),a--)}C.forEach(e,function(e){$("#"+e).remove()})}function G(){try{return"localStorage"in window&&null!==window.localStorage}catch(e){return!1}}function j(){$("#shareModal").modal("show");var e=map.extent,a="?xmax="+e.xmax.toString()+"&xmin="+e.xmin.toString()+"&ymax="+e.ymax.toString()+"&ymin="+e.ymin.toString(),t="%3Fxmax="+e.xmax.toString()+"%26xmin="+e.xmin.toString()+"%26ymax="+e.ymax.toString()+"%26ymin="+e.ymin.toString(),i="https://glcwra.wim.usgs.gov/SBRA/",o=i+a,s=i+t;console.log("Share URL is:"+o),$("#showFullLinkButton").click(function(){$("#fullShareURL").html('<span id="fullLinkLabel" class="label label-default"><span class="glyphicon glyphicon-link"></span> Full link</span><br><textarea style="margin-bottom: 10px; cursor: text" class="form-control"  rows="3" readonly>'+o+"</textarea>")}),$("#showShortLinkButton").click(function(){$.ajax({dataType:"json",type:"GET",url:"https://api-ssl.bitly.com/v3/shorten?access_token=e1a16076cc8470c65419920156e0ae2c4f77850f&longUrl="+s,headers:{Accept:"*/*"},success:function(e){var a=e.data.url;$("#bitlyURL").html('<span class="label label-default"><span class="glyphicon glyphicon-link"></span> Bitly link</span><code>'+a+"</code>")},error:function(e){$("#bitlyURL").html('<i class="fa fa-exclamation-triangle"></i> An error occurred retrieving shortened Bitly URL')}})})}function P(){$("#printModal").modal("show")}function F(){$("#bookmarkModal").modal("show")}function V(){function e(e){printCount++;var a=$("<p><label>"+printCount+': </label>&nbsp;&nbsp;<a href="'+e.url+'" target="_blank">'+l+" </a></p>");$("#printJobsDiv").find("p.toRemove").remove(),$("#printModalBody").append(a),$("#printTitle").val(""),$("#printExecuteButton").button("reset")}function a(e){alert("Sorry, an unclear print error occurred. Please try refreshing the application to fix the problem"),$("#printExecuteButton").button("reset")}var t=new y;t.map=map;var i=new v;i.exportOptions={width:500,height:400,dpi:300};var o=map.getZoom(),s="";o>=9&&(s="9"),o>=11&&(s="11"),o>=15&&(s="15"),i.showAttribution=!1,i.format="PDF",i.layout="Letter ANSI A LandscapeGLCWRA"+s,i.preserveScale=!1;var r=new f;r.layerId="normalized",r.subLayerIds=[0];var n=$("#printTitle").val();""===n?i.layoutOptions={titleText:"Saginaw Bay Restoration Assessment - Provisional Data",authorText:"Saginaw Bay Restoration Assessment (SBRA)",copyrightText:"This page was produced by the SBRA web application at glcwra.wim.usgs.gov/sbra",legendLayers:[r]}:i.layoutOptions={titleText:n+" - Provisional Data",authorText:"Saginaw Bay Restoration Assessment (SBRA)",copyrightText:"This page was produced by the SBRA web application at glcwra.wim.usgs.gov/sbra",legendLayers:[r]};var l=i.layoutOptions.titleText;t.template=i;var c=new b("https://gis.wim.usgs.gov/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task");c.execute(t,e,a)}function N(){var e=$("#bookmarkTitle"),a=map.extent.toJson(),t=e.val();if(t.length>0){var i=t.toLowerCase().replace(/ /g,"-");a.name=t,a.id=i,a.userCreated=!0,sbra.bookmarks.push(a);var o=i+"_delete",s=$('<tr id="'+i+'"><td  class="bookmarkTitle td-bm">'+t+'</td><td class="text-right text-nowrap"> <button id="'+o+'" class="btn btn-xs btn-warning bookmarkDelete" data-toggle="tooltip" data-placement="top" > <span class="glyphicon glyphicon-remove"></span> </button> </td> </tr>');$("#bookmarkList").append(s),$("#"+o).confirmation({placement:"left",title:"Delete this bookmark?",btnOkLabel:"Yes",btnCancelLabel:"Cancel",popout:!0,onConfirm:function(){$("#"+i).remove();for(var e=0;e<sbra.bookmarks.length;e++){var a=sbra.bookmarks[e];-1!==i.indexOf(a.id)&&sbra.bookmarks.splice(e,1)}O()}}),e.val(""),O(),$("#bmAlert").hide(),$("#bookmarkModal").modal("hide")}else $("#bmAlert").show()}function H(){var e=esri.urlToObject(document.location.href);if(e.query){var a=new L(parseFloat(e.query.xmin),parseFloat(e.query.ymin),parseFloat(e.query.xmax),parseFloat(e.query.ymax),new k({wkid:102100}));map.setExtent(a);var t=document.location.href,i=t.substring(0,t.indexOf("?"));history.pushState(null,"",i)}}var U=G(),q=new c({},R.create("div"));D.add(q.domNode),map=new e("mapDiv",{basemap:"gray",center:sbra.globals.mapCenter,spatialReference:26917,zoom:9,logo:!1,minZoom:9,infoWindow:q}),S.defaults.geometryService=new h("https://gis.wim.usgs.gov/arcgis/rest/services/Utilities/Geometry/GeometryServer"),esri.config.defaults.io.corsEnabledServers.push("https://gis.wim.usgs.gov/");const _=new i({map:map},"homeButton");_.startup();const W=new o({map:map},"locateButton");W.startup();const Y=new s({map:map,advancedLocationUnits:!0},A.byId("measurementDiv"));Y.startup();var Z;if(Z=U?window.localStorage.getItem(storageName):dojo.cookie(storageName),Z&&"null"!==Z&&Z.length>4){console.log("cookie: ",Z,Z.length);var X=dojo.fromJson(Z);C.forEach(X,function(e){sbra.bookmarks.push(e)})}else console.log("no stored bookmarks...");const J=new a({map:map,attachTo:"bottom-right"});J.startup();var K=$('<tr class="esriMeasurementTableRow" id="utmCoords"><td><span>UTM17</span></td><td class="esriMeasurementTableCell"> <span id="utmX" dir="ltr">UTM X</span></td> <td class="esriMeasurementTableCell"> <span id="utmY" dir="ltr">UTM Y</span></td></tr>');$(".esriMeasurementResultTable").append(K),$(window).resize(function(){$("#legendCollapse").hasClass("in")?(maxLegendHeight=.9*$("#mapDiv").height(),$("#legendElement").css("height",maxLegendHeight),$("#legendElement").css("max-height",maxLegendHeight),maxLegendDivHeight=$("#legendElement").height()-parseInt($("#legendHeading").css("height").replace("px","")),$("#legendDiv").css("max-height",maxLegendDivHeight)):$("#legendElement").css("height","initial")}),$("#shareNavButton").click(function(){j()}),$("#printNavButton").click(function(){P()}),$("#addBookmarkButton").click(function(){F()}),$("#printExecuteButton").click(function(){$(this).button("loading"),V()}),$("#print-title-form").on("keypress",function(e){13==e.keyCode&&($("#printExecuteButton").button("loading"),V())}),$("#bookmarkSaveButton").click(function(){N()}),$("#bookmark-title-form").on("keypress",function(e){13==e.keyCode&&N()}),$("#bookmarkDismissButton").click(function(){$("#bmAlert").hide()}),z(map,"load",function(){var e=map.getScale().toFixed(0);$("#scale")[0].innerHTML=addCommas(e);var a=g.webMercatorToGeographic(map.extent.getCenter());$("#latitude").html(a.y.toFixed(4)),$("#longitude").html(a.x.toFixed(4)),H()}),z(map,"zoom-end",function(){var e=map.getScale().toFixed(0);$("#scale")[0].innerHTML=addCommas(e)}),z(map,"mouse-move",function(e){if($("#mapCenterLabel").css("display","none"),null!==e.mapPoint){var a=g.webMercatorToGeographic(e.mapPoint);$("#latitude").html(a.y.toFixed(4)),$("#longitude").html(a.x.toFixed(4))}}),z(map,"pan-end",function(){$("#mapCenterLabel").css("display","inline");var e=g.webMercatorToGeographic(map.extent.getCenter());$("#latitude").html(e.y.toFixed(4)),$("#longitude").html(e.x.toFixed(4))});var Q=new n("https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer",{visible:!1});map.addLayer(Q),z(A.byId("btnStreets"),"click",function(){map.setBasemap("streets"),Q.setVisibility(!1)}),z(A.byId("btnSatellite"),"click",function(){map.setBasemap("satellite"),Q.setVisibility(!1)}),z(A.byId("btnGray"),"click",function(){map.setBasemap("gray"),Q.setVisibility(!1)}),z(A.byId("btnOSM"),"click",function(){map.setBasemap("osm"),Q.setVisibility(!1)}),z(A.byId("btnTopo"),"click",function(){map.setBasemap("topo"),Q.setVisibility(!1)}),z(A.byId("btnNatlMap"),"click",function(){Q.setVisibility(!0)});var ee=new l({map:map},"geosearch");ee.startup(),z(ee,"search-results",function(e){$("#geosearchModal").modal("hide")}),$(document).ready(function(){function e(){$("#geosearchModal").modal("show")}function a(){$("#aboutModal").modal("show")}$("#geosearchNav").click(function(){e()}),$("#aboutNav").click(function(){a()}),$("#scaleAlertClose").click(function(){$("#parcelSelectScaleAlert").hide()}),$("#goToScale").click(function(){$("#parcelSelectScaleAlert").hide();var e=map.getLayer("parcelsFeat").minScale;map.setScale(e)}),$("#IEwarnContinue").click(function(){$("#disclaimerModal").modal({backdrop:"static"}),$("#disclaimerModal").modal("show")}),-1!==navigator.userAgent.indexOf("MSIE")||navigator.appVersion.indexOf("Trident/")>0?$("#IEwarningModal").modal("show"):($("#disclaimerModal").modal({backdrop:"static"}),$("#disclaimerModal").modal("show")),$(window).width()<767&&$("#legendCollapse").addClass("collapse"),$("#html").niceScroll();var t=$("#sidebar");t.niceScroll(),t.scroll(function(){$("#sidebar").getNiceScroll().resize()});var i=$("#legendCollapse"),o=$("#legendElement"),s=$("#legendDiv");$("#legendDiv").niceScroll({autohidemode:!1}),maxLegendHeight=.9*$("#mapDiv").height(),o.css("max-height",maxLegendHeight),i.css("max-height",maxLegendHeight),s.css("max-height",maxLegendHeight),i.on("shown.bs.collapse",function(){$("#legendLabel").show(),maxLegendHeight=.9*$("#mapDiv").height(),o.css("max-height",maxLegendHeight),i.css("max-height",maxLegendHeight),s.css("max-height",maxLegendHeight),o.css("height",maxLegendHeight),i.css("height",maxLegendHeight),maxLegendDivHeight=o.height()-parseInt($("#legendHeading").css("height").replace("px","")),s.css("height",maxLegendDivHeight)}),i.on("hide.bs.collapse",function(){o.css("height","initial"),window.innerWidth<=767&&$("#legendLabel").hide()});var r=$("#measurementCollapse");r.on("shown.bs.collapse",function(){$("#measureLabel").show()}),r.on("hide.bs.collapse",function(){window.innerWidth<=767&&$("#measureLabel").hide()}),$(function(){$("[data-hide]").on("click",function(){$("."+$(this).attr("data-hide")).hide()})}),sbra.bookmarks.forEach(function(e){if(e.userCreated===!1){var a=$('<tr id="'+e.id+'"><td class="bookmarkTitle td-bm">'+e.name+'</td><td class="text-right text-nowrap"></td> </tr>');$("#bookmarkList").append(a)}else{var t=e.id+"_delete",i=$('<tr id="'+e.id+'"><td  class="bookmarkTitle td-bm">'+e.name+'</td><td class="text-right text-nowrap"> <button id="'+t+'" class="btn btn-xs btn-warning bookmarkDelete" data-toggle="tooltip" data-placement="top" title="Delete bookmark"> <span class="glyphicon glyphicon-remove"></span> </button> </td> </tr>');$("#bookmarkList").append(i),$("#"+t).confirmation({placement:"left",title:"Delete this bookmark?",btnOkLabel:"Yes",btnCancelLabel:"Cancel",popout:!0,onConfirm:function(){$("#"+e.id).remove();for(var a=0;a<sbra.bookmarks.length;a++){var t=sbra.bookmarks[a];-1!==e.id.indexOf(t.id)&&sbra.bookmarks.splice(a,1)}O()}})}}),$("body").on("click",".td-bm",function(){var e=this.parentNode.id;sbra.bookmarks.forEach(function(a){if(a.id==e){var t=new L(a.xmin,a.ymin,a.xmax,a.ymax,new k(a.spatialReference));map.setExtent(t)}})}),$('[data-toggle="tooltip"]').tooltip({delay:{show:500,hide:0}}),$("#removeBookmarksButton").confirmModal({confirmTitle:"Delete user bookmarks from memory",confirmMessage:"This action will remove all user-defined bookmarks from local memory on your computer or device. Would you like to continue?",confirmOk:"Yes, delete bookmarks",confirmCancel:"Cancel",confirmDirection:"rtl",confirmStyle:"primary",confirmCallback:E,confirmDismiss:!0,confirmAutoOpen:!1})}),require(["esri/dijit/Legend","esri/tasks/locator","esri/tasks/query","esri/tasks/Geoprocessor","esri/tasks/FeatureSet","esri/tasks/GeometryService","esri/tasks/ProjectParameters","esri/tasks/QueryTask","esri/graphicsUtils","esri/geometry/Point","esri/toolbars/draw","esri/SpatialReference","esri/geometry/Extent","esri/layers/ArcGISDynamicMapServiceLayer","esri/layers/FeatureLayer","esri/layers/LabelLayer","esri/symbols/TextSymbol","esri/symbols/SimpleFillSymbol","esri/symbols/SimpleLineSymbol","esri/renderers/SimpleRenderer","esri/Color","esri/dijit/Popup","esri/dijit/PopupTemplate","esri/InfoTemplate","dojo/query","dojo/dom"],function(e,a,t,i,o,s,r,n,l,c,d,p,u,g,h,b,y,v,f,k,L,S,w,x,C,M){function I(e){$("#calculateStats").button("reset");var a=e.results[0].value.features[0].attributes,t=$("#zonalStatsTable");t.html("<tr><th>Mean </th><th>Standard Deviation</th><th>Max</th></tr>"),t.append("<tr><td>"+a.MEAN.toFixed(4)+"</td><td>"+a.STD.toFixed(3)+"</td><td>"+a.MAX+"</td></tr>"),$("#zonalStatsModal").modal("show")}var B,T,A,D=[],R=!1,O=!1,E={inputPoly:null},G=[];const j="https://gis.wim.usgs.gov/arcgis/rest/services/GLCWRA/",P=new s("https://gis.wim.usgs.gov/arcgis/rest/services/Utilities/Geometry/GeometryServer"),F=new g(j+"SBRA/MapServer",{id:"normalized",visible:!0});F.setVisibleLayers([4]),mapLayers.push(F),mapLayerIds.push(F.id),D.push({layer:F,title:" "}),F.inLegendLayers=!0;const V=new g(j+"SBRA/MapServer",{id:"dikes",visible:!1,minScale:1e5});V.setVisibleLayers([16]),mapLayers.push(V),mapLayerIds.push(V.id),V.inLegendLayers=!1;const N=new g(j+"SBRA/MapServer",{id:"degFlowlines",visible:!1,minScale:1e5});N.setVisibleLayers([15]),mapLayers.push(N),mapLayerIds.push(N.id),N.inLegendLayers=!1;const H=new g(j+"SBRA/MapServer",{id:"culverts",visible:!1,minScale:1e5});H.setVisibleLayers([14]),mapLayers.push(H),mapLayerIds.push(H.id),H.inLegendLayers=!1,map.disableClickRecenter(),B=new d(map);var U=$("#drawCustom");U.click(function(){map.graphics.remove(A),$("#displayStats").prop("disabled",!0),$("#calculateStats").prop("disabled",!0),E={inputPoly:null},O?(B.finishDrawing(),B.deactivate(),U.removeClass("active"),U.html('<span class="ti-pencil-alt2"></span>&nbsp;Draw'),O=!1):O||(U.addClass("active"),U.html('<i class="fa fa-stop"></i>&nbsp;&nbsp;Stop drawing'),R=!1,B.activate(d.POLYGON),O=!0)}),$("#clearSelection").click(function(){map.graphics.remove(A),$("#displayStats").prop("disabled",!0),$("#calculateStats").prop("disabled",!0),E={inputPoly:null},G=[]}),zonalStatsGP=new i("https://gis.wim.usgs.gov/arcgis/rest/services/GLCWRA/SBRAZonalStats/GPServer/SBRAZonalStats"),zonalStatsGP.setOutputSpatialReference({wkid:102100}),zonalStatsGP.on("execute-complete",I),$("#calculateStats").click(function(){$(this).button("loading"),zonalStatsGP.execute(E)}),z(B,"DrawEnd",function(e){T=new v(v.STYLE_SOLID,new f(f.STYLE_SOLID,new L([255,0,0]),2),new L([255,255,0,.5])),A=new m(e,T),A.setAttributes({ZONE_ID:1}),map.graphics.add(A),B.deactivate(),U.removeClass("active"),U.html('<span class="ti-pencil-alt2"></span>&nbsp;Draw'),O=!1,G.push(A);var a=new o;a.features=G,E={in_zone_data:a,zone_field:"ZONE_ID"},$("#calculateStats").prop("disabled",!1)});const q=new g(j+"SBRA/MapServer",{id:"studyArea",visible:!0});q.setVisibleLayers([0]),mapLayers.push(q),mapLayerIds.push(q.id),D.push({layer:q,title:" "}),q.inLegendLayers=!0;const _=new g(j+"SBRA/MapServer",{id:"GLRIWetlands",visible:!0,minScale:1e5,maxScale:1e4});_.setVisibleLayers([3]),mapLayers.push(_),D.push({layer:_,title:" "}),_.inLegendLayers=!0;const W=new g(j+"SBRA/MapServer",{id:"stations",visible:!1});W.setVisibleLayers([2]),mapLayers.push(W),D.push({layer:W,title:" "}),W.inLegendLayers=!0;var Z=new x;Z.setTitle("Wetland Biological Integrity"),Z.setContent("<div style='text-align: left'><b>Wetland:</b>  ${name}<br/><b>Wetland class:</b> ${class}<br/><b>Veg IBI value:</b> ${VegIBI}<br/>More information available from the Great Lakes Coastal Wetlands Monitoring Program: <a href='http://greatlakeswetlands.org' target='_blank'>greatlakeswetlands.org</a></div>");var X=new h("https://services5.arcgis.com/ed839pyDNWVlk9KK/ArcGIS/rest/services/CWMP_Vegetation_IBI/FeatureServer/0",{id:"veg",layerID:"veg",visible:!1,mode:h.MODE_ONDEMAND,outFields:["*"],infoTemplate:Z});X.id="veg",mapLayers.push(X),mapLayerIds.push(X.id),D.push({layer:X,title:""}),X.inLegendLayers=!0;var J=new w({title:"U.S. ACOE Aerial Photo",mediaInfos:[{title:"",caption:"Date & Time taken: {date}",type:"image",value:{sourceURL:"{imageUrl}",linkURL:"{imageUrl}"}}]}),K=new h(j+"SBRA/MapServer/1",{id:"aerials",layerID:"aerials",visible:!1,minScale:1e5,mode:h.MODE_ONDEMAND,outFields:["*"],infoTemplate:J});K.id="aerials",mapLayers.push(K),mapLayerIds.push(K.id),D.push({layer:K,title:"US Army Corps of Engineers Aerial Photos "}),K.inLegendLayers=!0;const Q=new g(j+"SBRA/MapServer",{id:"landuse",visible:!1});Q.setVisibleLayers([12]),mapLayers.push(Q),mapLayerIds.push(Q.id),Q.inLegendLayers=!1;const ee=new g(j+"SBRA/MapServer",{id:"imperviousSurfaces",visible:!1});ee.setVisibleLayers([11]),mapLayers.push(ee),mapLayerIds.push(ee.id),ee.inLegendLayers=!1;const ae=new g(j+"SBRA/MapServer",{id:"conservedLands",visible:!1});ae.setVisibleLayers([10]),mapLayers.push(ae),mapLayerIds.push(ae.id),ae.inLegendLayers=!1;const te=new g(j+"SBRA/MapServer",{id:"flowline",visible:!1});te.setVisibleLayers([9]),mapLayers.push(te),mapLayerIds.push(te.id),te.inLegendLayers=!1;const ie=new g(j+"SBRA/MapServer",{id:"wetsoils",visible:!1});ie.setVisibleLayers([8]),mapLayers.push(ie),mapLayerIds.push(ie.id),ie.inLegendLayers=!1;const oe=new g(j+"SBRA/MapServer",{id:"hydroperiod",visible:!1});oe.setVisibleLayers([7]),mapLayers.push(oe),mapLayerIds.push(oe.id),oe.inLegendLayers=!1;const se=new g(j+"SBRA/MapServer",{id:"waterMask",visible:!0,opacity:.75});se.setVisibleLayers([6]),mapLayers.push(se),mapLayerIds.push(se.id),se.inLegendLayers=!1,D.push({layer:se,title:""}),map.addLayers(mapLayers);var re=new r,ne=new p(26917);Y.on("measure-end",function(e){re.geometries=[e.geometry],re.outSR=ne;var a=-1*e.geometry.x;84>a&&a>78?P.project(re,function(e){var a=e[0];console.log(a);var t=a.x.toFixed(0),i=a.y.toFixed(0);$("#utmX").html(t),$("#utmY").html(i)}):($("#utmX").html('<span class="label label-danger">outside zone</span>'),$("#utmY").html('<span class="label label-danger">outside zone</span>'))});for(var le=0;le<map.layerIds.length;le++){var ce=map.getLayer(map.layerIds[le]);ce.visible&&($("#"+ce.id).button("toggle"),$("#"+ce.id).find("i.checkBoxIcon").toggleClass("fa-check-square-o fa-square-o"))}for(var le=0;le<map.graphicsLayerIds.length;le++){var ce=map.getLayer(map.graphicsLayerIds[le]);ce.visible&&($("#"+ce.id).button("toggle"),$("#"+ce.id).find("i.checkBoxIcon").toggleClass("fa-check-square-o fa-square-o"))}$("button.lyrTog").click(function(e){$(this).find("i.checkBoxIcon").toggleClass("fa-check-square-o fa-square-o"),$(this).button("toggle"),e.preventDefault(),e.stopPropagation();var a=map.getLayer($(this).attr("id"));a.visible?a.setVisibility(!1):(a.setVisibility(!0),a.inLegendLayers===!1&&(D.push({layer:a,title:" "}),a.inLegendLayers=!0,de.refresh()))}),$("#hydroConditionGroup, #parametersGroup, #4scaleGroup").on("hide.bs.collapse",function(){var e=$(this)[0].id.replace("Group","");$("#"+e).find("i.checkBoxIcon").toggleClass("fa-check-square-o fa-square-o"),$("#"+e).find("i.chevron").toggleClass("fa-chevron-right fa-chevron-down");var a=$(this).attr("id")+"Buttons";$("#"+a).button("toggle")}),$("#hydroConditionGroup, #parametersGroup, #4scaleGroup").on("show.bs.collapse",function(){var e=$(this)[0].id.replace("Group","");$("#"+e).find("i.checkBoxIcon").toggleClass("fa-check-square-o fa-square-o"),$("#"+e).find("i.chevron").toggleClass("fa-chevron-right fa-chevron-down")}),$(".zoomto").hover(function(e){$(".zoomDialog").remove();var a=this.id.replace("zoom",""),t=$('<div class="zoomDialog"><label class="zoomClose pull-right">X</label><br><div class="list-group"><a href="#" id="zoomscale" class="list-group-item lgi-zoom zoomscale">Zoom to scale</a> <a id="zoomcenter" href="#" class="list-group-item lgi-zoom zoomcenter">Zoom to center</a><a id="zoomextent" href="#" class="list-group-item lgi-zoom zoomextent">Zoom to extent</a></div></div>');$("body").append(t),$(".zoomDialog").css("left",e.clientX-80),$(".zoomDialog").css("top",e.clientY-5),$(".zoomDialog").mouseleave(function(){$(".zoomDialog").remove()}),$(".zoomClose").click(function(){$(".zoomDialog").remove()}),$("#zoomscale").click(function(e){var t=map.getLayer(a).minScale;t>0?map.setScale(t):console.log("No minimum scale for layer.")}),$("#zoomcenter").click(function(e){var a=new c(sbra.globals.mapCenter,new p({wkid:4326}));map.centerAt(a)}),$("#zoomextent").click(function(e){var t=map.getLayer(a).fullExtent,i=new r;i.outSR=new p(102100),i.geometries=[t],P.project(i,function(e){var a=e[0];map.setExtent(a,new p({wkid:102100}))})})}),$(".opacity").hover(function(e){$(".opacitySlider").remove();var a=this.id.replace("opacity",""),t=map.getLayer(a).opacity,i=$('<div class="opacitySlider"><label id="opacityValue">Opacity: '+t+'</label><label class="opacityClose pull-right">X</label><input id="slider" type="range"></div>');$("body").append(i);var o=$("#slider");o[0].value=100*t,$(".opacitySlider").css("left",e.clientX-180),$(".opacitySlider").css("top",e.clientY-5),$(".opacitySlider").mouseleave(function(){$(".opacitySlider").remove()}),$(".opacityClose").click(function(){$(".opacitySlider").remove()}),o.change(function(e){var t=o[0].value/100;console.log("o: "+t),$("#opacityValue").html("Opacity: "+t),map.getLayer(a).setOpacity(t)})});var de=new e({map:map,layerInfos:D},"legendDiv");de.startup()})});