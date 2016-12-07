
// Set the number of snowflakes (more than 30 - 40 not recommended)
var snowmax=250,

// Set the colors for the snow. Add as many colors as you like
snowcolor=new Array("#aaaacc","#ddddff","#ccccdd","#f3f3f3","#f0ffff"),

// Set the fonts, that create the snowflakes. Add as many fonts as you like
snowtype=new Array("Times","Arial","Times","Verdana"),

// Set the letter that creates your snowflake (recommended: * )
snowletter='',

// Set the speed of sinking (recommended values range from 0.3 to 2)
sinkspeed=0.5,

// Set the maximum-size of your snowflakes
snowmaxsize=40,

// Set the minimal-size of your snowflakes
snowminsize=12,

// Set the snowing-zone
// Set 1 for all-over-snowing, set 2 for left-side-snowing
// Set 3 for center-snowing, set 4 for right-side-snowing
snowingzone=3;

///////////////////////////////////////////////////////////////////////////
// CONFIGURATION ENDS HERE
///////////////////////////////////////////////////////////////////////////

// Do not edit below this line
var snow=new Array(),
marginbottom,
marginright,
timer,
i_snow=0,
x_mv=new Array(),
crds=new Array(),
lftrght=new Array(),
browserinfos=navigator.userAgent,
ie5=document.all&&document.getElementById&&!browserinfos.match(/Opera/),
ns6=document.getElementById&&!document.all,
opera=browserinfos.match(/Opera/),
browserok=ie5||ns6||opera;

function randommaker(range) {
    var rand = Math.floor(range*Math.random());
    return rand;
}

function initsnow() {
    for (i=0;i<=snowmax;i++) {
        var opac = (Math.random() * 0.75) + 0.25,
        w = opac * 29,
        h = opac * 19,
        div = "<div id='s"+i+"' class='snowflake' style='width:"+w+"px;"+h+"px;position:absolute;-webkit-transform:rotate("+Math.floor(Math.random() * 360)+"deg);opacity:"+ opac + ";top:-"+h+"'>"+snowletter+"</div>",
        $div = $(div);
        $div.css({'background-size': w+'px ' + h+'px'});
        $('#snowContainer').append($div);
    }

    if (ie5 || opera) {
        marginbottom = document.body.scrollHeight;
        marginright = document.body.clientWidth-15;
    }
    else if (ns6) {
        marginbottom = document.body.scrollHeight;
        marginright = window.innerWidth-15;
    }

    if($.browser.webkit){
          marginbottom = 800;
    }
    var snowsizerange = snowmaxsize - snowminsize;

    for (i = 0 ; i <= snowmax ; i++) {
        crds[i] = 0;
        lftrght[i] = Math.random()*15;
        x_mv[i] = 0.03 + Math.random()/10;
        snow[i]=document.getElementById("s"+i);
        snow[i].style.fontFamily = snowtype[randommaker(snowtype.length)];
        snow[i].size = randommaker(snowsizerange)+snowminsize;
        snow[i].style.fontSize = snow[i].size+'px';
        snow[i].style.color = snowcolor[randommaker(snowcolor.length)];
        snow[i].style.zIndex = 1000;
        snow[i].sink = sinkspeed * snow[i].size / 5;
        snow[i].posx = randommaker(1491 - snow[i].size);
        snow[i].posy = randommaker(2 * marginbottom - marginbottom - 2 * snow[i].size);
        snow[i].style.left = snow[i].posx + 'px';
        snow[i].style.top = snow[i].posy + 'px';
    }
    movesnow();
}

function movesnow() {
    for (i = 0 ; i <= snowmax ; i++) {
        crds[i] += x_mv[i];
        snow[i].posy += snow[i].sink
        snow[i].style.left = snow[i].posx + lftrght[i] * Math.sin(crds[i]) + 'px';
        snow[i].style.top = snow[i].posy + 'px';
        if (snow[i].posy >= marginbottom - 2 * snow[i].size || parseInt(snow[i].style.left) > (marginright - 3 * lftrght[i])){
           snow[i].posx = randommaker(1491 - snow[i].size);
           snow[i].posy = -29;
        }
    }
    var timer = setTimeout("movesnow();" , 40);
}

window.initSnow = function(){
    if(browserok && $.browser.webkit){
        initsnow(); 
        $('#snowContainer').hide().fadeIn(250);               
    }else{
        $('#snowContainer').hide();
    }
}
