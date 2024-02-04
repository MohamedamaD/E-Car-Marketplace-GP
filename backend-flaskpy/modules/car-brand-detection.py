import tensorflow as tf
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout
from tensorflow.keras.models import Sequential
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.optimizers import Adam

IMAGE_SIZE = 331
BATCH_SIZE = 64
NUM_CLASSES = 8
EPOCHS = 10

root = 'data\Car_Brand_Logos'
dataGen = ImageDataGenerator()

train_generator = dataGen.flow_from_directory(
    root+'/train',
    target_size=(IMAGE_SIZE, IMAGE_SIZE), 
    batch_size=BATCH_SIZE,
    color_mode='rgb',
    class_mode='categorical'
)

test_generator = dataGen.flow_from_directory(
    root+'/test',
    target_size=(IMAGE_SIZE, IMAGE_SIZE),
    batch_size=BATCH_SIZE,
    color_mode='rgb',
    class_mode='categorical'
)

# cnn model architecture
model = Sequential()
model.add(Conv2D(32, (3, 3), activation='relu', input_shape=(IMAGE_SIZE, IMAGE_SIZE, 3)))
model.add(MaxPooling2D((2, 2)))

model.add(Conv2D(64, (3, 3), activation='relu'))
model.add(MaxPooling2D((2, 2)))

model.add(Conv2D(128, (3, 3), activation='relu'))
model.add(MaxPooling2D((2, 2)))

model.add(Flatten())
model.add(Dense(256, activation='relu'))
model.add(Dropout(0.2))

model.add(Dense(NUM_CLASSES, activation='softmax')) 

optimizer = Adam(learning_rate=0.0001)
model.compile(optimizer=optimizer, loss='categorical_crossentropy', metrics=['accuracy'])


model.fit(train_generator, epochs=EPOCHS, validation_data=test_generator)
eval_result = model.evaluate(test_generator)

print("Test Loss:", eval_result[0])
print("Test Accuracy:", eval_result[1])

# Save the entire model to a file
model.save('logo_classification_model.h5')

# try using vgg model architecture
# def create_vgg19_model(input_shape=(IMAGE_SIZE, IMAGE_SIZE, 3), num_classes=NUM_CLASSES):
#     model = Sequential()
    
#     model.add(Conv2D(64, (3, 3), activation='relu', padding='same', input_shape=input_shape, trainable=False))
#     model.add(Conv2D(64, (3, 3), activation='relu', padding='same', trainable=False))
#     model.add(MaxPooling2D((2, 2), strides=(2, 2),trainable=False))

#     model.add(Conv2D(128, (3, 3), activation='relu', padding='same', trainable=False))
#     model.add(Conv2D(128, (3, 3), activation='relu', padding='same', trainable=False))
#     model.add(MaxPooling2D((2, 2), strides=(2, 2), trainable=False))

#     model.add(Conv2D(256, (3, 3), activation='relu', padding='same',trainable=False))
#     model.add(Conv2D(256, (3, 3), activation='relu', padding='same',trainable=False))
#     model.add(Conv2D(256, (3, 3), activation='relu', padding='same',trainable=False))
#     model.add(Conv2D(256, (3, 3), activation='relu', padding='same',trainable=False))
#     model.add(MaxPooling2D((2, 2), strides=(2, 2),trainable=False))
    
#     model.add(Conv2D(512, (3, 3), activation='relu', padding='same'))
#     model.add(Conv2D(512, (3, 3), activation='relu', padding='same'))
#     model.add(Conv2D(512, (3, 3), activation='relu', padding='same'))
#     model.add(Conv2D(512, (3, 3), activation='relu', padding='same'))
#     model.add(MaxPooling2D((2, 2), strides=(2, 2)))

#     model.add(Conv2D(512, (3, 3), activation='relu', padding='same'))
#     model.add(Conv2D(512, (3, 3), activation='relu', padding='same'))
#     model.add(Conv2D(512, (3, 3), activation='relu', padding='same'))
#     model.add(Conv2D(512, (3, 3), activation='relu', padding='same'))
#     model.add(MaxPooling2D((2, 2), strides=(2, 2)))

#     # Flatten and fully connected layers
#     model.add(Flatten())
#     model.add(Dense(1024, activation='relu'))
#     model.add(Dropout(0.2))
    
#     model.add(Flatten())
#     model.add(Dense(512, activation='relu'))
#     model.add(Dropout(0.2))
    
#     model.add(Flatten())
#     model.add(Dense(8, activation='softmax'))
    
#     return model

# vgg19_model  = create_vgg19_model()
# vgg19_model.summary()
# optimizer = Adam(learning_rate=0.0001)

# vgg19_model.compile(optimizer=optimizer, loss='categorical_crossentropy', metrics=['accuracy'])
# history = vgg19_model.fit(train_generator, steps_per_epoch=len(train_generator), epochs=EPOCHS, validation_data=test_generator, validation_steps=len(test_generator))