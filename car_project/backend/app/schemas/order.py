from pydantic import BaseModel, Field

from app.models.order import OrderState


class OrderItemCreate(BaseModel):
    part_id: int
    quantity: int = Field(gt=0)
    frozen_price: int


class OrderItemOut(BaseModel):
    part_id: int
    quantity: int
    frozen_price: int


class OrderCreate(BaseModel):
    client_id: int
    items: list[OrderItemCreate] = Field(default_factory=list)


class OrderOut(BaseModel):
    order_id: int
    client_id: int
    state: OrderState
    items: list[OrderItemOut]
