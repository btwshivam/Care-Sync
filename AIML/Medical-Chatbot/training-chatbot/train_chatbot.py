
import random
import json
import pickle
import numpy as np
import pandas as pd

import nltk
nltk.download('punkt')
nltk.download('wordnet')
from nltk.stem import WordNetLemmatizer
import tensorflow
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense,Activation,Dropout
from tensorflow.keras.optimizers import SGD
from tensorflow.keras.optimizers.legacy import SGD

lemmatizer=WordNetLemmatizer()

with open('intents.json') as json_file:
    intents = json.load(json_file)

words=[]
classes=[]
documents=[]
ignore_letters=['?','!','.',',']

for intent in intents['intents']:
  for pattern in intent['patterns']:
    word_list=nltk.word_tokenize(pattern)
    words.extend(word_list)
    documents.append((word_list,intent['tag']))
    if intent['tag'] not in classes:
      classes.append(intent['tag'])


words =[lemmatizer.lemmatize(word) for word in words if word not in ignore_letters]
words = sorted(set(words))
classes=sorted(set(classes))
pickle.dump(words,open('words.pkl','wb'))
pickle.dump(classes,open('classes.pkl','wb'))



training = []
output_empty = [0] * len(classes)

# Process each document
for document in documents:
    bag = []
    word_patterns = [lemmatizer.lemmatize(word.lower()) for word in document[0]]
    for word in words:
        bag.append(1) if word in word_patterns else bag.append(0)

    # Debugging bag length
    if len(bag) != len(words):
        print(f"Bag length mismatch: {len(bag)} vs {len(words)}")

    # Create output row
    output_row = list(output_empty)
    output_row[classes.index(document[1])] = 1

    # Debugging output row length
    if len(output_row) != len(classes):
        print(f"Output row length mismatch: {len(output_row)} vs {len(classes)}")

    training.append([bag, output_row])

# Shuffle training data
random.shuffle(training)

# Debug training consistency before conversion
for i, t in enumerate(training):
    if len(t[0]) != len(words):
        print(f"Training entry {i} bag length mismatch: {len(t[0])} vs {len(words)}")
    if len(t[1]) != len(classes):
        print(f"Training entry {i} output_row length mismatch: {len(t[1])} vs {len(classes)}")

# Convert to NumPy array
training = np.array(training, dtype=object)

train_x=list(training[:,0])
train_y=list(training[:,1])
model=Sequential()
model.add(Dense(128,input_shape=(len(train_x[0]),),activation='relu'))
model.add(Dropout(0.5))
model.add(Dense(64,activation='relu'))
model.add(Dropout(0.5))
model.add(Dense(len(train_y[0]),activation='softmax'))



sgd = SGD(learning_rate=0.01, decay=1e-6, momentum=0.9, nesterov=True)
model.compile(loss='categorical_crossentropy', optimizer=sgd, metrics=['accuracy'])
hist = model.fit(np.array(train_x), np.array(train_y), epochs=200, batch_size=5, verbose=1)
model.save('chatbotmodel.h5', hist)
print('Training Done')
