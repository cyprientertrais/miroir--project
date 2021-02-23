from VocalRecognition import VocalRecognition
import _thread as thread
import asyncio
import websockets
import json
from time import sleep

from Test import *

async def execute(websocket, path):

    await launchListening(websocket)
    # data = json.dumps({'action': ('changeNews'),'name': ("info")})
    # await websocket.send(data)
    # await jsonTest(websocket)


start_server = websockets.serve(execute, "localhost", 8765)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
