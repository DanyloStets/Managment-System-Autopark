from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List, Optional
from datetime import date

# Прямі імпорти з файлів у вашому корені
from database import engine, Base, get_db
import models

# Створюємо зв'язки з таблицями
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Fleet Management System API",
    description="Система управління автопарком",
    version="1.0.0"
)

# Дозволяємо запити з браузера (React)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic моделі для REST API
class CarCreate(BaseModel):
    vin: Optional[str] = None
    model: Optional[str] = None
    year: Optional[int] = None
    mileage: Optional[int] = 0
    plate_number: int
    status: Optional[str] = "available"

class CarResponse(CarCreate):
    id_car: int

    class Config:
        from_attributes = True

# Маршрути
@app.get("/")
def root():
    return {"status": "ok", "message": "Fleet Management API is running"}

@app.get("/api/cars", response_model=List[CarResponse])
def get_cars(db: Session = Depends(get_db)):
    return db.query(models.Car).all()

@app.post("/api/cars", response_model=CarResponse, status_code=status.HTTP_201_CREATED)
def create_car(car_data: CarCreate, db: Session = Depends(get_db)):
    new_car = models.Car(**car_data.model_dump())
    db.add(new_car)
    db.commit()
    db.refresh(new_car)
    return new_car