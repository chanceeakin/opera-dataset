import pandas as pd
# import csv
# import json

df = pd.read_csv("./../data/raw-data.csv")

print(df.head())
print(df.columns)
print(df.describe())


out = df.to_json(orient='split')

with open('./../data/split.json', 'w') as f:
    f.write(out)
# csvfile = open('file.csv', 'r')
# jsonfile = open('file.json', 'w')

# fieldnames = ("FirstName","LastName","IDNumber","Message")
# reader = csv.DictReader( csvfile, fieldnames)
# for row in reader:
#     json.dump(row, jsonfile)
#     jsonfile.write('\n')
