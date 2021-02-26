import pyttsx3
import json
from types import SimpleNamespace

# Function to convert text to
# speech
def speakText(command):

    # Initialize the engine
    engine = pyttsx3.init()

    # print(engine.getProperty('rate'))
    engine.setProperty('rate', 165)
    # print(engine.getProperty('volume'))
    # engine.setProperty('volume', 1.0)

    engine.say(command)
    engine.runAndWait()

def actionNotTreated():
    speakText("Il y a eu un problème lors de votre demande.")

def analyseResponse(response : str):
    response = json.loads(response, object_hook=lambda d: SimpleNamespace(**d))
    if response.answerType != None :
        if response.answerType == "profileUnknown":
            speakText("Le profil {} n'existe pas.".format(response.info))
        elif response.answerType == "radioUnknown":
            speakText("La radio {} n'existe pas.".format(response.info))
        elif response.answerType == "categorieUnknown":
            speakText("Le journal {} n'existe pas.".format(response.info))
        elif response.answerType == "profileAnswer":
            speakText("Voici le profil de {} mais sachez que j'aurai préféré afficher le profil de Alban.".format(response.info))
        elif response.answerType == "radioAnswer":
            print("Non traité pour le moment")
        elif response.answerType == "commonError":
            speakText("Il y a eu une erreur lors de votre demande")
        else:
            print("Cas non traité")
    else:
        print("Problème lors du traitement de la réponse")

