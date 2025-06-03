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
def getData(endpoint, params = None):
	return tecsci_server.get_request(endpoint, params = None)


if __name__ == "__main__":
	eel.init("view")
	eel.start("index.html", port=8002)