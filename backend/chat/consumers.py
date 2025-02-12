import json
from channels.generic.websocket import AsyncWebsocketConsumer

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_group_name = "chat_room"  # 모든 사용자가 참여하는 공용 방(예시)
        # 그룹에 가입
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()  # 연결 수락

    async def disconnect(self, close_code):
        # 그룹에서 제거
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        # 클라이언트에서 메시지 수신
        data = json.loads(text_data)
        message = data.get('message')

        # 같은 그룹의 모든 Consumer에게 브로드캐스트
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message
            }
        )

    async def chat_message(self, event):
        # group_send()에서 'type': 'chat_message' -> 여기가 실행됨
        message = event['message']

        # 클라이언트에게 메시지 전송
        await self.send(text_data=json.dumps({
            'message': message
        }))
