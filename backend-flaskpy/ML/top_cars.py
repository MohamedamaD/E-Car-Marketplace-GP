import pandas as pd
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.neighbors import NearestNeighbors

preprocessed_data = pd.read_excel('Book1.xlsx')

preprocessed_data = preprocessed_data.dropna()

features = ['Make', 'Model', 'Year', 'MSRP', 'Length', 'Passenger Capacity']
target = 'Make'

X = preprocessed_data[features]
y = preprocessed_data[target]

label_encoder = LabelEncoder()
y_encoded = label_encoder.fit_transform(y)

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X.iloc[:, 3:]) 

nn_model = NearestNeighbors(n_neighbors=4)  
nn_model.fit(X_scaled)

def search_cars(msrp, length, passenger_capacity):
    input_data = pd.DataFrame({
        'MSRP': [msrp],
        'Length': [length],
        'Passenger Capacity': [passenger_capacity]
    })
    
    input_data_scaled = scaler.transform(input_data)

    _, indices = nn_model.kneighbors(input_data_scaled)
    
    closest_indices = indices[0][1:]
    
    closest_cars_features = X.iloc[closest_indices]
    
    return closest_cars_features