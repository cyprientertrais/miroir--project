import speech_recognition

class Recognition():
    """
    Listen function that listen on microphone what you say.
    It uses Google API.
    """

    def __init__(self):
        self.noise = 0.5

    def listen(self) -> list:
        recognition = speech_recognition.Recognizer()

        text = list()

        with speech_recognition.Microphone() as source:

            try:
                recognition.adjust_for_ambient_noise(source, duration=self.noise)
                
                audio = recognition.listen(source)
                text = recognition.recognize_google(audio, show_all=False, language="fr-FR")

            except speech_recognition.UnknownValueError:
                print("Recognition error")
                raise ValueError
                
            except speech_recognition.RequestError:
                print("Connection error")
                raise ConnectionError
        
        text = text.lower().split(' ')

        return text

if __name__ == "__main__":

    print("ecoute")
    print(Recognition().listen())
