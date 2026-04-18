from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware

from routes.financeiro_routes import router as financeiro_router

app = FastAPI(title="API de controle Financeiro")
#Liberar o cors Para tester e desenvolvimento
app.add_middleware(
 
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
app.include_router(financeiro_router)

@app.get("/")
def home():
    return {"msg":"Backend De Controle Financeiro com FastAPI"}
