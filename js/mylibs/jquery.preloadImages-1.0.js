/**
*	
*
*/	
$.fn.preloadImages = function(opts){
	opts = $.extend($.fn.preloadImages.options , opts);
	var imgCnt = 0,
	ldCnt = 0,
	$this = this;
	return this.each(function(){
		var $img = $(this),
		el = $img[0];
		imgCnt++;
		function onLoaded(){
			ldCnt ++;
			opts.progress(ldCnt , imgCnt);
			if(ldCnt == imgCnt){
				if(opts.debug){
					if(window.console){
						console.log('Image Count: ' ,imgCnt ,'Loaded Count: ' ,ldCnt);
					}
				}
				if(opts.complete){
					opts.complete($this);
				}
			}
			
			//$img.remove(); //get rid of it				
		}
		function onError(){
			if(opts.ignoreErrors){
				ldCnt ++; //ignore the error and continue the loading process
				opts.progress(ldCnt , imgCnt);
			}
			if(opts.debug){
				if(window.console){
					console.log('Image Load Error: ' , $img.data('src'));
				}
			}				
		}
		el.onload = onLoaded;
		el.onabort = onError;
		el.src = $img.data('src') || $img.attr('rel');
		console.log($img.attr('rel'));
	});
}

$.fn.preloadImages.options = {
	complete:function(){
		if(window.console){
			console.log('$.fn.preloadImages [COMPLETE]');
		}		
	},
	progress:function(l,t){
		if(window.console){
			console.log('$.fn.preloadImages [LOAD PROGRESS] - ' , parseInt((l / t) * 100 , 10).toString() + '%') ;
		}			
	},
	debug:false,
	ignoreErrors:true
}