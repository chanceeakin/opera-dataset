import pandas as pd

df = pd.read_csv("./../data/raw-data.csv")

print(df.head())
arias = df[["Aria", "Composer", "Artist Category", "Frequency", "Voice Type"]].copy()
arias = arias.groupby(['Aria', 'Composer', 'Artist Category', "Voice Type"]).sum()
print(arias.head())
out = arias.to_json(orient="split")

with open('./../data/arias.json', 'w') as f:
    f.write(out)
