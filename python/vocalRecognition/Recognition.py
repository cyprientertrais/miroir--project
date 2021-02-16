import speech_recognition
import pyttsx3

class Recognition():
    """
    Listen function that listen on microphone what you say.
    It uses Google API.
    """

    def __init__(self):
        self.noise = 0.2

    def listen(self) -> list:
        recognition = speech_recognition.Recognizer()

        text = list()

        with speech_recognition.Microphone() as source:

            try:
                print("Surrounding noise level....")
                recognition.adjust_for_ambient_noise(source, duration=self.noise)

                print("Listening....")
                audio = recognition.listen(source)

                print("Treating info....")
                text = recognition.recognize_google(audio, show_all=False, language="fr-FR")
                print(text)
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
