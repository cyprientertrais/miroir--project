class Vocal {
  start() {
    window.SpeechRecognition =
      window.webkitSpeechRecognition || window.SpeechRecognition;

    if ("SpeechRecognition" in window) {
      console.log("supported speech");
    } else {
      console.error("speech not supported");
    }
    const recognition = new window.SpeechRecognition();
    //recognition.continuous = true;
    recognition.lang = "fr-FR";
    recognition.onresult = event => {
      console.log(
        "transscript: ",
        event.results[event.results.length - 1][0].transcript
      );
      if (
        event.results[event.results.length - 1][0].transcript.indexOf(
          "miroir"
        ) != -1
      ) {
        let utterance = new SpeechSynthesisUtterance("Bonjour maître");
        utterance.lang = "fr-FR";
        speechSynthesis.speak(utterance);
        if (
          event.results[event.results.length - 1][0].transcript.indexOf(
            "profil"
          ) != -1
        ) {
          let utterance = new SpeechSynthesisUtterance(
            "Allez j'affiche le profile mais carmelo c'est le plus beau"
          );
          utterance.lang = "fr-FR";
          speechSynthesis.speak(utterance);
        } else {
          // let utterance = new SpeechSynthesisUtterance(
          //   "commande inconnu connard mais le plus gros des connard c'est papy"
          // );
          //utterance.lang = "fr-FR";
          //speechSynthesis.speak(utterance);
        }
      }
    };
    recognition.onend = function() {
      recognition.start();

      // sets off a beep/noise each time it is accessed from a cell phone (Andoid).

      // does NOT if accessed from a desktop (Windows using Chrome).
    };

    recognition.start();
  }
}

export default Vocal;
