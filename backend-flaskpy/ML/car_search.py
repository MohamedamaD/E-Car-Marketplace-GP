import pandas as pd

preprocessed_data = pd.read_excel('modules\car_data.xlsx')

def calculate_distance(criteria, row):
    distance = 0
    for key, value in criteria.items():
        if value:
            distance += abs(float(value) - float(row[key]))
    return distance/100

def search_cars(msrp, length, passenger_capacity):
    criteria = {
        'MSRP': msrp,
        'Length': length,
        'Passenger Capacity': passenger_capacity
    }

    preprocessed_data['Distance'] = preprocessed_data.apply(lambda row: calculate_distance(criteria, row), axis=1)

    sorted_data = preprocessed_data.sort_values(by='Distance')

    top_results = sorted_data.head(3)

    return top_results.to_dict(orient='records')


