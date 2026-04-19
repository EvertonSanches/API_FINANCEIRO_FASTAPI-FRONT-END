const API = 'http://localhost:8000/financeiro';

let transacoes = [];

async function carregarDados(){
    const res = await fetch(`${API}/transacoes`);
    transacoes = await res.json();

    renderizar();
}

