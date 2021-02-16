# Python program to translate
# speech to text and text to speech
import speech_recognition as sr
import pyttsx3
import json
from ActionWS import ActionWS

# Initialize the recognizer
r = sr.Recognizer()

# Function to convert text to
# speech
def SpeakText(command):

    # Initialize the engine
    engine = pyttsx3.init()
    engine.say(command)
    engine.runAndWait()


def createJson(info, actionType: ActionWS):

    print(actionType)
    if actionType == ActionWS.ChangeProfile:
        return json.dumps({'action': ('changeProfile'),'name': (info)})
    elif actionType == ActionWS.ChangeRadio:
        return json.dumps({'action': ('changeRadio'),'name': (info)})
    elif actionType == ActionWS.ChangeNews:
        return json.dumps({'action': ('changeNews'),'name': (info)})
    else:
        return json.dumps({'error': ('error occured')})

    #GO BASH miseEnVeille = "{\"action\": changeRadio, \"radio\": {}}"

def vocalTextTreatment(vocalText):
    array = vocalText.split(" ")
    if array[0] == "miroir":
        if vocalText.find("affiche le profil de") != -1 and len(array) == 6 :
            profileName = array[5]
            print("OK PROFILE = {}".format(profileName))
            print(createJson(profileName, ActionWS.ChangeProfile))
        elif vocalText.find("mets la radio") != -1 and (len(array) == 5 or len(array) == 6):
            radioName = vocalText[20:]
            print("OK RADIO = {}".format(radioName))
            print(createJson(radioName, ActionWS.ChangeRadio))
            # CHANGE NEWS TODO
        elif vocalText.find("mise en veille") or vocalText.find("mets-toi en veille") != -1 and (len(array) == 4):
            print("OK MISE EN VEILLE")
        else:
            print("MIROIR BUT NOPE")
    else:
        print("NOPE")

# Loop infinitely for user to
# speak

while(1):

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
            vocalTextTreatment(myText)
            SpeakText(myText)

    except sr.RequestError as e:
        print("Could not request results; {0}".format(e))

    except sr.UnknownValueError:
        print("unknown error occured")


createJson("Toto","changeProfile")
vocalTextTreatment("miroir affiche le profil de Toto")
vocalTextTreatment("miroir mets la radio Virgin radio")
str = "Fun Radio , RTL2 Europe 1 France Inter Virgin Radio"
