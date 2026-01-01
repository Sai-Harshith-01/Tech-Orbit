from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def _truncate_password(password: str) -> str:
    """Truncate password to 72 bytes for bcrypt compatibility."""
    password_bytes = password.encode('utf-8')
    if len(password_bytes) > 72:
        return password_bytes[:72].decode('utf-8', errors='ignore')
    return password

def verify_password(plain_password, hashed_password):
    """Verify a password against a hashed password."""
    truncated = _truncate_password(plain_password)
    return pwd_context.verify(truncated, hashed_password)

def get_password_hash(password):
    """Hash a password using bcrypt."""
    truncated = _truncate_password(password)
    return pwd_context.hash(truncated)
