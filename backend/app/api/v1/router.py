from fastapi import APIRouter

from app.api.v1.endpoints import brands, parts, cart

api_router = APIRouter()
api_router.include_router(brands.router)
api_router.include_router(parts.router)
api_router.include_router(cart.router)