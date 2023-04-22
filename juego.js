const cancion=document.getElementById("miCanvas");
var canvas = document.getElementById("miCanvas");
var ctx = canvas.getContext("2d");
var rain=[];
var loop;
var cont=0;
var x=10;
var x1=1870;
var x2=2040;
var x3=2210;
var x4=2380;
var xaux;
var y=canvas.height/2;
var y1=300;
var y2=400;
var y3=500;
var y4=600;
var sx1=20;
var sx2=20;
var sx3=25;
var sx4=15;
var sy1=20;
var sy2=20;
var sy3=25;
var sy4=15;
var max=745;
var min=250;
var ancho=180;
var alto=200;
var img=new Image();
var img1=new Image();
var img2=new Image();
var img3=new Image();
var img4=new Image();
var imge=new Image();
var imgc=new Image();
var imgm=new Image();
var imgp=new Image();
var imgg=new Image();
var imgx=new Image();
var marcador=0;
var marcadoraux=0;
var puntajeMaximo = localStorage.getItem("puntajeMaximo") || 0;
var vidas=3;
var pausa=false;
var reiniciar=true;
var nivel=20;
var j;
var i;
var indice=0;
var indice2=0;
var indice3=0;
var indicexplosion=0;
var flag=false;
var xexp=0;
var yexp=0;
var limExp=25;
var M = [
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [5,6,5,6,5,6,5,6,5,6],
    [1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
];
var exp=[[0,0],[95,0],[197,0],[298,0],[395,0],
         [0,95],[95,95],[197,95],[298,95],[395,95],
         [0,189],[95,189],[197,189],[298,189],[395,189],
         [0,285],[95,285],[197,285],[298,285],[395,285],
         [0,389],[95,389],[197,389],[298,389],[395,389]];
 
img.src="Batimobile.png";
img1.src="carro1.png";
img2.src="carro3.png";
img3.src="police.png";
img4.src="h.png";
imge.src="road1.png";
imgc.src="nubes.png";
imgm.src="hielo.png";
imgp.src="pausa.png";
imgg.src="GO.jpg";
imgx.src="explosion.png";

document.addEventListener('keydown',manejadorTecladoAbajo,false);
document.addEventListener('mousemove',mouseHanddle,false);

rainCall();

img.onload=function(){
    loop=setInterval(dibujar,nivel);
}

function startGame(){
    let startDiv=document.getElementById("start");
    let gameCanvas=document.getElementById("miCanvas");
    startDiv.style.display="none";
    gameCanvas.style.display="block"; 
    cancion.innerHTML+='<audio src="Han.mp3" autoplay></audio>';
}

function dibujar(){
    if(reiniciar==true){
        if(pausa==false){
            for (j=0;j<10;j++){
                for(i=0;i<10;i++){
                    if ((M[j][i])!=-1){
                        xl=(M[j][i]%11)*11;
                        yl= Math.floor(M[j][i]/11)*11;
                        ctx.drawImage(imgm,xl,yl,60,60,i*190,j*105,190,95);
                    }
                }
            }
            ctx.clearRect(0,0,canvas.width,canvas.height-80);
            //cielo
            ctx.drawImage(imgc,indice2*2,10,3000,2250,0,canvas.height-920,canvas.width*2,canvas.height);
            indice2=(indice2+1)%400;
            //camino
            ctx.drawImage(imge,indice*3,0,1250,1480,0,canvas.height-720,canvas.width,canvas.height);
            indice=(indice+1)%130;
            //carro
            ctx.drawImage(img,10,0,900,900,x,y,ancho,alto);
            //carros
            generateRandom(min,max);      
            //agregados
            if(cont==50){
                marcador++;
                marcadoraux++;
                cont=0;
            }
            if (marcador > puntajeMaximo) {
                puntajeMaximo = marcador;
                localStorage.setItem("puntajeMaximo", puntajeMaximo);
            }
            Instrucciones();
            Vidas();
            Marcador();
            detectarColision();
            if(flag==true)
                dibujarExplosion();  
            cont++;
        }else{
            ctx.drawImage(imgp,0,0,900,900,canvas.width/2-260,50,700,700);
            Pausa();
        }
    }else{
        ctx.drawImage(imgg,0,0,1920,1356,0,0,canvas.width,canvas.height);
    }
}

function rainDrop(){
    this.x=Math.random()*canvas.width;
    this.y=(Math.random()*80)-80;
    this.height=(Math.random()*5)+5;
    this.speed=(Math.random()*6)+3;
    
    this.updateRain=function(){
        this.y+=this.speed;
        if(this.y+this.height>=canvas.height){
            this.y=(Math.random()*80)-80;
        }
    }

    this.drawRain=function(){
        if(pausa==false){
            ctx.beginPath();
            ctx.strokeStyle="white";
            ctx.moveTo(this.x,this.y);
            ctx.lineTo(this.x,this.y+this.height);
            ctx.stroke();
        }
    }
}

function rainCall(){
    for(var k=0;k<=900;k++){
        rain[k]=new rainDrop();
    }
        startRain();
}

function startRain(){
    for(var d=0;d<rain.length;d++){
        rain[d].updateRain();
        rain[d].drawRain();
    }
    requestAnimationFrame(startRain);
}

function generateRandom(min,max){
    //carro1
    ctx.drawImage(img1,0,0,900,900,x1,y1,ancho,alto);
	x1=x1+sx1;
	if(x1>canvas.width+500)
		sx1=-sx1;
    if(x1+ancho<0){
        x1=1870;
        y1=Math.round(Math.random()*(1+max-min)+min);
    }
    //carro2
    ctx.drawImage(img2,0,0,900,900,x2,y2,ancho,alto); 
    x2=x2+sx2;
	if(x2>canvas.width+500)
    	sx2=-sx2;
    if(x2+ancho<0){
        x2=2040;
        y2=Math.round(Math.random()*(1+max-min)+min);
    }
    //carro3
    ctx.drawImage(img3,0,0,900,900,x3,y3,ancho,alto); 
    x3=x3+sx3;
	if(x3>canvas.width+500)
    	sx3=-sx3;
    if(x3+ancho<0){
        x3=2210;
        y3=Math.round(Math.random()*(1+max-min)+min);
    }
    //police
    ctx.drawImage(img4,0,0,900,900,x4,y4,ancho,alto); 
    x4=x4+sx4;
	y4=y4+sy4;
	if(x4>canvas.width+500)
    	sx4=-sx4;
    if(y4>canvas.height-190 || y4<250)
    	sy4=-sy4;
    if(x4+ancho<0){
        x4=2380;
        y4=Math.round(Math.random()*(1+max-min)+min);
    }
}

function Marcador(){
    ctx.font="30px Arial";
    ctx.fillStyle="#FFFFFF";
    ctx.fillText("Marcador: "+marcador,canvas.width-200,150);
    //var puntajeMaximoElement = document.getElementById("puntajeMaximo");
    //puntajeMaximoElement.innerHTML = puntajeMaximo;
}

function Vidas(){
    ctx.font="30px Arial";
    ctx.fillStyle="#1B7161";
    ctx.fillText("Vidas: "+vidas,canvas.width-200,190);
}

function Instrucciones(){
    ctx.font="25px Arial";
    ctx.fillStyle="#0A0A0A";
    ctx.fillText("Instrucciones:",canvas.width-200,20);
    ctx.fillText("mouse(mover)",canvas.width-200,50);
    ctx.fillText("p=pausar",canvas.width-200,75);
    ctx.fillText("r=reiniciar",canvas.width-200,100);
}

function Pausa(){
    let audioElements = document.getElementsByTagName('audio');
    for(let i=0; i<audioElements.length; i++){
        audioElements[i].pause();
    }
    ctx.font="100px Arial";
    ctx.fillText("PAUSA",canvas.width/2-200,canvas.height/2);
}

function detectarColision(){
    if((x+120>=x1 && x<=x1+120 && y+50>=y1 && y<=y1+50)||(x+120>=x2 && x<=x2+120 && y+50>=y2 && y<=y2+50)||(x+120>=x3 && x<=x3+120 && y+50>=y3 && y<=y3+50)||(x+120>=x4 && x<=x4+120 && y+50>=y4 && y<=y4+50)){
        vidas--;
        flag = true;
        x1=1870;
        x2=2040;
        x3=2210;
        x4=2380;
        if(vidas==-1){
            reiniciar=false;
            vidas=3;
            marcador=0;
            marcadoraux=0;
            x1=1870;
            x2=2040;
            x3=2210;
            x4=2380;
        }    
    }
}

function dibujarExplosion(){
     ctx.drawImage(imgx,exp[indicexplosion][0],exp[indicexplosion][1],95,95,x+120,y,80,80);
     indicexplosion++;
     if(indicexplosion==limExp){
         flag=false;
         indicexplosion=0;
     }
 }

function mouseHanddle(e){
    var mouseRelativeX=e.clientX-canvas.offsetLeft;
    var mouseRelativeY=e.clientY-canvas.offsetLeft;
    if(mouseRelativeX>0 && mouseRelativeX<canvas.width)
        x=mouseRelativeX-ancho/2;
        y=mouseRelativeY-alto/2;
        if(y>canvas.height-200)
            y=750;
        if(y<canvas.height-700)
            y=220;
        if(x>canvas.width-ancho)
            x=canvas.width-ancho;
        if(x<0)
            x=0;
}

function manejadorTecladoAbajo(e){
    if(e.keyCode==80 && reiniciar==true){
        //pausar
        pausa=!pausa;
        if(pausa == false){
            let audioElements = document.getElementsByTagName('audio');
            for(let i=0; i<audioElements.length; i++){
                audioElements[i].play();
            }
        }
    }
    if(e.keyCode==82 && pausa==false){
        //reiniciar
        reiniciar=!reiniciar;
        vidas=3;
        marcador=0;
        marcadoraux=0;
        x1=1870;
        x2=2040;
        x3=2210;
        x4=2380;
    }
}