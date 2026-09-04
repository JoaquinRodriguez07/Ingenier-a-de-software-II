from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload

from app.models.repuesto import Repuesto
from app.models.compatibilidad import Compatibilidad


def listar(db: Session) -> list[Repuesto]:
    consulta = (
        select(Repuesto)
        .options(
            selectinload(Repuesto.compatibilidades).selectinload(
                Compatibilidad.modelo
            )
        )
        .order_by(Repuesto.id_repuesto)
    )
    return list(db.scalars(consulta).all())