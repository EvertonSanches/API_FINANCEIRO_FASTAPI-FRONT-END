from pydantic import BaseModel
from typing import Literal

class Transacao(BaseModel):
    id: int
    descricao: str
    valor: float
    tipo: Literal["entrada", "saida"] 
    categoria: str