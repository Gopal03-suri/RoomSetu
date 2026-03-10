import requests
import json

BASE_URL = "http://localhost:8000/api"

def test_signup():
    """Test user signup"""
    signup_data = {
        "username": "testuser",
        "email": "testuser@example.com",
        "password": "testpass123",
        "first_name": "Test",
        "last_name": "User",
        "role": "tenant",
        "city": "Mumbai",
        "phone": "9876543210"
    }
    
    response = requests.post(f"{BASE_URL}/users/signup/", json=signup_data)
    print(f"Signup Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
    return response.json()

def test_login():
    """Test user login"""
    login_data = {
        "email": "testuser@example.com",
        "password": "testpass123"
    }
    
    response = requests.post(f"{BASE_URL}/users/login/", json=login_data)
    print(f"\nLogin Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")

if __name__ == "__main__":
    print("=== Testing Signup API ===")
    test_signup()
    
    print("\n=== Testing Login with New Account ===")
    test_login()
