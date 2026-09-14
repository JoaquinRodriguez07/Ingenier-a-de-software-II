
import pytest

from app.crud.car_model import list_brands_with_models
from app.crud.order import place_order
from app.crud.part import list_parts
from app.models.car_model import CarModel
from app.models.cart import Cart
from app.models.cart_item import CartItem
from app.models.client import Client
from app.models.compatibility import Compatibility
from app.models.order_item import OrderItem
from app.models.part import Part
from app.schemas.part import build_part_out


def make_catalog(db_session):
	car_model = CarModel(brand="Toyota", model="Corolla", engine_code="2ZR")
	second_car_model = CarModel(brand="Toyota", model="Yaris", engine_code="1NZ")
	part = Part(
		part_code="BRK-001",
		name="Brake pad",
		category="Brakes",
		price=12500,
		stock=5,
	)
	part.compatibilities = [
		Compatibility(car_model=car_model, year_from=2018, year_to=2020),
		Compatibility(car_model=second_car_model, year_from=2016, year_to=2022),
	]
	db_session.add(part)
	db_session.commit()
	return part


def test_list_brands_with_models_is_sorted(db_session):
	db_session.add_all(
		[
			CarModel(brand="Toyota", model="Yaris", engine_code="1NZ"),
			CarModel(brand="Honda", model="Civic", engine_code="R18"),
			CarModel(brand="Toyota", model="Corolla", engine_code="2ZR"),
		]
	)
	db_session.commit()

	assert list_brands_with_models(db_session) == [
		{"brand": "Honda", "models": ["Civic"]},
		{"brand": "Toyota", "models": ["Corolla", "Yaris"]},
	]


def test_list_parts_and_build_part_output(db_session):
	make_catalog(db_session)

	parts = list_parts(db_session)

	assert len(parts) == 1
	assert build_part_out(parts[0]).model_dump() == {
		"id": parts[0].id,
		"name": "Brake pad",
		"compatible_brands": ["Toyota"],
		"compatible_models": ["Corolla", "Yaris"],
		"year_from": 2016,
		"year_to": 2022,
		"engine_code": None,
		"part_code": "BRK-001",
		"category": "Brakes",
		"color": None,
		"price": 12500,
		"stock": 5,
	}


def test_brands_endpoint_returns_empty_catalog(client):
	response = client.get("/api/v1/brands")

	assert response.status_code == 200
	assert response.json() == {"brands": []}


def test_parts_endpoint_serializes_compatibilities(client, db_session):
	make_catalog(db_session)

	response = client.get("/api/v1/parts")

	assert response.status_code == 200
	assert response.json()["parts"][0]["compatible_models"] == ["Corolla", "Yaris"]


def test_place_order_decreases_stock_clears_cart_and_freezes_price(db_session):
	client = Client(name="Ana", email="ana@example.com")
	part = Part(
		part_code="FLT-001",
		name="Air filter",
		category="Filters",
		price=3000,
		stock=4,
	)
	cart = Cart(client=client, items=[CartItem(part=part, amount=2)])
	db_session.add(cart)
	db_session.commit()

	order = place_order(db_session, client.user_id)
	db_session.commit()
	db_session.refresh(part)

	assert part.stock == 2
	assert db_session.query(CartItem).count() == 0
	assert db_session.query(OrderItem).one().frozen_price == 3000
	assert order.items[0].quantity == 2


def test_place_order_rejects_insufficient_stock(db_session):
	client = Client(name="Luis", email="luis@example.com")
	part = Part(
		part_code="BAT-001",
		name="Battery",
		category="Electrical",
		price=50000,
		stock=1,
	)
	db_session.add(Cart(client=client, items=[CartItem(part=part, amount=2)]))
	db_session.commit()

	with pytest.raises(ValueError, match="Not enough stock"):
		place_order(db_session, client.user_id)

	db_session.rollback()
	assert db_session.query(OrderItem).count() == 0
	assert db_session.query(Part).one().stock == 1

