#!/usr/bin/env python3
import asyncio
import websockets
from time import sleep
from TextToSpeak import *
from VocalRecognition import *

async def server(websocket, path):
        while 1:
            data = await launchVocalRecognition()
            #try:
            if data:
                print(f"> SENDING JSON : {data}")
                await websocket.send(data)
                print("Waiting message from client..")
                response = await websocket.recv()
                print(f"< RECEIVED FROM CLIENT :  {response}")
                analyseResponse(response)
                sleep(3)
            else:
                print("The data is empty")
            #except:
            #    print("Connection error")
            #    speakText("Erreur de connexion")


# Create websocket server
port = 1234
print("** Websocket server started on port {} **".format(str(port)))
print("Waiting for a client connection...")
start_server = websockets.serve(server, "localhost", port)

# Start and run websocket server forever
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
