

function myFunction() {       //   https://jsfiddle.net/exrx8e1y/    

    dtlarea=document.getElementById("details");
    //dtlarea.style.display="none";
    dtltxt="";
  
    var mytimer = setInterval(function() {
      
        var voices = speechSynthesis.getVoices();
        //console.log(voices);
        if (voices.length !== 0) {
  
          var msg = new SpeechSynthesisUtterance();
  
          msg.rate = document.getElementById("rate").value; // 0.1 to 10
          msg.pitch = document.getElementById("pitch").value; //0 to 2
          msg.volume = document.getElementById("volume").value; // 0 to 1
           
          msg.text = document.getElementById("sampletext").value; 
          msg.lang =  document.getElementById("lang").value; //'it_IT';
           
          for(var i=0;i<voices.length;i++){
  
              dtltxt+=voices[i].lang+' '+voices[i].name+'\n';
             
              if(voices[i].lang==msg.lang) {
                msg.voice = voices[i]; // Note: some voices don't support altering params
                msg.voiceURI = voices[i].voiceURI;
                // break;
              }
          }
           
          msg.onend = function(e) {
            console.log('Finished in ' + event.elapsedTime + ' seconds.');
            dtlarea.value=dtltxt; 
          };
           
          speechSynthesis.speak(msg);
  
          clearInterval(mytimer);
          
        }
    }, 1000);
  
  } 

      