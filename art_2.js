    
    
    
    var hydra = new Hydra({detectAudio: false, canvas: synth})

    hydra.setResolution(500, 500);
  
   

   // var c = document.getElementById("synth");
   // var ctx = c.getContext("2d");
   // ctx.fillStyle = "blue";
   // ctx.arc(10, 75, 50, 0, 2 * Math.PI);
    //ctx.stroke();
    //ctx.clip();
  

    //Quantum Time by @siberelis

    s0.initImage("ava.png")
    
 
   
   src(s0)

    .rotate( () => time%360 * -0.8)


    .repeatX(5, 0)
    .repeatY(5, 0)
    
    .rotate( () => time%360 * -0.2)

    .modulateRotate(src(s0),10)
    
    .out(o0)