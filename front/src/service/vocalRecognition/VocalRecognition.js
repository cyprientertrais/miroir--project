import store from "../../store/index";
import { speakText } from "../../utils/utils";
import WidgetResources from "../resources/WidgetResources";

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
    recognition.continuous = true;
    recognition.onend = () => {
      recognition.start();
    };
    recognition.onresult = event => {
      console.log("Treating info....");
      this.vocalTreatment(
        event.results[event.results.length - 1][0].transcript
      );
    };
    recognition.onstart = function() {
      console.log("Listening ...");
    };
    // recognition.onend = function() {
    //   //recognition.stop();
    //   recognition.start();
    //   // sets off a beep/noise each time it is accessed from a cell phone (Andoid).

    //   // does NOT if accessed from a desktop (Windows using Chrome).
    // };
    recognition.onerror = function(e) {
      console.log("ERROR", e);
    };
    recognition.start();
  }

  async vocalTreatment(vocalText) {
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
      } else if (vocalTextTreat.match(/une blague/g)) {
        await this.sayJoke();
        return 0;
      } else if (vocalTextTreat.match(/au revoir/g)) {
        speakText("Au revoir , et merci , de vous être entretenu avec moi");

        return 0;
        // this.$store.dispatch("eveMode");
      }
      // PHRASES TYPES -> Miroir quel heure est-il ?
      else if (vocalTextTreat.match(/heure*/g)) {
        var date = new Date().toLocaleTimeString();
        speakText("Il est " + date);
        return 0;
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
      }
      // PHRASES TYPES -> Miroir présente toi
      else if (
        vocalTextTreat.match(/présente-toi/g) ||
        vocalTextTreat.match(/es-tu/g)
      ) {
        this.presentation();
        return 0;
      }
      // PHRASES TYPES -> Miroir met toi en marche, Miroir mise en marche
      else if (vocalTextTreat.match(/en marche/g)) {
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
    let tab = foundInfo.split(" ");
    if (tab.length == 2) {
      return tab[1];
    } else {
      return tab[1] + " " + tab[2];
    }
  }

  radioTreatment(foundInfo) {
    if (foundInfo.match(/en marche/g)) {
      console.log("PLAY RADIO");
      store.dispatch("playRadio");
    } else if (foundInfo.match(/en pause/g)) {
      console.log("STOP RADIO");
      store.dispatch("stopRadio");
    } else if (foundInfo.match(/suivante/g)) {
      console.log("NEXT RADIO");
      store.commit("nextRadio");
    } else if (foundInfo.match(/précédente/g)) {
      console.log("PREVIOUS RADIO");
      store.commit("previousRadio");
    } else {
      const radio = foundInfo.substring(6, foundInfo.length - 1);
      console.log("CHANGE RADIO VERS " + radio);
      store.dispatch("changeRadio", radio);
    }
  }

  async presentation() {
    speakText(`Bonjour je m'apelle Oiina et je suis votre humble serviteur. 
    Je vénère mes dieux, l'équipe Lapsuce,  qui m'ont donné la vie et jamais je ne pourrais assez les remercier pour cela. 
        Je laisse mes créateurs vous présenter mes capacités. Mais pour bien commencer cette présentation voici une petite blague : `);
    this.sayJoke(true);
  }

  async sayJoke(thanks) {
    let w = new WidgetResources();
    let blague = await w.getBlague();
    speakText(blague.data.joke.question);
    setTimeout(function() {
      speakText(blague.data.joke.answer);
      if (thanks) {
        speakText("Assez drôle je dois l'avouer ahahahah ahahahah");
      }
    }, 6000);
  }
}
