#!/usr/bin/env python3
import RPi.GPIO as GPIO  
from time import sleep

def execute():
    
    pinEcran = 19

    # On envoie le signal à l'écran et son état initial est haut
    GPIO.setup(pinEcran, GPIO.OUT, initial=GPIO.HIGH)
    # On appui sur le bouton
    GPIO.output(pinEcran, GPIO.LOW)
    sleep(0.5)
    # On relache le bouton
    GPIO.output(pinEcran, GPIO.HIGH)
    # On attend pour être certain que l'utilisateur ne lance pas plusieurs
    # instances lorsqu'il passe pas sa main plusieurs fois.
    sleep(2)

if __name__ == "__main__":
    execute()
