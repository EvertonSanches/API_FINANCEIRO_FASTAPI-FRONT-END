from database.fake_db import transacoes
from models.transacao_model import Transacao

def listar_transacoes():
    return transacoes

def criar_transacao(transacao: Transacao):
    transacoes.append(transacao.model_dump())
    return transacao

def calcular_saldo():
    saldo =0
    for t in transacoes:
        if t ["tipo"] == "entrada":
            saldo += t["valor"]
        else:
            saldo -= t ["valor"]
        
        return {"saldo": saldo}