$(function(){
	$.fn.doubleTap = function(opts){
		return this.each (function(){
			var $el = $(this);
			var tapCount = 0;
			var clearInt = 0;

			var threshhold = 250;

			if(opts.isIDevice){	
				//make sure we're cancelling if the window begins to scroll
				$(window).scroll(function(e){
					clearInterval(clearInt);
					tapCount = 0;
				});
				function touchStart(event) {
					tapCount ++;
					clearInterval(clearInt);
					if(tapCount >= 2){
						tapCount = 0;
						$.app.doubleTapDetect();
					}else{
						clearInt = setInterval(clearFn , threshhold);				
					}
				}
				this.addEventListener("touchstart", touchStart, false);				
			}else{
				$el.click(function(){
					tapCount ++;
					clearInterval(clearInt);
					if(tapCount >= 2){
						tapCount = 0;
						$.app.doubleTapDetect();
					}else{
						clearInt = setInterval(clearFn , threshhold);				
					}
				});
			}



			function clearFn(){
				tapCount = 0;
			}	

		});
	}
});