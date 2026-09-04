from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.car_model import CarModel


def list_brands_with_models(db: Session) -> list[dict]:
    query = (
        select(CarModel.brand, CarModel.model)
        .distinct()
        .order_by(CarModel.brand, CarModel.model)
        )
    
    brands: dict[str, list[str]] = {}

    for brand, model in db.execute(query):
        brands.setdefault(brand, [])
        if model not in brands[brand]:
            brands[brand].append(model)
    
    return [{"brand": brand, "models" : models} for brand, models in brands.items()]