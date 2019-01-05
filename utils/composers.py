import pandas as pd

df = pd.read_csv("./../data/raw-data.csv")

print(df.head())
composers = df[["Composer", "Frequency"]].copy()
composers = composers.groupby(['Composer']).sum()
print(composers.head())
out = composers.to_json()

with open('./../data/composers.json', 'w') as f:
    f.write(out)
