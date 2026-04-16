from fastapi import FastAPI
from routes.financeiro_routes import router as financeiro_router

app = FastAPI(title="API de controle Financeiro")

app.include_router(financeiro_router)

@app.get("/")
def home():
    return {"msg":"Backend De Controle Financeiro com FastAPI"}
