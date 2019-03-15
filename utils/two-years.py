
import pandas as pd
# import csv
# import json

df = pd.read_csv("./../data/2018-raw-data.csv")
df2 = pd.read_csv("./../data/2019-raw-data.csv")

frames = pd.concat([df, df2])

result = frames.groupby(["Year", "Voice Type"]).sum()

print(result.head())
print(result.columns)
print(result.describe())

out = result.to_json(orient='table')

with open('./../data/multi-year.json', 'w') as f:
    f.write(out)
# csvfile = open('file.csv', 'r')
# jsonfile = open('file.json', 'w')

# fieldnames = ("FirstName","LastName","IDNumber","Message")
# reader = csv.DictReader( csvfile, fieldnames)
# for row in reader:
#     json.dump(row, jsonfile)
#     jsonfile.write('\n')
