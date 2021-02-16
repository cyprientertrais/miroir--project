import speech_recognition
from time import sleep
import requests
import asyncio
import websockets
import json

class VocaleRecognition():

    waker=["aulnat","wina","winner","lina","inna","linda","diana","oyonnax","anna","amina", "bonjour", "miroir"]
    # waker=["oïna","Toto"]

    uri = "ws://localhost:8765"


    def main(self):
        """
        Main function that wait for waker word
        """
        
        self.waiting()
        print("Je vous écoute")
        words = self.listen()
        if words == None:
            data = dict(
                text=words,
                status=404
                )
        else:
            data = dict(
                text=words,
                status=200
                )
        dataJson = json.dumps(data)
        self.send(dataJson)

    def itemInCommon(self, list1 : list, list2 : list) -> str:


        if type(list1) == list and type(list2) == list:
            if len(list1)<len(list2):
                shorter = list1
                longuer = list2
            else:
                shorter = list2
                longuer = list1

            for elt in shorter :
                if elt in longuer:
                    return elt

            return None

        else:
            if type(list1) == str:
                if list1 in list2 :
                    return list1
                else:
                    return None

            else:
                if list2 in list1 :
                    return list2
                else:
                    return None        
        
        
        return None


    def waiting(self):
        
        while(True):
            print("Attente de sortie de veille")
            text = self.listen()
            if text == None :
                continue
            value = self.itemInCommon(text, self.waker)
            if value != None:
                return True


    def send(self, data):
        
        asyncio.get_event_loop().run_until_complete(self.sendWS(data))

    async def sendWS(self, data):
        async with websockets.connect(self.uri) as websocket:

            await websocket.send(data)
            print(data)

            # greeting = await websocket.recv()
            # print(f"< {greeting}")

    def listen(self) -> list:

        recognition = speech_recognition.Recognizer()

        text = list()

        with speech_recognition.Microphone() as source:

            try:
                recognition.adjust_for_ambient_noise(source, duration=0.5)
                
                # print("Ecoute...")
                audio = recognition.listen(source)
                text = recognition.recognize_google(audio, show_all=False, language="fr-FR")

            except speech_recognition.UnknownValueError:
                print("Recognition error")
                return None
                # raise speech_recognition.UnknownValueError
                
            except speech_recognition.RequestError:
                print("Connection error")
                return None
                # raise speech_recognition.RequestError
        
        # if type(text) == str:
        #     text = [text]

        text = text.lower()
        # print(text)
        return text

if __name__=="__main__":

    vr = VocaleRecognition()
    # vr.main()

    vocal =["BOnjour","Wino"]

    vr.main()
    

    # data = dict(
    #             text="words",
    #             status=404
    #         )
    
    # js = json.loads(data)

    # print(js)