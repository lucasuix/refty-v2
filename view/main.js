import {NovaRFT, ManutencaoRFT} from './rfts.js';
import { Relatorio } from './relatorios.js';
import { Versao } from './versao.js';
import { toast } from './components/toast.js';
import { ListarRfts } from './listarrfts.js';

//REQUESTS INÍCIO
toast.accuse("Obtendo dados");
const operadores    =   await eel.getData('operador')();
const etapas        =   await eel.getData('etapa')();
const solucoes      =   await eel.getData('solucao')();
const erros         =   await eel.getData('erro')();
const versao_data   =   await eel.obter_detalhes_da_versao()();
//REQUESTS FIM

//DECLARAÇÃO DE ABAS INÍCIO
toast.accuse("Renderizando Abas");
const nova_rft = new NovaRFT(
    'nova-rft-body',
    'nova-rft-erros',
    'nova-rft-footer'
);
const manutencao_rft = new ManutencaoRFT(
    'manutencao-rft-header',
    'manutencao-rft-ia-switch',
    'manutencao-rft-ia-solutions',
    'manutencao-rft-body',
    'manutencao-rft-erros',
    'manutencao-rft-manutencao',
    'manutencao-rft-footer'
);
const relatorio = new Relatorio(
    'relatorio-header',
    'relatorio-body',
    etapas,
    erros,
    solucoes,
);
const listar_rfts = new ListarRfts(
    'listar-rfts-header',
    'listar-rfts-body'
);
const versao = new Versao(
    'versao-header',
    'versao-body',
    'versao-footer',
    versao_data
);
//DECLARAÇÃO DE ABAS FIM

//POPULATES INÍCIO
toast.accuse("Populando listas");
nova_rft.operador_id.populate(operadores);
nova_rft.etapa.populate(etapas);
await nova_rft.erros.populate_erros_id();

manutencao_rft.operador_id.populate(operadores);
manutencao_rft.etapa.populate(etapas);
manutencao_rft.tecnico_id.populate(operadores);
manutencao_rft.solucao.populate(solucoes);
await manutencao_rft.erros.populate_erros_id();

listar_rfts.operador_id.populate(operadores);
listar_rfts.etapa_id.populate(etapas);
listar_rfts.tecnico_id.populate(operadores);
listar_rfts.solucao_id.populate(solucoes);
listar_rfts.erro_id.populate(erros);
//POPULATES FIM

toast.accuse("Bem Vindo!");