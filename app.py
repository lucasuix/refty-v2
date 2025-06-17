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

@eel.expose
def abrir_tutorial():
    import os, webbrowser
    path = os.path.abspath("view/tutorial.html")  # ajuste o caminho se necessário
    webbrowser.open_new_tab(f"file://{path}")

@eel.expose
def obter_detalhes_da_versao():
    import os
    try:
        path = os.path.abspath("versao.json")

        with open(path, 'r', encoding='utf-8') as file:
            dados = json.load(file)

        return dados

    except Exception as e:
        print(f"Erro ao ler versao.json: {e}")
        return {"erro": str(e)}

if __name__ == "__main__":
	eel.init("view")
	eel.start("index.html", port=8002, size=(1024,768))