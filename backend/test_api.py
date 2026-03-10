import requests
import json

BASE_URL = 'http://localhost:8000/api'

def test_api():
    print("=" * 50)
    print("Testing RoomSetu Backend API")
    print("=" * 50)
    
    # Test 1: Get Properties
    print("\n1. Testing GET /api/properties/")
    try:
        response = requests.get(f'{BASE_URL}/properties/')
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Success! Found {len(data)} properties")
            if data:
                print(f"   First property: {data[0]['title']}")
        else:
            print(f"❌ Failed with status code: {response.status_code}")
    except Exception as e:
        print(f"❌ Error: {e}")
        print("   Make sure backend server is running!")
    
    # Test 2: Get Roommates
    print("\n2. Testing GET /api/roommates/")
    try:
        response = requests.get(f'{BASE_URL}/roommates/')
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Success! Found {len(data)} roommates")
        else:
            print(f"❌ Failed with status code: {response.status_code}")
    except Exception as e:
        print(f"❌ Error: {e}")
    
    # Test 3: Login
    print("\n3. Testing POST /api/auth/login/")
    try:
        session = requests.Session()
        response = session.post(
            f'{BASE_URL}/auth/login/',
            json={'email': 'tenant@roomsetu.com', 'password': '123456'},
            headers={'Content-Type': 'application/json'}
        )
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Success! Logged in as: {data['user']['username']}")
        else:
            print(f"❌ Failed with status code: {response.status_code}")
            print(f"   Response: {response.text}")
    except Exception as e:
        print(f"❌ Error: {e}")
    
    print("\n" + "=" * 50)
    print("API Testing Complete!")
    print("=" * 50)

if __name__ == '__main__':
    test_api()
