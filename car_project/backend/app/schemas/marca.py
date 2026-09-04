from pydantic import BaseModel


class MarcaOut(BaseModel):
    marca: str
    modelos: list[str]
    

class MarcasResponse(BaseModel):
    marcas: list[MarcaOut]