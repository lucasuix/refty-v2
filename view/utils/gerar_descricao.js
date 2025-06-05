export function gerar_descricao(values, etapa, erro_id, erros) {

    const match = erros.find(item => item.id == erro_id);
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