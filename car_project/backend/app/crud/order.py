from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload

from app.models.car_model import CarModel
from app.models.cart import Cart
from app.models.cart_item import CartItem
from app.models.client import Client
from app.models.compatibility import Compatibility
from app.models.employee import Employee
from app.models.order import Order
from app.models.order_item import OrderItem
from app.models.part import Part
from app.models.payment_method import PaymentMethod
from app.models.shipping_address import ShippingAddress


def place_order(db: Session, client_id: int) -> Order:
    """Place an order from a client's cart in a single transaction."""
    with db.begin():
        cart = db.scalar(
            select(Cart)
            .where(Cart.client_id == client_id)
            .options(selectinload(Cart.items))
            .with_for_update()
        )
        if cart is None:
            raise ValueError("Client cart not found")
        if not cart.items:
            raise ValueError("Cannot place an order from an empty cart")

        part_ids = [item.part_id for item in cart.items]
        parts = db.scalars(
            select(Part)
            .where(Part.id.in_(part_ids))
            .with_for_update()
        ).all()
        parts_by_id = {part.id: part for part in parts}

        missing_part_ids = [part_id for part_id in part_ids if part_id not in parts_by_id]
        if missing_part_ids:
            raise ValueError(f"Parts not found: {missing_part_ids}")

        for cart_item in cart.items:
            part = parts_by_id[cart_item.part_id]
            if part.stock < cart_item.amount:
                raise ValueError(
                    f"Not enough stock for part {part.id}: "
                    f"requested {cart_item.amount}, available {part.stock}"
                )

        order = Order(client_id=client_id)
        db.add(order)
        db.flush()

        for cart_item in cart.items:
            part = parts_by_id[cart_item.part_id]
            order.items.append(
                OrderItem(
                    part_id=part.id,
                    quantity=cart_item.amount,
                    frozen_price=part.price,
                )
            )
            part.stock -= cart_item.amount

        cart.items.clear()
        return order
