#!/usr/bin/env python3
  
import RPi.GPIO as GPIO  
from time import sleep
import Pin

# Désactive les warnings
GPIO.setwarnings(False)

# Mode BCM de la Pi
GPIO.setmode(GPIO.BCM)  

# Définition des pins
pinCapteur = 26 # Signal du capteur

# Définition des GPIO
# On reçoit le signal du capteur et on active la résistance pull-up
GPIO.setup(pinCapteur, GPIO.IN, pull_up_down=GPIO.PUD_UP) 
  
# Boucle
while True :
    try:
        # On attent un front montant
        GPIO.wait_for_edge(pinCapteur, GPIO.RISING)
        Pin.execute()
 
    # En cas d'arrêt par Ctrl+C
    except KeyboardInterrupt:
        # On réinitialise les pins
        GPIO.cleanup()
        # On ferme le programme
        exit()