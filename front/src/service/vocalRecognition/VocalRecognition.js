import store from "../../store/index";
import { speakText } from "../../utils/utils";

export default class VocalRecognition {
  vocalProcess() {
    window.SpeechRecognition =
      window.webkitSpeechRecognition || window.SpeechRecognition;

    if ("SpeechRecognition" in window) {
      console.log("supported speech");
    } else {
      console.error("speech not supported");
    }
    const recognition = new window.SpeechRecognition();
    recognition.lang = "fr-FR";
    recognition.onresult = event => {
      console.log("Treating info....");
      this.vocalTreatment(
        event.results[event.results.length - 1][0].transcript
      );
    };
    recognition.onstart = function() {
      console.log("Listening ...");
    };
    recognition.onspeechend = function() {
      //recognition.stop();
      recognition.start();
      // sets off a beep/noise each time it is accessed from a cell phone (Andoid).

      // does NOT if accessed from a desktop (Windows using Chrome).
    };
    recognition.onerror = function(e) {
      console.log("ERROR", e);
    };
    recognition.start();
  }

  vocalTreatment(vocalText) {
    const vocalTextTreat = vocalText.trim();
    console.log("VOCALTEXT: " + vocalText.trim());
    if (vocalTextTreat.match(/^miroir/g)) {
      // PHRASES TYPES -> Miroir affiche le profile de Toto, Miroir met le profil de Toto
      if (vocalTextTreat.match(/profil de [a-zA-Zéèàê]*/g)) {
        let foundInfo = vocalTextTreat.match(/profil de [a-zA-Zéèàê]*/g) + " ";
        let tab = foundInfo.split(" ");
        store.dispatch("changeProfile", tab[2]);
        return 0;
        // PHRASES TYPES -> Miroir met la radio Fun Radio, Miroir met moi la radio RTL2
      } else if (
        vocalTextTreat.match(/radio [a-zA-Zéèàê0-9]*.[a-zA-Zéèàê0-9]*/g)
      ) {
        const foundInfo =
          vocalTextTreat.match(/radio [a-zA-Zéèàê0-9]*.[a-zA-Zéèàê0-9]*/g) +
          " ";
        this.radioTreatment(foundInfo);
        return 0;
        // PHRASES TYPES -> Miroir met le journal LeMonde, Miroir affiche le jounal Figaro
      } else if (
        vocalTextTreat.match(/journal [a-zA-Zéèàê0-9]*.[a-zA-Zéèàê0-9]*/g)
      ) {
        console.log("Action NEWS détectée mais pas encore opé");
        return 0;
        // this.$store.dispatch("changeNews", this.getInfo(foundInfo));
        // PHRASES TYPES -> Miroir met toi en veille, Miroir mise en veille
      } else if (vocalTextTreat.match(/en veille/g)) {
        console.log("Action VEILLE détectée mais pas encore opé");
        return 0;
        // this.$store.dispatch("eveMode");
        // PHRASES TYPES -> Miroir met toi en marche, Miroir mise en marche
      } else if (vocalTextTreat.match(/en marche/g)) {
        console.log("Action MARCHE détectée mais pas encore opé");
        return 0;
        // this.$store.dispatch("awakeMode");
      } else {
        speakText("Cette fonction du miroir n'a pas été reconnu");
        return 0;
      }
    } else {
      console.log("Action non trouvée");
      return 0;
    }
  }

  getInfo(foundInfo) {
    console.log(foundInfo);
    let tab = foundInfo.split(" ");
    if (tab.length == 2) {
      return tab[1];
    } else {
      return tab[1] + " " + tab[2];
    }
  }

  radioTreatment(foundInfo) {
    console.log(foundInfo);
    if (foundInfo.match(/en marche/g)) {
      console.log("PLAY RADIO");
      // this.$store.dispatch("playRadio");
    } else if (foundInfo.match(/en pause/g)) {
      console.log("STOP RADIO");
      // this.$store.dispatch("stopRadio");
    } else if (foundInfo.match(/suivante/g)) {
      console.log("NEXT RADIO");
      // this.$store.dispatch("nextRadio");
    } else if (foundInfo.match(/précédente/g)) {
      console.log("PREVIOUS RADIO");
      // this.$store.dispatch("previousRadio");
    } else {
      console.log("CHANGE RADIO VERS " + foundInfo);
      // this.$store.dispatch("changeRadio", getInfo);
    }
  }
}
