import {NovaRFT, ManutencaoRFT} from './rfts.js';

//REQUESTS INÍCIO
const operadores = await eel.getData('operador')();
const erros = await eel.getData('erro')();
const etapas = await eel.getData('etapa')();
const solucoes = await eel.getData('solucao')();
//REQUESTS FIM


//FILTRANDO REQUESTS INÍCIO
const erros_pre_tests = null;
const erros_potencia = null;
const erros_burnin = null;
//FILTRANDO REQUESTS FIM

//DECLARAÇÃO DE RFTS INÍCIO
const nova_rft = new NovaRFT();
const manutencao_rft = new ManutencaoRFT();
//DECLARAÇÃO DE RFTS FIM

//RENDERIZAÇÃO DOS COMPONENTES INÍCIO
const nova_rft_body = document.getElementById('nova-rft-body');
const nova_rft_footer = document.getElementById('nova-rft-footer');

nova_rft.render_body(nova_rft_body);
nova_rft.render_footer(nova_rft_footer);

const manutencao_rft_header = document.getElementById('manutencao-rft-header');
const manutencao_rft_body = document.getElementById('manutencao-rft-body');
const manutencao_rft_footer = document.getElementById('manutencao-rft-footer');

manutencao_rft.render_header(manutencao_rft_header);
manutencao_rft.render_body(manutencao_rft_body);
manutencao_rft.render_footer(manutencao_rft_footer);
//RENDERIZAÇÃO DOS COMPONENTES FIM


//POPULATES INÍCIO
nova_rft.operador_id.populate(operadores);
nova_rft.etapa.populate(etapas);
nova_rft.erro_id.populate(erros);

manutencao_rft.operador_id.populate(operadores);
manutencao_rft.etapa.populate(etapas);
manutencao_rft.erro_id.populate(erros);
manutencao_rft.tecnico_id.populate(operadores);
manutencao_rft.solucao.populate(solucoes);
//POPULATES FIM