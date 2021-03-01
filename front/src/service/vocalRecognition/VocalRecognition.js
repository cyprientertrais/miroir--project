import store from "../../store/index";

export default class VocalRecognition {
  vocalProcess(){
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
    console.log("Listening ...")
    recognition.onresult = event => {
      console.log(
        "transscript: ",
        event.results[event.results.length - 1][0].transcript
      );
      console.log("Treating info....")
      this.vocalTreatment(
        event.results[event.results.length - 1][0].transcript
      );
    };
    recognition.onerror = function(err){
      console.log(err);
    }
    recognition.onend = function() {
      recognition.start();

      // sets off a beep/noise each time it is accessed from a cell phone (Andoid).

      // does NOT if accessed from a desktop (Windows using Chrome).
    };
    recognition.start();
  }

  vocalTreatment(vocalText){
    let foundInfo = "";
    if (vocalText.match(/^miroir/g)) {
      switch (vocalText) {
        

        // PHRASES TYPES -> Miroir affiche le profile de Toto, Miroir met le profil de Toto
        case (vocalText.match(/profil de [a-zA-Zéèàê]*/g) != null):

          foundInfo = vocalText.match(/profil de [a-zA-Zéèàê]*/g);
          store.dispatch("changeProfile", this.getInfo(foundInfo));
          break;
        // PHRASES TYPES -> Miroir met la radio Fun Radio, Miroir met moi la radio RTL2
        case vocalText.match(/radio [a-zA-Zéèàê0-9]*.[a-zA-Zéèàê0-9]*/g):
          foundInfo = vocalText.match(
            /radio [a-zA-Zéèàê0-9]*.[a-zA-Zéèàê0-9]*/g
          );
          this.radioTreatment(foundInfo);
          break;
        // PHRASES TYPES -> Miroir met le journal LeMonde, Miroir affiche le jounal Figaro
        case vocalText.match(/journal [a-zA-Zéèàê0-9]*.[a-zA-Zéèàê0-9]*/g):
          foundInfo = vocalText.match(
            /journal [a-zA-Zéèàê0-9]*.[a-zA-Zéèàê0-9]*/g
          );
          // this.$store.dispatch("changeNews", this.getInfo(foundInfo));
          break;
        // PHRASES TYPES -> Miroir met toi en veille, Miroir mise en veille
        case vocalText.match(/en veille/g):
          // this.$store.dispatch("eveMode");
          break;
        // PHRASES TYPES -> Miroir met toi en marche, Miroir mise en marche
        case vocalText.match(/en marche/g):
          // this.$store.dispatch("awakeMode");
          break;
        default:
          console.log("** MIROIR EN DEBUT MAIS PAS DE CAS **");
      }
    } else {
      // speakText("Cette action n'a pas été reconnu, veuillez réessayer")
      console.log("Action non trouvée");
    }
  }

  getInfo(foundInfo) {
    console.log(foundInfo);
    if (foundInfo.length() == 2) {
      return foundInfo[1];
    } else {
      return foundInfo[1] + " " + foundInfo[2];
    }
  }

  radioTreatment(foundInfo){
    switch (foundInfo) {
      case foundInfo.match(/en marche/):
        // this.$store.dispatch("playRadio");
        break;
      case foundInfo.match(/en pause/):
        // this.$store.dispatch("stopRadio");
        break;
      case foundInfo.match(/suivante/):
        // this.$store.dispatch("nextRadio");
        break;
      case foundInfo.match(/précédente/):
        // this.$store.dispatch("previousRadio");
        break;
      default:
        // this.$store.dispatch("changeRadio", getInfo);
        break;
    }
  }

  answerToVocal (vocalText, answerInfo) {
    switch (vocalText) {
      case "profileUnknown":
        this.textToSpeak(`Le profil ${answerInfo} n'existe pas.`);
        break;
      case "radioUnknown":
        this.textToSpeak(`La radio ${answerInfo} n'existe pas.`);
        break;
      case "newsUnknown":
        this.textToSpeak(
          `Le journal ${answerInfo} n'existe pas ou n'est pas traité.`
        );
        break;
      case "profileAnswer":
        this.textToSpeak(`Voici le profil de ${vocalText}`);
        break;
      case "radioAnswer":
        console.log("Pas de réponse pour la radio");
        break;
      case "commonError":
        this.textToSpeak("Il y a eu une erreur lors de votre demande");
        break;
      default:
        console.log(" No case ");
    }
  }

  textToSpeak(vocalText) {
    let utterance = new SpeechSynthesisUtterance(vocalText);
    utterance.lang = "fr-FR";
    speechSynthesis.speak(utterance);
  }
}
