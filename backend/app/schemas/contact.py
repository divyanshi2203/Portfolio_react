from pydantic import BaseModel, EmailStr, Field


class ContactCreate(BaseModel):
    name: str = Field(min_length=2, max_length=200)
    email: EmailStr
    message: str = Field(min_length=5, max_length=2000)