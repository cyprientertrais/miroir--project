export function captitalizeFirstLetter(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export function answerToVocal(vocalText, answerInfo) {
  switch (vocalText) {
    case "profileUnknown":
      console.log(`Le profil ${answerInfo} n'existe pas.`)
      speakText(`Le profil ${answerInfo} n'existe pas.`);
      break;
    case "radioUnknown":
      console.log(`La radio ${answerInfo} n'existe pas.`)
      speakText(`La radio ${answerInfo} n'existe pas.`);
      break;
    case "newsUnknown":
      console.log(`Le journal ${answerInfo} n'existe pas ou n'est pas traité.`)
      speakText(
          `Le journal ${answerInfo} n'existe pas ou n'est pas traité.`
      );
      break;
    case "profileAnswer":
      console.log(`Voici le profil de ${answerInfo}`)
      speakText(`Voici le profil de ${answerInfo}`);
      break;
    case "radioAnswer":
      console.log("Pas de réponse pour la radio");
      break;
    case "commonError":
      console.log("Il y a eu une erreur lors de votre demande");
      speakText("Il y a eu une erreur lors de votre demande");
      break;
    default:
      console.log("Pas de cas trouvé");
  }
}

export function speakText(text){
  document.getElementById('vocal-text').innerHTML = text;
  document.getElementById("play").click();
}
