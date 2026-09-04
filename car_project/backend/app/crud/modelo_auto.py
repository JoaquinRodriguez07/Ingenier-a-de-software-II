from sqlalchemy import select

from sqlalchemy.orm import Session

from app.models.modelo_auto import ModeloAuto


def listar_marcas_con_modelos(db: Session) -> list[dict]:
    consulta = (
        select(ModeloAuto.marca, ModeloAuto.modelo)
        .distinct()
        .order_by(ModeloAuto.marca, ModeloAuto.modelo)
        )
    
    marcas: dict[str, list[str]] = {}

    for marca, modelo in db.execute(consulta):
        marcas.setdefault(marca, [])
        if modelo not in marcas[marca]:
            marcas[marca].append(modelo)
    
    return [{"marca": marca, "modelos" : modelos} for marca, modelos in marcas.items()]