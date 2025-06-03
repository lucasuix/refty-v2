import eel
import json
from modules.conn import Server, TecsciServer

api = Server()
tecsci_server = TecsciServer()
tecsci_server.login()

@eel.expose
def sendPayload(payload):
	"""
		PAYLOAD:
		{
			rft: 		{...}, # Fields from the model
			metadata: 	{...}  # Action, AI, and other arguments
		}
	"""

	response = api.run(payload)
	return response

@eel.expose
def getData(endpoint):
	return tecsci_server.get_request(endpoint, params = None)

@eel.expose
def getErros(etapa):
	data = tecsci_server.get_request("erro", params = None)
	response = [erro for erro in data if erro['etapa']['id'] == etapa]
	return response


if __name__ == "__main__":
	eel.init("view")
	eel.start("index.html", port=8002)