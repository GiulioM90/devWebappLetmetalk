/*



HTML 
   <form>
      <input type="text" class="txt">
      <div>
        <label for="rate">Rate</label><input type="range" min="0.5" max="2" value="1" step="0.1" id="rate">
        <div class="rate-value">1</div>
        <div class="clearfix"></div>
      </div>
      <div>
        <label for="pitch">Pitch</label><input type="range" min="0" max="2" value="1" step="0.1" id="pitch">
        <div class="pitch-value">1</div>
        <div class="clearfix"></div>
      </div>
      <select>
    
      </select>
    </form>
/HTML


var synth = window.speechSynthesis;

var inputForm = document.querySelector('form');
var inputTxt = document.querySelector('.txt');
var voiceSelect = document.querySelector('select');

var pitch = document.querySelector('#pitch');
var pitchValue = document.querySelector('.pitch-value');
var rate = document.querySelector('#rate');
var rateValue = document.querySelector('.rate-value');

var voices = [];


function populateVoiceList() {
    voices = synth.getVoices();
  
    for(i = 0; i < voices.length ; i++) {
      var option = document.createElement('option');
      option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
  
      if(voices[i].default) {
        option.textContent += ' -- DEFAULT';
      }
  
      option.setAttribute('data-lang', voices[i].lang);
      option.setAttribute('data-name', voices[i].name);
      voiceSelect.appendChild(option);
    }
  }


  populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}


inputForm.onsubmit = function(event) {
    event.preventDefault();
  
    var utterThis = new SpeechSynthesisUtterance(inputTxt.value);
    var selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
    for(i = 0; i < voices.length ; i++) {
      if(voices[i].name === selectedOption) {
        utterThis.voice = voices[i];
      }
    }
    utterThis.pitch = pitch.value;
    utterThis.rate = rate.value;
    synth.speak(utterThis);


    utterThis.onpause = function(event) {
        var char = event.utterance.text.charAt(event.charIndex);
        console.log('Speech paused at character ' + event.charIndex + ' of "' +
        event.utterance.text + '", which is "' + char + '".');
      }
      inputTxt.blur();
    }

    pitch.onchange = function() {
        pitchValue.textContent = pitch.value;
      }
      
      rate.onchange = function() {
        rateValue.textContent = rate.value;
      }

*/

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

      