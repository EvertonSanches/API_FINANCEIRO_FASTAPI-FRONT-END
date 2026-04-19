const API = 'http://localhost:8000/financeiro';
let transacoes = [];

async function carregarDados() {
    try {
        const res = await fetch(`${API}/transacoes`);
        transacoes = await res.json();
        renderizar();
    } catch (error) {
        console.error("Erro:", error);
    }
}

function renderizar() {
    const lista = document.getElementById('listaTransacoes');
    lista.innerHTML = "";

    let entradas = 0;
    let saidas = 0;

    transacoes.forEach(t => {
        const valorBruto = t.valor !== undefined ? t.valor : t["valor:"];
        const valorNumerico = Number(valorBruto) || 0;
        const tipoLimpo = String(t.tipo || "").trim().toLowerCase();

        const li = document.createElement("li");
        li.classList.add(tipoLimpo);

        li.innerHTML = `
            <span>${t.descricao}</span>
            <strong>R$ ${valorNumerico.toFixed(2)}</strong>
        `;
        lista.appendChild(li);

        if (tipoLimpo === "entrada") {
            entradas += valorNumerico;
        } else {
            saidas += valorNumerico;
        }
    });

    document.getElementById("entradas").innerText = "R$ " + entradas.toFixed(2);
    document.getElementById("saidas").innerText = "R$ " + saidas.toFixed(2);
    document.getElementById("saldo").innerText = "R$ " + (entradas - saidas).toFixed(2);
}

async function criarTransacao() {
    const descField = document.getElementById("descricao");
    const valorField = document.getElementById("valor");
    const tipoField = document.getElementById("tipo");
    const catField = document.getElementById("categoria");

    const descricao = descField.value.trim();
    const valor = Number(valorField.value);
    const tipo = tipoField.value;
    const categoria = catField.value;

    if (descricao === "" || valorField.value === "" || isNaN(valor)) {
        alert("Preencha a descrição e um valor válido.");
        return;
    }

    const transacao = {
        id: Date.now(),
        descricao,
        valor,
        tipo,
        categoria
    };

    await fetch(`${API}/transacoes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transacao)
    });

    descField.value = "";
    valorField.value = "";
    
    carregarDados();
}

carregarDados();