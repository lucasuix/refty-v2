from mongoengine import *
from models import Rfts
from datetime import datetime

connect('rft_db')


class Relatorio:

    @staticmethod
    def numero_de_rfts_por_semana(data_inicio, data_fim):
        pipeline = [
            {"$match": {
                "enviada_em": {"$gte": data_inicio, "$lte": data_fim}
            }},
            {"$group": {
                "_id": {"$isoWeek": "$enviada_em"},
                "total": {"$sum": 1}
            }},
            {"$sort": {"_id": 1}}
        ]
        return list(Rfts.objects.aggregate(*pipeline))
                    
    @staticmethod
    def erro_mais_frequente(data_inicio, data_fim):
        pipeline = [
            {"$match": {
                "enviada_em": {"$gte": data_inicio, "$lte": data_fim},
                "erro_id": {"$ne": None}
            }},
            {"$group": {
                "_id": "$erro_id",
                "quantidade": {"$sum": 1}
            }},
            {"$sort": {"quantidade": -1}},
            {"$limit": 50}  # opcional: retorna os 5 mais frequentes
        ]
        return list(Rfts.objects.aggregate(*pipeline))

    @staticmethod
    def solucao_mais_frequente(data_inicio, data_fim):
        pipeline = [
            {"$match": {
                "enviada_em": {"$gte": data_inicio, "$lte": data_fim},
                "solucao_id": {"$ne": None}
            }},
            {"$group": {
                "_id": "$solucao_id",
                "quantidade": {"$sum": 1}
            }},
            {"$sort": {"quantidade": -1}},
            {"$limit": 50}  # opcional: top 5
        ]
        return list(Rfts.objects.aggregate(*pipeline))


    @staticmethod
    def tempo_real_medio_manutencao(data_inicio, data_fim):
        pipeline = [
            {"$match": {
                "enviada_em": {"$gte": data_inicio, "$lte": data_fim},
                "metadata.duracao_real": {"$ne": None}
            }},
            {"$group": {
                "_id": None,
                "duracao_media": {"$avg": "$metadata.duracao_real"}
            }}
        ]
        return list(Rfts.objects.aggregate(*pipeline))
    
    @staticmethod
    def tempo_proprio_medio_manutencao(data_inicio, data_fim):
        pipeline = [
            {"$match": {
                "enviada_em": {"$gte": data_inicio, "$lte": data_fim},
                "metadata.duracao_propria": {"$ne": None}
            }},
            {"$group": {
                "_id": None,
                "duracao_media": {"$avg": "$metadata.duracao_propria"}
            }}
        ]
        return list(Rfts.objects.aggregate(*pipeline))

    @staticmethod
    def rfts_por_etapa(data_inicio, data_fim):
        pipeline = [
            {"$match": {
                "enviada_em": {"$gte": data_inicio, "$lte": data_fim}
            }},
            {"$group": {
                "_id": "$etapa_id",
                "total": {"$sum": 1}
            }}
        ]
        return list(Rfts.objects.aggregate(*pipeline))
    
    @staticmethod
    def perdas_por_componente(data_inicio, data_fim):
        pipeline = [
            {"$match": {
                "enviada_em": {"$gte": data_inicio, "$lte": data_fim},
                "perdas": {"$exists": True, "$ne": []}
            }},
            {"$unwind": "$perdas"},
            {"$group": {
                "_id": {
                    "componente_id": "$perdas.componente_id",
                    "nome": "$perdas.nome"
                },
                "quantidade_total": {"$sum": "$perdas.quantidade"}
            }},
            {"$sort": {"quantidade_total": -1}}
        ]
        return list(Rfts.objects.aggregate(*pipeline))
    
    @staticmethod
    def quantidade_total_rfts(data_inicio, data_fim):
        pipeline = [
            {"$match": {
                "enviada_em": {"$gte": data_inicio, "$lte": data_fim}
            }},
            {"$count": "total_rfts"}
        ]
        resultado = list(Rfts.objects.aggregate(*pipeline))
        return resultado[0]['total_rfts'] if resultado else 0
    
    @staticmethod
    def salvar_em_txt(conteudo_dict):
        data_str = datetime.today().strftime('%Y-%m-%d-%H-%M-%S')
        nome_arquivo = f"{data_str}-relatorio.txt"

        with open(nome_arquivo, 'w', encoding='utf-8') as f:
            for titulo, dados in conteudo_dict.items():
                f.write(f"\n===== {titulo.upper()} =====\n")
                if isinstance(dados, list):
                    for item in dados:
                        f.write(f"{item}\n")
                else:
                    f.write(f"{dados}\n")
        
        print(f"✅ Relatório salvo como '{nome_arquivo}'")
    
    @staticmethod
    


    @staticmethod
    def relatorio_args(args_list, data_inicio, data_fim):
        available_queries = {
            'numero_de_rfts_por_semana': Relatorio.numero_de_rfts_por_semana,
            'tempo_real_medio_manutencao': Relatorio.tempo_real_medio_manutencao,
            'tempo_proprio_medio_manutencao': Relatorio.tempo_proprio_medio_manutencao,
            'rfts_por_etapa': Relatorio.rfts_por_etapa,
            'perdas_por_componente': Relatorio.perdas_por_componente,
            'quantidade_total_rfts': Relatorio.quantidade_total_rfts,
            'erro_mais_frequente': Relatorio.erro_mais_frequente,
            'solucao_mais_frequente': Relatorio.solucao_mais_frequente
        }

        results = {}
        for query_name in args_list:
            func = available_queries.get(query_name)
            if func:
                results[query_name] = func(data_inicio, data_fim)
            else:
                results[query_name] = f"Query '{query_name}' não encontrada."

        return results

    @staticmethod
    def gerar_relatorio(args_list, data_inicio, data_fim):
        results = Relatorio.relatorio_args(args_list, data_inicio, data_fim)
        print(results)
        Relatorio.salvar_em_txt(results)

if __name__ == '__main__':
    Relatorio.gerar_relatorio(['numero_de_rfts_por_semana',
                               'tempo_real_medio_manutencao',
                               'tempo_proprio_medio_manutencao',
                               'rfts_por_etapa',
                               'perdas_por_componente',
                               'quantidade_total_rfts',
                               'erro_mais_frequente',
                               'solucao_mais_frequente'],
                               datetime(2025, 5, 1),
                               datetime(2025, 6, 15)
                               )