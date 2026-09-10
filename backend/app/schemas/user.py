from pydantic import BaseModel


class UserBase(BaseModel):
    username: str
    name: str
    email: str


class UserCreate(UserBase):
    password: str


class UserOut(UserBase):
    user_id: int
