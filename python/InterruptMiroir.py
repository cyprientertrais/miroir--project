#!/usr/bin/env python3
  
import RPi.GPIO as GPIO  
from time import sleep

GPIO.setmode(GPIO.BCM)  

pinCapteur = 26
pinEcran = 19

GPIO.setup(pinEcran, GPIO.OUT, initial=GPIO.HIGH)
GPIO.setup(pinCapteur, GPIO.IN, pull_up_down=GPIO.PUD_UP) 
  
while True :
    GPIO.wait_for_edge(pinCapteur, GPIO.RISING)
    # On appui sur le bouton
    GPIO.output(pinEcran, GPIO.DOWN)
    sleep(0.5)
    # On relache le bouton
    GPIO.output(pinEcran, GPIO.UP)
    # On attend pour être certain que l'utilisateur ne lance pas plusieurs
    # instances lorsqu'il passe pas sa main plusieurs fois.
    sleep(2)

# GPIO.add_event_detect(pinCapteur, GPIO.RISING, callback=my_callback)