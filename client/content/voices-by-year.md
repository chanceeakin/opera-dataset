---
title: Voice Types By Year
date: March 15, 2019
---

## Overview

This chart compares voice type entries based on year.

### Cursory Findings

- More basses, and more sopranos in 2019. Others saw slight declines in total offering.
- 2018 data was not as clean as the 2019 data.

### Summary

This was a fun little project in using multiple dataframes. I adjusted the 2019 data slightly, by adding a 2019 column for each of those data points, then I normalized the 2018 data along similar measures.

As I haven't figured out (read: I'm too lazy) how to create an API with a queryable Pandas Dataframe on the backend, the creation of JSON data sets continues to suffice for my purposes.

### Data Manipulation

After normalizing different years of data in separate data files (feels like a no-no, is probably a no-no, but if you're bent on lecturing me, send a well commented pull request 🙃), then I used the Magic of Software™ to shove it all together.

```python
df = pd.read_csv("./../data/2018-raw-data.csv")
df2 = pd.read_csv("./../data/2019-raw-data.csv")

frames = pd.concat([df, df2])

result = frames.groupby(["Year", "Voice Type"]).sum()
```

Fun fact: you can concatenate dataframes together with `pd.contat()`! ...Writing python feels like cheating. All of that spit out the following [json](https://www.json.org/):

```jsonfile
...

"data": [
  {
    "Year": 2018,
    "Voice Type": "Baritone",
    "Frequency": 513
  },
...
```

I threw that into a BarChart group, and voilà! Data viz.
