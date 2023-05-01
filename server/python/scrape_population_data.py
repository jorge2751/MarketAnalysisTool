import os
from dotenv import load_dotenv
import mysql.connector
from bs4 import BeautifulSoup
from tabulate import tabulate
import requests

# Load environment variables from .env file
load_dotenv()

# Read environment variables
username = os.getenv("MYSQL_USERNAME")
pw = os.getenv("MYSQL_PASSWORD")
db_name = "lhf_database"

# Establish a connection to the database
connection = mysql.connector.connect(
    host="localhost",
    user=username,
    password=pw,
    database=db_name,
)

cursor = connection.cursor()

us_states = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
            "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho",
            "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana",
            "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
            "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada",
            "New Hampshire", "New Jersey", "New Mexico", "New York",
            "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon",
            "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
            "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
            "West Virginia", "Wisconsin", "Wyoming"]

def scrape_state_data(state):
    formatted_state = state.lower().replace(" ", "")
    url = f"https://www.citypopulation.de/en/usa/cities/{formatted_state}/"

    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")
    table = soup.find("table", {"id": "ts"})

    cities_data = []
    for row in table.tbody.find_all("tr"):
        cells = row.find_all("td")
        city_name = cells[1].text.strip()
        city_status = cells[2].text.strip()
        city_population = int(cells[7].text.strip().replace(",", ""))
        cities_data.append(
            {"name": city_name, "status": city_status, "population": city_population})

    min_population = min(city_data["population"] for city_data in cities_data)
    max_population = max(city_data["population"] for city_data in cities_data)

    return {
        "state": state,
        "minPopulation": min_population,
        "maxPopulation": max_population,
        "cities": cities_data,
    }

def save_state_data_to_db(state_data):
    # Check if a row with the same state name already exists
    cursor.execute("SELECT * FROM states WHERE name = %s", (state_data["state"],))
    existing_state_data = cursor.fetchone()

    if existing_state_data:
        # Update the existing row
        cursor.execute(
            "UPDATE states SET min_population = %s, max_population = %s WHERE name = %s",
            (state_data["minPopulation"], state_data["maxPopulation"], state_data["state"]),
        )
        state_id = existing_state_data[0]
    else:
        # Insert a new row
        cursor.execute(
            "INSERT INTO states (name, min_population, max_population) VALUES (%s, %s, %s)",
            (state_data["state"], state_data["minPopulation"], state_data["maxPopulation"]),
        )
        state_id = cursor.lastrowid

    # Update the cities table
    for city_data in state_data["cities"]:
        try:
            cursor.execute(
                "INSERT INTO cities (state_id, name, status, population) VALUES (%s, %s, %s, %s)",
                (state_id, city_data["name"], city_data["status"], city_data["population"]),
            )
        except mysql.connector.Error as err:
            print(f"Error inserting city {city_data['name']}: {err}")

    connection.commit()



# Scrape population data for all states and save it to the MySQL database
for state in us_states:
    print(f"Scraping {state}...")
    state_data = scrape_state_data(state)
    save_state_data_to_db(state_data)
    print(f"{state} data saved to MySQL.")


# TEST
# def test_scrape_state_data(state):
#     cities_data = scrape_state_data(state)
    
#     # Create a header row for the table
#     headers = ["City Name", "Status", "Population"]

#     # Create a list of lists to represent the table data
#     table_data = [[city_data['name'], city_data['status'], city_data['population']] for city_data in cities_data]

#     # Print the table using the 'tabulate' function
#     print(tabulate(table_data, headers=headers))

# # Replace 'California' with any other state to test the function
# test_scrape_state_data("California")