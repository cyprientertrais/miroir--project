import asyncio
import websockets
import json
from time import sleep

async def hello():
    uri = "ws://localhost:8765"
    async with websockets.connect(uri) as websocket:
        # name = input("What's your name? ")

        data = await websocket.recv()
        print(json.loads(data))
        # print(data)

# while True:
asyncio.get_event_loop().run_until_complete(hello())
    # sleep(2)