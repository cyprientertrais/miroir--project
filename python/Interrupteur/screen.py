#!/usr/bin/env python3
import RPi.GPIO as GPIO
from time import sleep
from os import environ
from sys import argv

__initVariable()

def __changeVariable():
    """
    Changement de l'état de la variable d'environnement.
    La variable correspond à l'état de l'écran. 
    """

    if environ['SCREEN']=='OFF':
        environ['SCREEN'] = 'ON'
        # print(environ['SCREEN'])
    else:
        environ['SCREEN'] = 'OFF'

def __initVariable():
    environ['SCREEN'] = 'OFF'

def getState() -> str:
    return environ['SCREEN']

def execute(state = None):

    if state == getState():
        return False

    # Désactive les warnings
    GPIO.setwarnings(False)

    # Mode BCM de la Pi
    GPIO.setmode(GPIO.BCM)

    pinEcran = 19

    __changeVariable()

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
    execute(state = argv[1])
