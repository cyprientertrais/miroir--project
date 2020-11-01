#!/usr/bin/env python3
  
import RPi.GPIO as GPIO  
from time import sleep

# Désactive les warnings
GPIO.setwarnings(False)

# Mode BCM de la Pi
GPIO.setmode(GPIO.BCM)  

# Définition des pins
pinCapteur = 26 # Signal du capteur
pinEcran = 19   # Signal de l'écran

# Définition des GPIO
# On envoie le signal à l'écran et son état initial est haut
GPIO.setup(pinEcran, GPIO.OUT, initial=GPIO.HIGH)
# On reçoit le signal du capteur et on active la résistance pull-up
GPIO.setup(pinCapteur, GPIO.IN, pull_up_down=GPIO.PUD_UP) 
  
# Boucle
while True :
    try:
        # On attent un front montant
        GPIO.wait_for_edge(pinCapteur, GPIO.RISING)
        # On appui sur le bouton
        GPIO.output(pinEcran, GPIO.LOW)
        sleep(0.5)
        # On relache le bouton
        GPIO.output(pinEcran, GPIO.HIGH)
        # On attend pour être certain que l'utilisateur ne lance pas plusieurs
        # instances lorsqu'il passe pas sa main plusieurs fois.
        sleep(2)

    # En cas d'arrêt par Ctrl+C
    except KeyboardInterrupt:
        # On réinitialise les pins
        GPIO.cleanup()
        # On ferme le programme
        exit()