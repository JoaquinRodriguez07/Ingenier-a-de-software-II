"""Creates a test client user for exercising POST /api/v1/auth/login.

Usage: python -m scripts.seed_test_user

Email: test@autobought.com
Password: test1234
"""

from app.core.security import hash_password
from app.db.base import Base
from app.db.session import SessionLocal, engine
from app.models.client import Client
import app.models

TEST_EMAIL = "test@autobought.com"
TEST_PASSWORD = "test1234"


def main():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    if db.query(Client).filter(Client.email == TEST_EMAIL).first():
        print("Test user already exists, skipping.")
        db.close()
        return

    client = Client(
        username="test_user",
        password=hash_password(TEST_PASSWORD),
        name="Usuario de Prueba",
        email=TEST_EMAIL,
    )
    db.add(client)
    db.commit()
    print(f"Created test user: {TEST_EMAIL} / {TEST_PASSWORD}")
    db.close()


if __name__ == "__main__":
    main()
