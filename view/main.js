import {NovaRFT, ManutencaoRFT} from './rfts.js';
import { toast } from './components/toast.js';

//REQUESTS INÍCIO
toast.accuse("Obtendo dados");
const operadores = await eel.getData('operador')();
const etapas = await eel.getData('etapa')();
const solucoes = await eel.getData('solucao')();
//REQUESTS FIM

//DECLARAÇÃO DE RFTS INÍCIO
toast.accuse("Renderizando Abas");
const nova_rft = new NovaRFT(
    'nova-rft-body',
    'nova-rft-erros',
    'nova-rft-footer'
);
const manutencao_rft = new ManutencaoRFT(
    'manutencao-rft-header',
    'manutencao-rft-body',
    'manutencao-rft-erros',
    'manutencao-rft-manutencao',
    'manutencao-rft-footer'
);
//DECLARAÇÃO DE RFTS FIM

//POPULATES INÍCIO
toast.accuse("Populando listas");
nova_rft.operador_id.populate(operadores);
nova_rft.etapa.populate(etapas);

manutencao_rft.operador_id.populate(operadores);
manutencao_rft.etapa.populate(etapas);
manutencao_rft.tecnico_id.populate(operadores);
manutencao_rft.solucao.populate(solucoes);
//POPULATES FIM

toast.accuse("Bem Vindo!");