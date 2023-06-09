# main.py

import sys
import json
import api_requests
import lang_chain

state = sys.argv[1]
niche = sys.argv[2]
cities = json.loads(sys.argv[3])

print("State:", state)
print("Niche:", niche)
print("Cities:", cities)

# Testing
# Fetch data using API calls
api_requests_output = api_requests.test(niche, state, cities)

# Analyze the fetched data
lang_chain_output = lang_chain.test(niche, state, cities)

# Fetch data using API calls
# google_ads_data = api_requests.get_google_ads_data(parameters)
# google_places_data = api_requests.get_google_places_data(parameters)

# Analyze the fetched data
# analyzed_google_ads_data = lang_chain.analyze_google_ads_data(google_ads_data)
# analyzed_google_places_data = lang_chain.analyze_google_places_data(google_places_data)

# Combine the analyzed data and create the final processed data
processed_data = {
    "api_requests_output": api_requests_output,
    "lang_chain_output": lang_chain_output
}

# Return the processed data as a JSON string
print(json.dumps(processed_data))
