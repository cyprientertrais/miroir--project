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
        return json.dumps({'action': 'changeProfile', 'info': (info)})
    elif actionType == ActionType.ChangeRadio:
        return json.dumps({'action': 'changeRadio', 'info': (info)})
    elif actionType == ActionType.ChangeNews:
        return json.dumps({'action': 'changeNews', 'info': (info)})
    else:
        print("ActionType not found")


def returnVocalInfo(vocalText, actionMirror):
    res = ""
    if actionMirror == ActionType.ChangeProfile:
        # PHRASES TYPES -> Miroir affiche le profile de Toto, Miroir met le profil de Toto
        x = re.search("profil de [a-zA-Z]*", vocalText)
        if x:
            res = x.group(0).split()[2]
    elif actionMirror == ActionType.ChangeRadio:
        # PHRASES TYPES -> Miroir met la radio Fun Radio, Miroir met moi la radio RTL2
        x = re.search("radio [a-zA-Z0-9]*.[a-zA-Z0-9]*", vocalText)
        print(x)
        if x:
            print(len(x.group(0).split()))
            if len(x.group(0).split()) == 2:
                res = x.group(0).split()[1]
            else:
                res = x.group(0).split()[1] + x.group(0).split()[2]
    elif actionMirror == ActionType.MiseEnVeille:
        # PHRASES TYPES -> Miroir met toi en veille, Miroir mise en veille
        x = re.search("en veille", vocalText)
        if x:
            res = "VEILLE"
        # TODO NEWS
    else:
        print("Action non traité")
    return res


def vocalTextTreatment(vocalText) -> json:

    json = ""
    profileName = returnVocalInfo(vocalText, ActionType.ChangeProfile)
    radioName = returnVocalInfo(vocalText, ActionType.ChangeRadio)
    enVeille = returnVocalInfo(vocalText, ActionType.MiseEnVeille)

    if re.search("^miroir", vocalText):
        if profileName != "":
            json = createJson(profileName, ActionType.ChangeProfile)
            return json
        elif radioName != "":
            json = createJson(radioName, ActionType.ChangeRadio)
            return json
        elif enVeille != "":
            print("** Lancement du script de Démarrage/Extinction du miroir **")
            system("python3 ../Interrupteur/screen.py")
            return ""
        # CHANGE NEWS TODO
        else:
            speakText("Cette action n'a pas été reconnu, veuillez réessayer")
            print("MIROIR EN DEBUT MAIS PAS DE CAS")
    else:
        actionNotTreated()
        print("NOPE")
    return json


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
