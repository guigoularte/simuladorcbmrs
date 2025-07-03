// Dados das ocupações e suas características
const ocupacoes = {
    'A': {
        nome: 'Grupo A - Residencial',
        descricao: 'Edificações destinadas à moradia',
        exemplos: ['Casas', 'Apartamentos', 'Condomínios residenciais']
    },
    'B': {
        nome: 'Grupo B - Serviço de Hospedagem',
        descricao: 'Locais que oferecem hospedagem',
        exemplos: ['Hotéis', 'Motéis', 'Pousadas', 'Alojamentos']
    },
    'C': {
        nome: 'Grupo C - Comercial',
        descricao: 'Edificações destinadas ao comércio',
        exemplos: ['Lojas', 'Supermercados', 'Shoppings', 'Farmácias']
    },
    'D': {
        nome: 'Grupo D - Serviço Profissional/Administrativo',
        descricao: 'Atividades profissionais e administrativas',
        exemplos: ['Escritórios', 'Consultórios', 'Agências bancárias']
    },
    'E': {
        nome: 'Grupo E - Educacional e Cultura Física',
        descricao: 'Ensino e atividades físicas',
        exemplos: ['Escolas', 'Universidades', 'Academias']
    },
    'F': {
        nome: 'Grupo F - Local de Reunião de Público',
        descricao: 'Locais de concentração de pessoas',
        exemplos: ['Teatros', 'Cinemas', 'Igrejas', 'Estádios']
    },
    'G': {
        nome: 'Grupo G - Serviço de Saúde e Institucional',
        descricao: 'Serviços de saúde e institucionais',
        exemplos: ['Hospitais', 'Clínicas', 'Asilos', 'Orfanatos']
    },
    'H': {
        nome: 'Grupo H - Industrial',
        descricao: 'Atividades industriais',
        exemplos: ['Indústrias', 'Fábricas', 'Depósitos industriais']
    },
    'I': {
        nome: 'Grupo I - Depósito',
        descricao: 'Armazenamento de materiais',
        exemplos: ['Armazéns', 'Depósitos', 'Centros de distribuição']
    },
    'J': {
        nome: 'Grupo J - Garagem e Estacionamento',
        descricao: 'Estacionamento de veículos',
        exemplos: ['Garagens', 'Estacionamentos', 'Pátios de veículos']
    },
    'L': {
        nome: 'Grupo L - Explosivos',
        descricao: 'Materiais explosivos',
        exemplos: ['Depósitos de explosivos', 'Fábricas de fogos']
    },
    'M': {
        nome: 'Grupo M - Especial',
        descricao: 'Edificações especiais',
        exemplos: ['Túneis', 'Heliportos', 'Torres de comunicação']
    }
};

// Função principal de simulação
function simularExigencias() {
    // Obter dados do formulário
    const ocupacao = document.getElementById('ocupacao').value;
    const area = parseFloat(document.getElementById('area').value);
    const altura = parseFloat(document.getElementById('altura').value);
    const pavimentos = parseInt(document.getElementById('pavimentos').value);
    const cargaIncendio = document.getElementById('carga-incendio').value;
    const lotacao = parseInt(document.getElementById('lotacao').value);

    // Validar dados
    if (!ocupacao || !area || !altura || !pavimentos || !cargaIncendio || !lotacao) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    // Mostrar loading
    const button = document.getElementById('simular');
    const originalText = button.innerHTML;
    button.innerHTML = '<span class="loading"></span>Simulando...';
    button.disabled = true;

    // Simular delay para processamento
    setTimeout(() => {
        // Calcular grau de risco
        const grauRisco = calcularGrauRisco(ocupacao, area, altura, pavimentos, cargaIncendio, lotacao);
        
        // Determinar tipo de plano
        const tipoPlano = determinarTipoPlano(ocupacao, area, altura, pavimentos, grauRisco);
        
        // Determinar medidas de segurança
        const medidasSeguranca = determinarMedidasSeguranca(ocupacao, area, altura, pavimentos, grauRisco, lotacao);
        
        // Determinar resoluções técnicas aplicáveis
        const resolucoes = determinarResolucoes(ocupacao, grauRisco, medidasSeguranca);
        
        // Determinar próximos passos
        const proximosPassos = determinarProximosPassos(tipoPlano, grauRisco);

        // Exibir resultados
        exibirResultados(ocupacao, grauRisco, tipoPlano, medidasSeguranca, resolucoes, proximosPassos);

        // Restaurar botão
        button.innerHTML = originalText;
        button.disabled = false;
    }, 1500);
}

