#!/usr/bin/env python3
import asyncio
import VocalRecognition
import websockets
from time import sleep

async def server(websocket, path):
        while 1:
            data = await VocalRecognition.launchVocalRecognition()
            try:
                if data:
                    print(f"> SENDING JSON : {data}")
                    await websocket.send(data)
                    print("Waiting message from client..")
                    response = await websocket.recv()
                    print(f"< RECEIVED FROM CLIENT :  {response}")
                    sleep(5)
                else:
                    print("The data is empty")
            except:
                print("Connection error")


# Create websocket server
port = 1234
print("** Websocket server started on port {} **".format(str(port)))
print("Waiting for a client connection...")
start_server = websockets.serve(server, "localhost", port)

# Start and run websocket server forever
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
