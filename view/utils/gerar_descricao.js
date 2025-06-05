export function gerar_descricao(values, etapa, erro_id, erros) {

    if (erros == undefined) {
        return "Sem descrição";
    }

    const match = erros.find(item => item.id == erro_id);

    if (match == undefined) {
        return "Sem descrição";
    }
    let data = "";

    switch (etapa) {
        case 1:
        case 3:
        case 4:
            data = Object.values(values).join(',');
            break;
        case 2:
            data = Object.keys(values).join(',');
            break;
    }

    data == "" ? data = match.nome : null;
    return data;
}