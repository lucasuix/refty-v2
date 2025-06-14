from mongoengine import *
from embedded import MetaInfo, Perdas
from datetime import datetime

connect('rft_db')

class Rfts(Document):
    # Identificação
    serialnumber = StringField(regex=r'^\d{13}$', required=True)
    operador_id = IntField(required=True)
    etapa_id = IntField(required=True, choices=[1, 2, 3, 4])
    erro_id = IntField(required=True)
    defeitos = DictField()
    rft_id = IntField()  # Se necessário

    # Datas principais
    enviada_em = DateTimeField(default=datetime.now, required=True)
    iniciada_em = DateTimeField()
    concluida_em = DateTimeField()

    # Dados de produção/manutenção
    tecnico_id = IntField()
    perdas = ListField(EmbeddedDocumentField(Perdas), default=list)
    procedimento = StringField(max_length=200)
    solucao_id = IntField()

    # Meta: dados internos (não exibidos ao usuário)
    metadata = EmbeddedDocumentField(MetaInfo)

class Componentes(Document):
    nome = StringField(required=True, max_length=200)
    preco = FloatField(default=0)

    def to_dict(self):
        data = self.to_mongo().to_dict()
        data['id'] = str(data.pop('_id'))
        return data





    
