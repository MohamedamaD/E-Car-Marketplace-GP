import matplotlib.pyplot as plt
import numpy as np
from tqdm import tqdm

import torch
import torch.nn as nn
import torch.optim as optim
import torchvision
import torchvision.models as models
import torchvision.transforms as transforms

import os
import PIL.Image as Image
from IPython.display import display

from sklearn.metrics import confusion_matrix, classification_report
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

checkpoint = torch.load(r'weights\resnet_model_with_labels.pth', map_location=torch.device('cpu'))
loaded_model = models.resnet34(pretrained=False) 
loaded_model.fc = nn.Linear(loaded_model.fc.in_features, len(checkpoint['class_labels'])) 
loaded_model.load_state_dict(checkpoint['model_state_dict'])
loaded_model.eval() 

class_labels = checkpoint['class_labels']

def preprocess_image(image):
    transform = transforms.Compose([
        transforms.Resize((400, 400)),
        transforms.ToTensor(),
        transforms.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5))
    ])
    image = Image.open(image)
    image = transform(image).unsqueeze(0)
    return image

def predict_image(image_path):
    input_image = preprocess_image(image_path)
    with torch.no_grad():
        output = loaded_model(input_image)
        probabilities = torch.nn.functional.softmax(output[0], dim=0)
        predicted_class = torch.argmax(probabilities).item()
    
    return class_labels[predicted_class]

