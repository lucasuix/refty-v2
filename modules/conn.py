import requests
import json
import os
from dotenv import load_dotenv

load_dotenv()

class Server:
    
    def __init__(self):
        self.__ip_address = os.getenv('RFTO_SERVER_IP')
        self.__auth = {
            "username": os.getenv('USERNAME'),
            "password": os.getenv('PASSWORD')
        }
        # self.get_token()
        
    def get_token(self):
        response = requests.post(self.__ip_address + "api-token-auth/", headers = {'Content-Type': 'application/json'}, json=self.__auth)
        print(response.text)
        self.__token = response.json()['token']
    
    def has_token(self):
        return self.__token
    
    def run(self, json_payload):
        response = requests.post(self.__ip_address + "/api/app/", headers = {'Content-Type': 'application/json'}, json=json_payload)
        print(response.text)
        # , 'Authorization': f'Token {self.__token}'
        return response.text


class TecsciServer:

    def __init__(self, server_url: str = 'https://ppc.tecsci.com.br/api/v1.0') -> None:
        self.server_url = server_url
        self.token = None
        self.response = None

    def login(self) -> bool:
        try:
            response = requests.post(
                self.server_url + "/auth/login",
                headers={'Content-Type': 'application/json'},
                json={'username': 'lucas.villani', 'password': '12345678'}
                )
            self.token = response.json().get("access_token")
            return True
        except Exception as e:
            print(e)
            return False

    def get_request(self, endpoint, params=None):
        return requests.get(
            self.server_url + "/" + endpoint,
            headers= {"Authorization": f"Bearer {self.token}"},
            params = params
            ).json()

    def post_request(self, endpoint, data=None):
        response =  requests.post(
            self.server_url + "/" + endpoint,
            json=data,
            headers={"Authorization": f"Bearer {self.token}", "Content-Type": "application/json", }
            )
        print(response.status_code)
        if (response.status_code != 201):
            print(response.json())
        return response.json()