function calcularGrauRisco(ocupacao, area, altura, pavimentos, cargaIncendio, lotacao) {
    let pontuacao = 0;

    // Pontuação por ocupação
    const riscoPorOcupacao = {
        'A': 1, 'B': 2, 'C': 2, 'D': 1, 'E': 2, 'F': 3, 'G': 3, 'H': 3, 'I': 2, 'J': 1, 'L': 4, 'M': 3
    };
    pontuacao += riscoPorOcupacao[ocupacao] || 1;

    // Pontuação por área
    if (area > 1500) pontuacao += 3;
    else if (area > 750) pontuacao += 2;
    else if (area > 300) pontuacao += 1;

    // Pontuação por altura
    if (altura > 23) pontuacao += 3;
    else if (altura > 12) pontuacao += 2;
    else if (altura > 6) pontuacao += 1;

    // Pontuação por pavimentos
    if (pavimentos > 6) pontuacao += 3;
    else if (pavimentos > 3) pontuacao += 2;
    else if (pavimentos > 1) pontuacao += 1;

    // Pontuação por carga de incêndio
    if (cargaIncendio === 'alta') pontuacao += 3;
    else if (cargaIncendio === 'media') pontuacao += 2;
    else pontuacao += 1;

    // Pontuação por lotação
    if (lotacao > 500) pontuacao += 3;
    else if (lotacao > 100) pontuacao += 2;
    else if (lotacao > 50) pontuacao += 1;

    // Determinar grau de risco
    if (pontuacao <= 6) return 'baixo';
    else if (pontuacao <= 12) return 'medio';
    else return 'alto';
}

function determinarTipoPlano(ocupacao, area, altura, pavimentos, grauRisco) {
    // Critérios para PSPCI
    if (area <= 750 && pavimentos <= 3 && grauRisco === 'baixo') {
        return 'pspci';
    }
    
    // Ocupações específicas que sempre exigem PPCI
    const ocupacoesComplexas = ['F', 'G', 'H', 'L'];
    if (ocupacoesComplexas.includes(ocupacao)) {
        return 'ppci';
    }

    return 'ppci';
}

function determinarMedidasSeguranca(ocupacao, area, altura, pavimentos, grauRisco, lotacao) {
    const medidas = [];

    // Extintores (sempre obrigatório)
    medidas.push('Extintores de incêndio portáteis');

    // Saídas de emergência (sempre obrigatório)
    medidas.push('Saídas de emergência dimensionadas');

    // Sinalização de emergência (sempre obrigatório)
    medidas.push('Sinalização de emergência');

    // Iluminação de emergência (sempre obrigatório)
    medidas.push('Iluminação de emergência');

    // Hidrantes (baseado em área e risco)
    if (area > 500 || grauRisco !== 'baixo') {
        medidas.push('Sistema de hidrantes e mangotinhos');
    }

    // Detecção e alarme
    if (grauRisco === 'alto' || ['F', 'G', 'H'].includes(ocupacao) || lotacao > 100) {
        medidas.push('Sistema de detecção e alarme de incêndio');
    }

    // Brigada de incêndio
    if (grauRisco !== 'baixo' || lotacao > 50) {
        medidas.push('Brigada de incêndio');
    }

    // Chuveiros automáticos (sprinklers)
    if (grauRisco === 'alto' || area > 2000 || altura > 23) {
        medidas.push('Sistema de chuveiros automáticos (sprinklers)');
    }

    // Controle de fumaça
    if (altura > 12 || ['F', 'G'].includes(ocupacao)) {
        medidas.push('Sistema de controle de fumaça');
    }

    // Escada de segurança
    if (altura > 12 || pavimentos > 4) {
        medidas.push('Escada de segurança');
    }

    return medidas;
}

function determinarResolucoes(ocupacao, grauRisco, medidasSeguranca) {
    const resolucoes = [
        'RT CBMRS nº 01/2024 - Diretrizes básicas de segurança contra incêndio',
        'RT CBMRS nº 02/2024 - Termos e definições',
        'RT CBMRS nº 03/2024 - Carga de incêndio específica'
    ];

    if (medidasSeguranca.includes('Extintores de incêndio portáteis')) {
        resolucoes.push('RT CBMRS nº 14/2024 - Extintores de incêndio');
    }

    if (medidasSeguranca.includes('Saídas de emergência dimensionadas')) {
        resolucoes.push('RT CBMRS nº 11/2024 - Saídas de emergência');
    }

    if (medidasSeguranca.includes('Sinalização de emergência')) {
        resolucoes.push('RT CBMRS nº 12/2024 - Sinalização de emergência');
    }

    if (medidasSeguranca.includes('Iluminação de emergência')) {
        resolucoes.push('RT CBMRS nº 13/2024 - Iluminação de emergência');
    }

    if (medidasSeguranca.includes('Sistema de hidrantes e mangotinhos')) {
        resolucoes.push('RT CBMRS nº 16/2024 - Hidrantes urbanos');
    }

    if (medidasSeguranca.includes('Sistema de detecção e alarme de incêndio')) {
        resolucoes.push('RT CBMRS nº 18/2025 - Detecção e alarme de incêndio');
    }

    if (medidasSeguranca.includes('Brigada de incêndio')) {
        resolucoes.push('RT CBMRS nº 15/2024 - Brigada de incêndio');
    }

    return resolucoes;
}

