import requests
import sys

filename = input("filename=")
output = open(filename, "w")
sys.stdout = output

BASE_URL = "https://costmanagerserversideproject.onrender.com"

print("======== STARTING UNIT TESTS ========")

# ---------- /api/about ----------
print("\nTESTING /api/about")
try:
    url = f"{BASE_URL}/api/about"
    response = requests.get(url)
    print("URL:", url)
    print("Status Code:", response.status_code)
    print("Response:", response.json())
except Exception as e:
    print("ERROR:", e)


# ---------- /api/add ----------
print("\nTESTING /api/add (valid)")
try:
    url = f"{BASE_URL}/api/add"
    payload = {
        "userid": 123123,
        "description": "apple",
        "category": "food",
        "sum": 5,
        "day": 8,
        "month": 6,
        "year": 2025
    }
    response = requests.post(url, json=payload)
    print("URL:", url)
    print("Payload:", payload)
    print("Status Code:", response.status_code)
    print("Response:", response.json())
except Exception as e:
    print("ERROR:", e)


print("\nTESTING /api/add (missing fields)")
try:
    url = f"{BASE_URL}/api/add"
    payload = {
        "userid": 123123,
        "category": "food"
    }
    response = requests.post(url, json=payload)
    print("URL:", url)
    print("Payload:", payload)
    print("Status Code:", response.status_code)
    print("Response:", response.json())
except Exception as e:
    print("ERROR:", e)

print("\nTESTING /api/add (invalid category)")
try:
    payload = {
        "userid": 123123,
        "description": "unexpected category",
        "category": "vacation",
        "sum":100,
        "day": 8,
        "month": 6,
        "year": 2025
    }
    response = requests.post(f"{BASE_URL}/api/add", json=payload)
    print("Payload:", payload)
    print("Status Code:", response.status_code)
    print("Response:", response.json())
except Exception as e:
    print("ERROR:", e)

print("\nTESTING /api/add (invalid date)")
payload = {
    "userid": 123123,
    "description": "invalid date",
    "category": "food",
    "sum": 10,
    "day": 50,
    "month": 13,
    "year": 2025
}
try:
    response = requests.post(f"{BASE_URL}/api/add", json=payload)
    print("Payload:", payload)
    print("Status Code:", response.status_code)
    print("Response:", response.json())
except Exception as e:
    print("ERROR:", e)

print("\nTESTING /api/add (negative sum)")
payload = {
    "userid": 123123,
    "description": "negative sum",
    "category": "food",
    "sum": -100,
    "day": 8,
    "month": 6,
    "year": 2025
}
try:
    response = requests.post(f"{BASE_URL}/api/add", json=payload)
    print("Payload:", payload)
    print("Status Code:", response.status_code)
    print("Response:", response.json())
except Exception as e:
    print("ERROR:", e)

# ---------- /api/report ----------
print("\nTESTING /api/report")
try:
    url = f"{BASE_URL}/api/report?id=123123&year=2025&month=6"
    response = requests.get(url)
    print("URL:", url)
    print("Status Code:", response.status_code)
    print("Response:", response.json())
except Exception as e:
    print("ERROR:", e)


print("\nTESTING /api/report (missing params)")
try:
    url = f"{BASE_URL}/api/report"
    response = requests.get(url)
    print("URL:", url)
    print("Status Code:", response.status_code)
    print("Response:", response.json())
except Exception as e:
    print("ERROR:", e)

print("\nTESTING /api/report (non-existing user)")
try:
    url = f"{BASE_URL}/api/report?id=000000&year=2025&month=6"
    response = requests.get(url)
    print("URL:", url)
    print("Status Code:", response.status_code)
    print("Response:", response.json())
except Exception as e:
    print("ERROR:", e)

print("\nTESTING /api/report (missing month)")
url = f"{BASE_URL}/api/report?id=123123&year=2025"
try:
    response = requests.get(url)
    print("URL:", url)
    print("Status Code:", response.status_code)
    print("Response:", response.json())
except Exception as e:
    print("ERROR:", e)

print("\nTESTING /api/report (invalid type for month)")
url = f"{BASE_URL}/api/report?id=123123&year=2025&month=April"
try:
    response = requests.get(url)
    print("URL:", url)
    print("Status Code:", response.status_code)
    print("Response:", response.json())
except Exception as e:
    print("ERROR:", e)


# ---------- /api/users/:id ----------
print("\nTESTING /api/users/123123")
try:
    url = f"{BASE_URL}/api/users/123123"
    response = requests.get(url)
    print("URL:", url)
    print("Status Code:", response.status_code)
    print("Response:", response.json())
except Exception as e:
    print("ERROR:", e)

print("\nTESTING /api/users/000000 (non-existing user)")
try:
    url = f"{BASE_URL}/api/users/000000"
    response = requests.get(url)
    print("URL:", url)
    print("Status Code:", response.status_code)
    print("Response:", response.json())
except Exception as e:
    print("ERROR:", e)


print("\n======== END OF TESTS ========")
output.close()
