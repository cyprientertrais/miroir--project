import json
import re
import speech_recognition as sr
from TextToSpeak import *
from ActionType import ActionType
from os import system

# Initialize the recognizer
r = sr.Recognizer()

def createJson(info, actionType: ActionType):
    if actionType == ActionType.ChangeProfile:
        return json.dumps({'action': 'changeProfile', 'info': (info)},ensure_ascii=False)
    elif actionType == ActionType.ChangeRadio:
        return json.dumps({'action': 'changeRadio', 'info': (info)},ensure_ascii=False)
    elif actionType == ActionType.RadioPlay:
        return json.dumps({'action': 'radioPlay','info': (info)},ensure_ascii=False)
    elif actionType == ActionType.NextRadio:
        return json.dumps({'action': 'nextRadio','info': (info)},ensure_ascii=False)
    elif actionType == ActionType.ChangeNews:
        return json.dumps({'action': 'changeNews','info': (info)},ensure_ascii=False)
    else:
        print("ActionType not found")

def getInfo(x):
    if len(x.group(0).split()) == 2:
        res = x.group(0).split()[1]
    else:
        res = x.group(0).split()[1] + " " + x.group(0).split()[2]
    return res

def radioTreatment(radioInfo):
    if re.search("en marche", radioInfo):
        return createJson(True, ActionType.RadioPlay)
    elif re.search("en pause", radioInfo):
        return createJson(False, ActionType.RadioPlay)
    elif re.search("suivante", radioInfo):
        return createJson(True, ActionType.NextRadio)
    elif re.search("précédente", radioInfo):
        return createJson(False, ActionType.NextRadio)
    else:
        return createJson(radioInfo, ActionType.ChangeRadio)

def vocalTextTreatment(vocalText) -> json:

    if re.search("^miroir", vocalText):
        # PHRASES TYPES -> Miroir affiche le profile de Toto, Miroir met le profil de Toto
        if x := re.search("profil de [a-zA-Zéèàê]*", vocalText):
            res = x.group(0).split()[2]
            return createJson(res, ActionType.ChangeProfile)
        elif x := re.search("radio [a-zA-Zéèàê0-9]*.[a-zA-Zéèàê0-9]*", vocalText):
            # PHRASES TYPES -> Miroir met la radio Fun Radio, Miroir met moi la radio RTL2
            # Miroir met la radio en pause, Miroir met la radio en marche
            # Baisser/monter le son
            res = getInfo(x)
            return radioTreatment(res)
        elif x := re.search("journal [a-zA-Zéèàê0-9]*.[a-zA-Zéèàê0-9]*", vocalText):
            # PHRASES TYPES -> Miroir met le journal LeMonde, Miroir affiche le jounal Figaro
            res = getInfo(x)
            return createJson(res, ActionType.ChangeNews)
        elif re.search("en veille", vocalText):
            # PHRASES TYPES -> Miroir met toi en veille, Miroir mise en veille
            print("** Lancement du script de Démarrage/Extinction du miroir **")
            system("python3 ../Interrupteur/screen.py")
            return ""
        else:
            speakText("Cette action n'a pas été reconnu, veuillez réessayer")
            print("** MIROIR EN DEBUT MAIS PAS DE CAS **")
    else:
        actionNotTreated()

async def launchVocalRecognition():
    # Loop infinitely for user to
    # speak
    # while 1:

    # Exception handling to handle
    # exceptions at the runtime
    try:

        # use the microphone as source for input.
        with sr.Microphone() as source2:

            # wait for a second to let the recognizer
            # adjust the energy threshold based on
            # the surrounding noise level
            print("Surrounding noise level....")
            r.adjust_for_ambient_noise(source2, duration=0.4)

            # listens for the user's input
            print("Listening....")
            audio2 = r.listen(source2, phrase_time_limit=5)

            print("Treating info....")
            # Using google to recognize audio
            myText = r.recognize_google(audio2, language="fr-FR")
            myText = myText.lower()

            print("Detected voice : " + myText)
            return vocalTextTreatment(myText)

    except sr.RequestError as e:
        print("Could not request results; {0}".format(e))

    except sr.UnknownValueError:
        print("Unknown error occured")