function determinarProximosPassos(tipoPlano, grauRisco) {
    const passos = [];

    if (tipoPlano === 'pspci') {
        passos.push('1. Contratar profissional habilitado para elaboração do PSPCI');
        passos.push('2. Elaborar o Plano Simplificado de Prevenção e Proteção Contra Incêndio');
        passos.push('3. Submeter o PSPCI ao CBMRS via SOL-CBMRS');
        passos.push('4. Aguardar análise e aprovação do projeto');
        passos.push('5. Executar as medidas de segurança aprovadas');
        passos.push('6. Solicitar vistoria ao CBMRS');
        passos.push('7. Obter o Alvará de Prevenção e Proteção Contra Incêndio (APPCI)');
    } else {
        passos.push('1. Contratar profissional habilitado para elaboração do PPCI');
        passos.push('2. Elaborar o Plano de Prevenção e Proteção Contra Incêndio completo');
        passos.push('3. Submeter o PPCI ao CBMRS via SOL-CBMRS');
        passos.push('4. Aguardar análise técnica detalhada');
        passos.push('5. Atender eventuais exigências de correção');
        passos.push('6. Executar todas as medidas de segurança aprovadas');
        passos.push('7. Solicitar vistoria técnica ao CBMRS');
        passos.push('8. Obter o Alvará de Prevenção e Proteção Contra Incêndio (APPCI)');
    }

    return passos;
}

function exibirResultados(ocupacao, grauRisco, tipoPlano, medidasSeguranca, resolucoes, proximosPassos) {
    // Classificação da edificação
    const classificacaoDiv = document.getElementById('classificacao-resultado');
    const ocupacaoInfo = ocupacoes[ocupacao];
    classificacaoDiv.innerHTML = `
        <h4>${ocupacaoInfo.nome}</h4>
        <p><strong>Descrição:</strong> ${ocupacaoInfo.descricao}</p>
        <p><strong>Exemplos:</strong> ${ocupacaoInfo.exemplos.join(', ')}</p>
        <p><strong>Grau de Risco:</strong> <span class="grau-risco ${grauRisco}">${grauRisco.toUpperCase()}</span></p>
    `;

    // Tipo de plano
    const tipoPlanoDiv = document.getElementById('tipo-plano');
    const planoTexto = tipoPlano === 'pspci' ? 'Plano Simplificado (PSPCI)' : 'Plano Completo (PPCI)';
    const planoDescricao = tipoPlano === 'pspci' 
        ? 'Sua edificação se enquadra nos critérios para um Plano Simplificado, com processo mais ágil.'
        : 'Sua edificação requer um Plano Completo, com análise técnica detalhada.';
    
    tipoPlanoDiv.innerHTML = `
        <span class="tipo-plano ${tipoPlano}">${planoTexto}</span>
        <p style="margin-top: 10px;">${planoDescricao}</p>
    `;

    // Medidas de segurança
    const medidasDiv = document.getElementById('medidas-seguranca');
    const medidasHtml = medidasSeguranca.map(medida => `<li>${medida}</li>`).join('');
    medidasDiv.innerHTML = `<ul>${medidasHtml}</ul>`;

    // Resoluções técnicas
    const resolucoesDiv = document.getElementById('resolucoes-aplicaveis');
    const resolucoesHtml = resolucoes.map(resolucao => `<li>${resolucao}</li>`).join('');
    resolucoesDiv.innerHTML = `<ul>${resolucoesHtml}</ul>`;

    // Próximos passos
    const passosDiv = document.getElementById('proximos-passos');
    const passosHtml = proximosPassos.map(passo => `<li>${passo}</li>`).join('');
    passosDiv.innerHTML = `<ul>${passosHtml}</ul>`;

    // Mostrar seção de resultados
    const resultsSection = document.getElementById('results');
    resultsSection.style.display = 'block';
    resultsSection.classList.add('fade-in');

    // Scroll para os resultados
    resultsSection.scrollIntoView({ behavior: 'smooth' });
}

// Adicionar eventos de validação em tempo real
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('change', function() {
            if (this.value) {
                this.style.borderColor = '#48bb78';
            } else {
                this.style.borderColor = '#e2e8f0';
            }
        });
    });
});

