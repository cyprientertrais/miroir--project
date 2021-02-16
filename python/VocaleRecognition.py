# from time import sleep
from Websocket import Websocket
import json
from Recognition import Recognition

class VocaleRecognition():

    waker=["aulnat","wina","winner","lina","inna","linda","diana","oyonnax","anna","amina", "bonjour", "miroir"]

    def main(self):
        """
        Main function that wait for waker word
        """
        
        self.waiting()
        
        words = str()
        status = int()
        
        try:
            words = Recognition().listen()
            status = 1
        except ValueError:
            words = "Noise Issu"
            status = 2
        except ConnectionError:
            words = "Internet Connection Issu"
            status = 3

        data = dict(
            text=words,
            status=status
            )

        Websocket(port = 8765).send(data=json.dumps(data))

    def itemInCommon(self, list1 : list, list2 : list) -> str:
        """
        Compare two strings and return common words
        """

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
        """
        waiting function that waiting waker word
        """
        
        while(True):
            print("Attente de sortie de veille")
            try:
                text = Recognition().listen()
            except ValueError:
                continue
            except ConnectionError:
                continue

            value = self.itemInCommon(text, self.waker)
            if value != None:
                print("Fin de la veille")
                return True

if __name__=="__main__":

    vr = VocaleRecognition()
    vr.main()