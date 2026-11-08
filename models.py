from sqlalchemy import Column, Integer, String, Date, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from database import Base


class Car(Base):
    __tablename__ = "car"

    id_car = Column(Integer, primary_key=True, autoincrement=True)
    vin = Column(String(45), nullable=True)
    model = Column(String(45), nullable=True)
    year = Column(Integer, nullable=True)
    mileage = Column(Integer, nullable=True)
    plate_number = Column(Integer, nullable=False)
    status = Column(String(45), nullable=True)

    # Зв'язки з іншими таблицями
    maintenances = relationship("MaintenanceService", back_populates="car")
    routes = relationship("Route", back_populates="car")
    expenses = relationship("Expense", back_populates="car")


class Driver(Base):
    __tablename__ = "driver"

    id_driver = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(45), nullable=True)
    rating = Column(Integer, nullable=True)
    car = Column(String(45), nullable=True)
    licence_id = Column(String(45), nullable=True)
    license_category = Column(String(45), nullable=True)
    experience_years = Column(Integer, nullable=True)
    medical_id = Column(Integer, nullable=True)
    medical_check_date = Column(Date, nullable=True)

    # Зв'язок з маршрутами
    routes = relationship("Route", back_populates="driver")


class MaintenanceService(Base):
    __tablename__ = "maintenance_service"

    id_service = Column(Integer, primary_key=True, autoincrement=True)
    vehicle_id = Column(Integer, ForeignKey("car.id_car"), nullable=True)
    scheduled_date = Column(Date, nullable=True)
    completed_date = Column(Date, nullable=True)
    mileage_target = Column(Integer, nullable=True)
    work_performed = Column(String(45), nullable=True)

    car = relationship("Car", back_populates="maintenances")


class Route(Base):
    __tablename__ = "route"

    id_route = Column(Integer, primary_key=True, autoincrement=True)
    vehicle_id = Column(Integer, ForeignKey("car.id_car"), nullable=True)
    driver_id = Column(Integer, ForeignKey("driver.id_driver"), nullable=True)
    status = Column(String(45), nullable=True)
    destination = Column(String(45), nullable=True)
    from_where = Column(String(45), nullable=True)
    time_from = Column(Date, nullable=True)
    time_arrival = Column(Date, nullable=True)

    car = relationship("Car", back_populates="routes")
    driver = relationship("Driver", back_populates="routes")


class Expense(Base):
    __tablename__ = "expenses"

    id_expenses = Column(Integer, primary_key=True, autoincrement=True)
    vehicle_id = Column(Integer, ForeignKey("car.id_car"), nullable=True)
    category = Column(String(45), nullable=True)
    amount = Column(Integer, nullable=True)
    date = Column(Date, nullable=True)
    receipt_ref = Column(Integer, nullable=True)

    car = relationship("Car", back_populates="expenses")


class Notification(Base):
    __tablename__ = "notification"

    id_notification = Column(Integer, primary_key=True, autoincrement=True)
    type_n = Column(String(45), nullable=True)
    message = Column(String(100), nullable=True)
    to_date = Column(Date, nullable=True)
    is_read = Column(Boolean, default=False)