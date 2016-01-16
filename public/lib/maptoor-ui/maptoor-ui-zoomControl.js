var maptoor = maptoor || {};
maptoor.map = maptoor.map || {};
maptoor.map.ui = (function() {
	return{	

		TL:"TL",
		TR:"TR",
		BL:"BL",
		BR:"BR",

		ZoomControl: function(divName,mapDivName,map){

			var that=this;
			var _divName = divName;
			var _placement;
			this.map = map;

			$( "#"+divName ).appendTo( "#"+divName );

			$( "#"+divName ).addClass( "maptoor-control-zoom" );

			$("<div/>", {
				id: "maptoor-control-zoom-up",
				class: "ion-android-arrow-dropup-circle maptoor-control-zoom-button"
			}).appendTo( "#"+divName );

			$("<div/>", {
				id: "maptoor-control-zoom-down",
				class: "ion-android-arrow-dropdown-circle maptoor-control-zoom-button maptoor-control-zoom-button-down"
			}).appendTo( "#"+divName );


			this.zoomOut = function(map){
				var oldZoom = map.getZoom();
				map.setZoom(oldZoom - 1);
			}

			this.zoomIn= function(map){
				var oldZoom = map.getZoom();
				map.setZoom(oldZoom + 1);
			}

			$( "#maptoor-control-zoom-up" ).click(function() {
				that.zoomIn(that.map);
			});

			$( "#maptoor-control-zoom-down" ).click(function() {
				that.zoomOut(that.map);
			});

			this.placeBox = function(containerDivName, placement){
				_placement = placement;
				var md = $( "#"+containerDivName );
				var w = $( "#"+_divName ).width();
				var h = $( "#"+_divName ).height();
				var mw = md.width();
				var mh = md.height();

				var right = maptoor.map.ui.TR===placement||maptoor.map.ui.BR===placement;
				var bottom = maptoor.map.ui.BL===placement||maptoor.map.ui.BR===placement;

				var getCss = function(d,p){return parseInt($( "#"+d ).css(p));};

				var l = md.offset().left;
				var ml =  getCss (_divName,'margin-left'); //$( "#"+_divName ).css('margin-left').replace(/\D+$/g, '');

				if(right){
					l+=mw;
					l-=w;
					var mr = getCss (_divName,'margin-right'); //$( "#"+_divName ).css('margin-right').replace(/\D+$/g, '');
					l-=mr;
					l-=ml;
				}

				$( "#"+divName ).css({left: l});

				var t = md.offset().top;
				var mh4 = Math.round(mh/4);
				var h2 = Math.round(h/2);
				t+=mh4;
				t-=h2;
				var mt = getCss (_divName,'margin-top'); //$( "#"+_divName ).css('margin-top').replace(/\D+$/g, '');
				t-=mt;

				if(bottom){
					t+=mh4*2;
				}

				$( "#"+divName ).css({top: t});

			};

			_placement = maptoor.map.ui.TR;
			this.resize=function(){this.placeBox(mapDivName,_placement);}
			this.resize();
			$(window).resize(function(){that.resize();});

		}

	};
})();