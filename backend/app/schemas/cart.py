from pydantic import BaseModel, Field


class CartItemCreate(BaseModel):
    part_id: int
    amount: int = Field(gt=0)


class CartItemOut(BaseModel):
    part_id: int
    amount: int


class CartCreate(BaseModel):
    items: list[CartItemCreate] = Field(default_factory=list)


class CartOut(BaseModel):
    client_id: int
    items: list[CartItemOut]
