import {TimelineMax} from 'gsap';
import './app'
import "../style/style.sass";
import 'pixi.js'
let state = {pos:0}

$('body').on('click',()=>{
  let tl = new TimelineMax();
  let tl1 = new TimelineMax();

  tl
    .to(state, 1.5, {
      pos:1,
      onUpdate: function (){
        let perc = '-'+state.pos*100+'%';
        let perc1 = '-'+state.pos*state.pos*100+'%';
        let perc2 = '-'+state.pos*state.pos*state.pos*100+'%';
        
        tl1
        .set('.slider__1 .slider__wrap',{x:perc})
        .set('.slider__2 .slider__wrap',{x:perc1},0)
        .set('.slider__3 .slider__wrap',{x:perc2},0)
      }
    })

})


// WEBGL implomentation
var app = new PIXI.Application(900,600);
document.body.appendChild(app.view);


// Create background image
var background = PIXI.Sprite.fromImage('img/5_.jpg');
background.width = app.renderer.width;
background.height = app.renderer.height;



app.stage.addChild(background);


// Stop application wait for load to finish
app.stop();

PIXI.loader.add('shader', '/js/shader.frag')
    .load(onLoaded);

var filter;


function onLoaded(loader,res) {


    filter = new PIXI.Filter(null, res.shader.data);

    background.filters = [filter];

    filter.uniforms.currentimage = background._texture;
    app.start();
}


app.ticker.add(function(delta) {

});