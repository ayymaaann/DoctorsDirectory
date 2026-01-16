import json
import random

first_names = [
    "Amit", "Neha", "Rakesh", "Pooja", "Sanjay",
    "Vikas", "Anil", "Kavita", "Rajesh", "Sunita"
]

last_names = [
    "Sharma", "Verma", "Gupta", "Singh",
    "Mehta", "Khanna", "Malhotra", "Jain"
]

specializations = [
    "Cardiologist",
    "Neurologist",
    "Dermatologist",
    "Gynecologist",
    "Orthopedic",
    "ENT",
    "Pediatrician",
    "Physician"
]

cities = [
    "Delhi",
    "Noida",
    "Ghaziabad",
    "Faridabad",
    "Greater Noida",
    "Okhla"
]

hospitals = [
    ("AIIMS Delhi", "Government"),
    ("Safdarjung Hospital", "Government"),
    ("GTB Hospital", "Government"),
    ("Apollo Hospitals", "Private"),
    ("Max Hospital", "Private"),
    ("Fortis Hospital", "Private"),
    ("Yashoda Hospital", "Private"),
    ("Kailash Hospital", "Private")
]

educations = [
    "MBBS, MD",
    "MBBS, MS",
    "MBBS, DNB",
    "MBBS, MD (Specialist)"
]

about_lines = [
    "Has extensive experience treating patients across Delhi NCR.",
    "Known for patient-centric and ethical medical care.",
    "Works across multiple government and private hospitals.",
    "Experienced specialist handling complex clinical cases."
]

TOTAL_DOCTORS = 300  # 👈 CHANGE THIS IF YOU WANT MORE

doctors = []  # 🔥 IMPORTANT: list OUTSIDE loop

for i in range(TOTAL_DOCTORS):
    name = f"Dr. {random.choice(first_names)} {random.choice(last_names)}"
    specialization = random.choice(specializations)
    city = random.choice(cities)

    location_count = random.randint(1, 2)
    selected_hospitals = random.sample(hospitals, location_count)

    locations = []
    for h in selected_hospitals:
        locations.append({
            "hospital": h[0],
            "type": h[1]
        })

    doctor = {
        "name": name,
        "specialization": specialization,
        "city": city,
        "education": random.choice(educations),
        "experience": random.randint(5, 25),
        "about": random.choice(about_lines),
        "locations": locations
    }

    doctors.append(doctor)  # 🔥 APPEND INSIDE LOOP

# 🔥 WRITE FILE ONCE (NOT INSIDE LOOP)
with open("doctors.json", "w", encoding="utf-8") as f:
    json.dump(doctors, f, indent=2)

print(f"✅ {len(doctors)} doctors generated successfully!")