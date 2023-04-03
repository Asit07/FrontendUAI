import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import csv
import json


with open('data.json', 'r') as f:
    data = json.load(f)

# Open CSV file for writing
with open('data.csv', 'w', newline='') as f:
    writer = csv.writer(f)

    # Write header row
    writer.writerow(data[0].keys())

    # Write data rows
    for row in data:
        writer.writerow(row.values())

df = pd.read_csv('data.csv')

# plot the count of each major
counts = df.groupby('major').size().reset_index(name='count')

plt.bar(counts['major'], counts['count'])
plt.xlabel('Major')
plt.ylabel('Count')
plt.title('Count by major')
plt.show()

# plot the count of each major
counts = df.groupby('degree').size().reset_index(name='count')

plt.bar(counts['degree'], counts['count'])
plt.xlabel('degree')
plt.ylabel('Count')
plt.title('Count by degree')
plt.show()
