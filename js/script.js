$(function(){

	var nav = navigator,
	isIDevice = (/iphone|ipod|ipad/gi).test(nav.platform),
	isIPad = (/ipad/gi).test(nav.platform),
	isRetina = 'devicePixelRatio' in window && window.devicePixelRatio > 1,
	isSafari = nav.appVersion.match(/Safari/gi),
	hasHomescreen = 'standalone' in nav && isIDevice,
	isStandalone = hasHomescreen && nav.standalone,
	isMobileBrowser = isIDevice || nav.userAgent.match(/BlackBerry|Android|WebOs/i);

    soundManager.url = '';
    soundManager.preferFlash = false;
    soundManager.useHTML5Audio = true;
    soundManager.debugMode = false;

	if(isMobileBrowser){
		//$('#main #page1').css({'display':'block'});
		$('#preloader').hide();
	}

	if(!$.browser.webkit){
		$('#desktopView').addClass('no-snow');
	}
	
	var app = $.app = {};

	var imgC = [], 
	imgsLo = [
		'img/loadinfo.net.gif',
		'img/install.png',
		'img/welcome.png',
		'img/homescreen.jpg',
		'img/background.jpg',
		'img/siri_anim_off.png',
		'img/siri_think_anim.png',
		'img/siri_mic_anim.png',
		'img/launchsiri.png',
		'img/landscape_small.jpg'
	],
	imgsHi = [
		'img/loadinfo.net.gif',
		'img/install@2x.png',
		'img/welcome@2x.png',
		'img/homescreen@2x.jpg',
		'img/background@2x.jpg',
		'img/siri_anim_off.png',
		'img/siri_think_anim.png',
		'img/siri_mic_anim.png',
		'img/launchsiri@2x.png',
		'img/landscape_large.jpg'	
	],
	serverPrefix = 'http://www.siriclaus.com/',
	imgs = (isIDevice && isRetina) ? imgsHi : imgsLo;

	for (var i = 0 ; i < imgs.length; i ++){
		var img = new Image();
		$(img).attr('rel' , serverPrefix + imgs[i]+'?v=' + Math.floor(Math.random() * 1000));	
		imgC[i] = img;	
	}

	if(isMobileBrowser){
		/*var introScreen = new Image();
		$(introScreen).load(function(e){

			if(isRetina){
				$('#main #page1').css({'background':'url(../img/default@2x.jpg) no-repeat'});
			}else{
				$('#main #page1').css({'background':'url(../img/default.jpg) no-repeat'});
			}
			$('#main #page1').css({'display':'block'});
			$('#preloader').show();

			//setTimeout(function(){beginPreload();} , 500);
		}); */

		$('#main #page1').css({'display':'block'});
		$('#preloader').show();
			if(isRetina){
				$('#main #page1').css({'background':'url(../img/default@2x.jpg) no-repeat'});
			}else{
				$('#main #page1').css({'background':'url(../img/default.jpg) no-repeat'});
			}
		//introScreen.src = (isRetina) ? serverPrefix  + 'img/default@2x.jpg': serverPrefix + 'img/default.jpg';
		setTimeout(function(){beginPreload();} , 500);

		initApp();


		function beginPreload(){

			$(imgC).preloadImages({
				progress:function(l,t){
					console.log(l , t);

					var $p = $('#preloader'),
					fill = $('#preloader span').get(0),
					prct = parseInt((l/t) * 100 , 10);

					fill.style.width = prct.toString() + '%';

					if(prct == 100){
						//fill.style['border-radius'] = '10px';
					}

				},
				complete: function(){

					//include stylesheet that has these images that we want to load from cache
					$("head").append("<link>");
				    var css = $("head").children(":last");
				    css.attr({
				      rel:  "stylesheet",
				      type: "text/css",
				      href: "css/main.css?v=2"
				    });

				    //$('#landscapeModal').show();
					//$('#container').show();
					$('#preloader').fadeOut(250);

				    
				   	imgC = [];
				   
				   	setTimeout(window.a2hs , 500);
				}
			});
		}
	}else{
		$("head").append("<link>");
	    var css = $("head").children(":last");
	    css.attr({
	      rel:  "stylesheet",
	      type: "text/css",
	      href: "css/main.css?v=2"
	    });

	    //$('#landscapeModal').show();
		$('#container').show();
		$('#preloader').hide();
		initApp();

		if(isMobileBrowser){
			window.a2hs();
		}else{
			$.app.addToHomeClosed();
		}


		/**
		*	Make a new container that will house 
		*   the whole desktop experience
		*	
		*/

		///$('#share-btns').show();
		$('#infoFooter').show();



	}

	function initApp(){
	var sndData = [
		{question:'Is Santa Claus real?' , 
			yes:[
				'snd/a_one_1.mp3',
				'snd/a_one_2.mp3',
				'snd/a_one_3.mp3',
				'snd/a_one_4.mp3',] , 
			no:[
				'snd/a_two_1.mp3',
				'snd/a_two_2.mp3',
				'snd/a_two_3.mp3',
				'snd/a_two_4.mp3',
				'snd/a_two_5.mp3']},
		
		{question:'When is Santa coming?' ,
			 yes:[
			 	'snd/b_one_1.mp3',
			 	'snd/b_one_2.mp3',
			 	'snd/b_one_3.mp3',
			 	'snd/b_one_4.mp3'] , 
			 no:[
			 	'snd/b_two_1.mp3',
			 	'snd/b_two_2.mp3',
			 	'snd/b_two_3.mp3',
			 	'snd/b_two_4.mp3',
			 	'snd/b_two_5.mp3']},
		
		{question:'Is Santa bringing me what I wished for?' ,
			 yes:[
			 	'snd/c_one_1.mp3',
			 	'snd/c_one_2.mp3',
			 	'snd/c_one_3.mp3',
			 	'snd/c_one_4.mp3'] , 
			 no:[
			 	'snd/c_two_1.mp3',
			 	'snd/c_two_2.mp3',
			 	'snd/c_two_3.mp3',
			 	'snd/c_two_4.mp3',
			 	'snd/c_two_5.mp3']},
		
		{question:'Have I been naughty or nice?' , 
			yes:[
				'snd/d_one_1.mp3',
				'snd/d_one_2.mp3',
				'snd/d_one_3.mp3',
				'snd/d_one_4.mp3'] , 
			no:[
				'snd/d_two_1.mp3',
				'snd/d_two_2.mp3',
				'snd/d_two_3.mp3',
				'snd/d_two_4.mp3',
				'snd/d_two_5.mp3']}
	];

	var ansData = [
					//question A
					{yes:[
						"Yes. Santa Claus is a jolly man whose favorite snacks include cookies and warm milk.",
						"Yes. Without Santa Claus there is no Christmas. There will be Christmas, so there is a Santa Claus.",
						"Yes. Santa Claus lives at the North Pole, with a large number of magical elves, and nine flying reindeer. Santa makes a list of children throughout the world, categorizing their behavior as either naughty or nice. He then delivers presents consisting of toys and candy to all of the nice boys and girls in the world on the single night of Christmas Eve. Naughty children get lumps of coal. He accomplishes this feat with the aid of the elves who make the toys in his workshop and the reindeer who pull his sleigh. Santa Claus: also known as Saint Nicholas, Father Christmas, Kris Kringle, or simply \"Santa.\"",
						"Yes, but Santa Claus only comes when you pick up your toys. He doesn\'t like tripping over your toys."
					],
					no:[
						"No. Santa Claus is made up. Other made up things include fairies, talking animals and the Gingerbread man.",
						"No, and I\'m sorry a voice on a phone has to break it to you.", 
						"No. There isn\'t enough magic to fly a man of his size around the world.",
						"Hmmm... this is awkward. No. The answer is no.", 
						"The answer is no, but would you like me to lie to you?"
					]},

					//question B
					{yes:[
						"Santa already came, but your parents gave your toys to the neighbors.",
						"Santa will arrive when he hears you snoring. Yes, you do snore. Very loudly.",
						"Santa will come only if you scrub the toilet.",
						"Santa will come sooner if you go clean your room right now... What are you waiting for?"
					],
					no:[
						"Oh, you wanted Santa to come this year? He thought you didn\'t want him to.",
						"Santa isn\'t coming because your messy room scared him away.", 
						"Santa isn\'t coming because you never play with the toys he brought you last year.",
						"Santa isn\'t coming this year due to the North Pole being occupied.", 
						"Oops. Santa thought you were coming to his house this year!"
					]},

					//question C
					{yes:[
						"Yes. If you wished for nothing, then the answer is yes.",
						"Yes. But only if you can stand on your head for one minute.",
						"I will only say this: Prepare to have your mind blown.",
						"Yes. But only if you can sit quietly for five minutes. Not one peep. Starting... now!"
					],
					no:[
						"No. You are getting socks.",
						"No. Santa Claus does not bring what kids want. Only what they deserve.", 
						"No. Santa Claus will bring you what he brings you.",
						"Accessing Santa\'s records... No. Sorry to disappoint you, but it\'s better that you know now rather than Christmas morning.",
						"No. Santa Claus\'s records show that you have enough toys."
					]},

					//question D
					{yes:[
						"Naughty. But maybe if you give your mom a foot rub Santa will change his mind.",
						"I have found your name on Santa's \"I\'ll think about it\" list.",
						"Naughty. But if you clean your room right now, Santa will reconsider it.",
						"Santa thinks you still need to prove that you are nice. Why don\'t you give your mom a hug?"
					],
					no:[
						"Nice. But Santa could do with a little less whining.",
						"Santa thinks you are so nice that you probably don\'t want any presents this year.", 
						"Nice. Perhaps doing some more chores will make it official.",
						"Nice. Unless you are hiding something. Are you hiding something?", 
						"You\'ve been very nice this year. But have you done something nice today?"
					]},
				  ];

	/*====================================================================================================================================================*/
	/******************************************************************************************************************************************************/
	
	
	var audio = $('#siriAudio').get(0),
	currentPageNumber = 0,
	answerText,
	soundLoaded = false,
	buttonInit = false,
	question = '',
	answerStr = '',
	answerLabel = '',
	bucketId = -1,
	answerId = -1,
	soundArray = [],
	soundId = -1,
	soundFile = '',
	question = '',
	answerText = '',
	nav = navigator,
	isIDevice = (/iphone|ipod|ipad/gi).test(nav.platform),
	isIPad = (/ipad/gi).test(nav.platform),
	isRetina = 'devicePixelRatio' in window && window.devicePixelRatio > 1,
	isSafari = nav.appVersion.match(/Safari/gi),
	hasHomescreen = 'standalone' in nav && isIDevice,
	isStandalone = hasHomescreen && nav.standalone,
	isMobileBrowser = isIDevice || nav.userAgent.match(/BlackBerry|Android|WebOs/i),
	isReplaying = false,
	replayArray = [],
	answerArray = [],
	PAGE_TRANSITION_TIME = isMobileBrowser ? 350 : 250;

    soundManager.url = '';
    soundManager.preferFlash = false;
    soundManager.useHTML5Audio = true;
    soundManager.debugMode = false;
	var currentSound = null;

    soundManager.onready(function(){
    	console.log('Sound Manager Ready');
    });

    $.app.onSoundLoaded = function(){
		console.log('Load Complete');
    	$('#launchsiri').show();
    	$('.spinner').hide();
    	soundLoaded = true;

  		$('#loadProgress').css({'width':'320px' });
  		setTimeout(resetLoadProgress , 250);
    }

    $.app.onSoundComplete = function(){
    	$('#siriDeadMicButton').click(onMicClicked);
    }

    $.app.onAudioProgress = function(bl,bt){
  		
		var loaded = parseInt(bl / bt) * 100;
	    if (loaded >= 0){
	    	console.log('Loaded ' + loaded + '%');
	    	$('#loadProgress').css({'display':'block'});
	    	$('#loadProgress').css({'width':Math.ceil((loaded/100) * 320).toString() +'px' });
	    } 
    }

    function createNewSound(id , url , callback , progress){
    	if(currentSound) currentSound.destruct();
		var sound = soundManager.createSound({
        	id: id || 'sound' + Math.floor(Math.random() * 1000).toString(),
        	url: url,
        	autoLoad: true,
        	onload: callback,
        	onfinish:$.app.onSoundComplete,
        	whileloading: function(){
        		progress(this.bytesLoaded , this.bytesTotal);
        	}
      	});

      	if(isMobileBrowser){
      		//sound.load();
      	}

      	return sound;
    }

	//hide ajax spinner on home screen
	//$('#page1 .spinner').remove();

	$('#questionBubble').hide();
	
	function init(){

		if(isStandalone && isMobileBrowser){
			$('#getStartedPopup').delay(500).fadeIn(500);

		}else if(!isMobileBrowser){
			$('#getStartedPopup').delay(2500).fadeIn(500);
			if($.browser.webkit){
				initSnow();
			}
		}else{
			$('#getStartedPopup').fadeIn(500);
		}
	}

	function initSnow(){
		//window.initSnow();
		setTimeout(window.initSnow , 1000);
	}

	/**
	* Entry point called from add to homescreen, 
	* or automatically if app is standalone already
	*
	*/
	app.addToHomeClosed = function(){
		init();
	}

	$.app.backClicked = function(dir){
		resetLoadProgress(); //make sure to reset the progress indicator
		isReplaying = false;
		currentSound.destruct();
		app.transitionToPage(2);
	}

	$('.backbutton').click(function(e){
		e.preventDefault();
		$.app.backClicked();
	});

	app.transitionToPage = function(pageNo){
		currentPageNumber = pageNo;

		switch(currentPageNumber){

			case 2:
				isReplaying = false;
				//audio.src = '';
				$('#siriDeadMicButton').click(onMicClicked);
				break;
			//do page 4 lazy load stuff
			case 4:
				initSiriButtons();
				break;
		}

		pageNo -= 1;

		isReplaying = false;

		$('#main').animate({left:-pageNo * 320 + 'px'},{duration: PAGE_TRANSITION_TIME });
	}


	$('#siriButton').hide();
	$('#siriMicButton').hide();

	function onMicClicked(e){

		if(isReplaying){
			//cueReplayAudio();
		}

		isReplaying = true;

		$('#questionBubble').hide();
		$('#answerBubble').hide();

		$(this).hide();

		$(this).unbind('click' , onMicClicked);

		$('#siriMicButton').show();
		
		currentSound.play();

		setTimeout(function(){
			$('#siriMicButton').hide();
			$('#questionBubble').show();
			$('#siriButton').show();

			setTimeout(function(){
				$('#siriButton').hide();
				$('#siriMicButton').hide();
				$('#siriDeadMicButton').show();
				$('#answerBubble').html(answerText);
				$('#answerBubble').show();
					
			} , 3000);

		} , 4500);		
	}

	$('#siriDeadMicButton').click(onMicClicked);

	function resetLoadProgress(){
		$('#loadProgress').fadeOut(350,function(){$('#loadProgress').css({'width':'5px' });});
	    
	}

	$('#getStartedPopup').click(function(e){
		var $el = $(this);
		$el.stop().delay(500).fadeOut(500, function(){
			$('#page2').prepend($el);
		});
		app.transitionToPage(2);

		$el.unbind('click');

		$el.css({'z-index':'999'})

		$('#infoButton').click(function(e){
			$el.stop().fadeIn(250);
			$el.click(function(e){
				$el.unbind('click');
				$el.stop().fadeOut(250);
			});
		});

	});

	$('#launchsiri').stop().hide();

	$('#launchsiri').click(function(){
		app.transitionToPage(4);
	});

	$('.options li').css({'cursor':'pointer'});

	$('.options li').click(function(e){
		e.preventDefault();
		soundLoaded = false;
		isReplaying = false;

		$('#launchsiri').stop().hide();
		$('.spinner').show();
		$('#answerBubble').hide();
		$('#questionBubble').hide();

		var $el = $(this);

		answerStr = $el.data('answer').toString();
		answerLabel = $el.data('label').toString();
		bucketId = parseInt(answerStr.substr(0,1));
		answerId = parseInt(answerStr.substr(2,1));
		answerArray = (function(){
			if(answerId == 0){
				return ansData[bucketId].yes;
			}

			else if (answerId == 1){
				return ansData[bucketId].no;
			}

			else if (answerId == 2){
				return ansData[bucketId].yes.concat(ansData[bucketId].no);
			}
		})();

		replayAnswerArray = answerArray.concat();
			
		
		soundArray = (function(){
			if(answerId == 0){
				return sndData[bucketId].yes;
			}

			else if (answerId == 1){
				return sndData[bucketId].no;
			}

			else if (answerId == 2){
				return sndData[bucketId].yes.concat(sndData[bucketId].no);
			}
		})();

		replayArray = soundArray.concat();

		loadNewAudio(soundArray,answerArray,bucketId);

		app.transitionToPage(3);
	});

	function cueReplayAudio(){	
		replayArray.splice(soundId , 1);
		replayAnswerArray.splice(soundId , 1);
		
		if(replayArray.length > 0){
			loadNewAudio(replayArray,replayAnswerArray,bucketId);
		}else{
			replayArray = soundArray.concat();
			replayAnswerArray = answerArray.concat();
			loadNewAudio(replayArray,replayAnswerArray,bucketId);
		}
	}

	function loadNewAudio(soundArray,answerArray , bucketId){
		console.log('loadNewAudio called');
		soundId = Math.floor(Math.random() * soundArray.length);
		soundFile = soundArray[soundId];
		question = sndData[bucketId].question;
		answerText = answerArray[soundId];

		$('#answer').html(question);
		$('#yesNoRand').html('('+ answerLabel +')');
		$('#questionBubble').html(question);
		
		currentSound = createNewSound('' , soundFile , $.app.onSoundLoaded , $.app.onAudioProgress);
		console.log('Sound ID: ' , soundId , 'Sound File: ' , soundFile , 'Question: ', question);	
	}

	/**
	*	We're not on the mobile site anymore so show the regular website
	*
	*/
	if(!isMobileBrowser){
	  
	  var fileref=document.createElement("link");
	  fileref.setAttribute("rel", "stylesheet");
	  fileref.setAttribute("type", "text/css");
	  fileref.setAttribute("href", 'css/desktop.css');
	  document.getElementsByTagName('head')[0].appendChild(fileref);

	  $('#container').addClass('center');
	  $('#container').addClass('center_body');
	  $('#landscapeModal').hide();

	  //$('#iphone').delay(250).fadeIn(500);
	 	$('#iphone').show();
	  $('#container').delay(250).fadeIn(500);
	}

	//$('.doubletap').doubleTap({isIDevice:isIDevice});

	if(!isStandalone) $(window).scrollTop(40);

	if(isStandalone){
		$('#container').bind('touchmove' ,function(e){e.preventDefault();});
		$('#landscapeModal').bind('touchmove' ,function(e){e.preventDefault();});
	}

	function initSiriButtons(){
		if(!buttonInit){
			buttonInit = true;

			//init the siri button animations	
			$('#siriButton').sprite({fps: 24, no_of_frames: 34});
			$('#siriMicButton').sprite({fps: 24, no_of_frames: 36});
		}		
	}
	}
});