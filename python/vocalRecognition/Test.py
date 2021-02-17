import speech_recognition as sr
import pyttsx3
import json
import re
from ActionType import ActionType
import websockets

# Initialize the recognizer
r = sr.Recognizer()

# Function to convert text to
# speech
def SpeakText(command):

    # Initialize the engine
    engine = pyttsx3.init()
    engine.say(command)
    engine.runAndWait()


def createJson(info, actionType: ActionType):

    if actionType == ActionType.ChangeProfile:
        return json.dumps({'action': ('changeProfile'),'name': (info)})
    elif actionType == ActionType.ChangeRadio:
        return json.dumps({'action': ('changeRadio'),'name': (info)})
    elif actionType == ActionType.ChangeNews:
        return json.dumps({'action': ('changeNews'),'name': (info)})
    else:
        return json.dumps({'error': ('error occured')})

    #GO BASH miseEnVeille = "{\"action\": changeRadio, \"radio\": {}}"

def returnVocalInfo(vocalText, actionMirror):
    res = ""
    if actionMirror == ActionType.ChangeProfile:
        #PHRASES TYPES -> Miroir affiche le profile de Toto, Miroir met le profil de Toto
        x = re.search("profil de [a-zA-Z]*", vocalText)
        if x:
            res = x.group(0).split()[2]
    elif actionMirror == ActionType.ChangeRadio:
        #PHRASES TYPES -> Miroir met la radio Fun Radio, Miroir met moi la radio RTL2
        x = re.search("radio [a-zA-Z0-9]*.[a-zA-Z0-9]*", vocalText)
        if x:
            if x.group(0).find("rtl2"):
                res = "rtl2"
            else:
                res = x.group(0).split()[1] + x.group(0).split()[2]
    elif actionMirror == ActionType.MiseEnVeille:
        #PHRASES TYPES -> Miroir met toi en veille, Miroir mise en veille
        x = re.search("en veille", vocalText)
        if x:
            res = "VEILLE"
        #TODO
    else:
        print("Action non traité")
    print(res)
    return res

def vocalTextTreatment(vocalText) -> json:

    profileName = returnVocalInfo(vocalText,ActionType.ChangeProfile)
    radioName = returnVocalInfo(vocalText,ActionType.ChangeRadio)
    enVeille = returnVocalInfo(vocalText,ActionType.MiseEnVeille)

    if re.search("^miroir", vocalText):
        json = str()
        if profileName != "":
            print("OK PROFILE = {}".format(profileName))
            # print(createJson(profileName, ActionType.ChangeProfile))
            json = createJson(profileName, ActionType.ChangeProfile)
            return json
        elif radioName != "":
            print("OK RADIO = {}".format(radioName))
            json = createJson(radioName, ActionType.ChangeRadio)
            return json
        elif enVeille != "":
            print("OK MISE EN VEILLE")
            # CHANGE NEWS TODO
        else:
            print("MIROIR EN DEBUT MAIS PAS DE CAS")
    else:
        print("NOPE")


async def launchListening(websocket):
    # Loop infinitely for user to
    # speak
    while 1:

        # Exception handling to handle
        # exceptions at the runtime
        try:

            # use the microphone as source for input.
            with sr.Microphone() as source2:

                # wait for a second to let the recognizer
                # adjust the energy threshold based on
                # the surrounding noise level
                print("Surrounding noise level....")
                r.adjust_for_ambient_noise(source2, duration=0.2)

                #listens for the user's input
                print("Listening....")
                audio2 = r.listen(source2)

                print("Treating info....")
                # Using ggogle to recognize audio
                myText = r.recognize_google(audio2,language="fr-FR")
                myText = myText.lower()

                print("As tu dis : "+myText + " ?")
                #SpeakText(myText)
                json = vocalTextTreatment(myText)
                print(json)
                await websocket.send(json)
                print("Sent")

        except sr.RequestError as e:
            print("Could not request results; {0}".format(e))

        except sr.UnknownValueError:
            print("unknown error occured")

if __name__ == "__main__":

    launchListening()
