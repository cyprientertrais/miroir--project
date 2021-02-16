import asyncio
import websockets

class Websocket():

    def __init__(self, port):
        
        self.port = str(port)
        self.uri = "ws://localhost:"+self.port

    def send(self, data):
        """
        Send data through websockets
        """
        
        asyncio.get_event_loop().run_until_complete(self.sendWS(data))

    async def sendWS(self, data):
        async with websockets.connect(self.uri) as websocket:

            await websocket.send(data)