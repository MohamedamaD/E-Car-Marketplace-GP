import pandas as pd
from sklearn.preprocessing import StandardScaler
import joblib


preprocessed_data = pd.read_excel('Book1_filled.xlsx')

features = ['Make', 'Model', 'Year', 'MSRP', 'Length', 'Passenger Capacity']

# Prepare the data
X = preprocessed_data[features]

# Standardize the features (excluding make, model, and year)
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X.iloc[:, 3:])  # Exclude make, model, and year for scaling

# Load the saved Nearest Neighbors model
nn_model = joblib.load('nearest_neighbors_model.pkl')

# Define the search function using the loaded model
def search_cars(msrp, length, passenger_capacity):
    # Prepare the input data
    input_data = pd.DataFrame({
        'MSRP': [msrp],
        'Length': [length],
        'Passenger Capacity': [passenger_capacity]
    })

    # Standardize the input data
    input_data_scaled = scaler.transform(input_data)

    # Find the indices of the closest cars
    _, indices = nn_model.kneighbors(input_data_scaled)

    # Get the indices of the top 3 closest cars (excluding the input car itself)
    closest_indices = indices[0][1:]

    # Get the features of the closest cars
    closest_cars_features = X.iloc[closest_indices]

    return closest_cars_features