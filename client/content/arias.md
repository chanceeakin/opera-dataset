---
title: Arias
date: January 5, 2019
---

## Overview

This is a pack chart of arias, whose size is determined by the frequency with which the aria occurred.

### Cursory Findings

- Normalization issues continue. It's most evidenced with "Ach, ich fühls"...mostly because it's the most prevalent among the 2019 lists. The commas and whitespacing did reveal another set of issues; namely...I need to get a lot better with my data manipulation.
- Korngold's "Mein Sehnen, mein Wähnen": 17 Filene entries. Count's Aria: 21 Filene entries. This is me not reading into that -> 😐.
- Playing with color in visualizations is fun!

### Normalization efforts

```python
print(df.head())
arias = df[["Aria", "Composer", "Artist Category", "Frequency", "Voice Type"]].copy()
arias = arias.groupby(['Aria', 'Composer', 'Artist Category', "Voice Type"]).sum()
print(arias.head())
out = arias.to_json(orient="split")
```

The above code groups and sums as the following:

```sh
/* before */
Frequency                     Aria    Composer Language                Opera Voice Type Artist Category
0         45          Ach, ich fühl's      Mozart   German      Die Zauberflöte    Soprano          Filene
1         25  Ain't it a pretty night       Floyd  English             Susannah    Soprano          Filene
2         24               Jewel Song      Gounod   French                Faust    Soprano          Filene
3         23         No word from Tom  Stravinsky  English  The Rake's Progress    Soprano          Filene
4         21          Embroidery Aria     Britten  English         Peter Grimes    Soprano          Filene

/* after */
Aria                     Composer Artist Category Voice Type          Frequency
A Hundred Thousand Stars Heggie   Studio          Baritone            1
A Word for this Old Man  Gordon   Filene          Tenor               1
A hundred thousand stars Heggie   Filene          Baritone            1
A quoi bon l'economie    Massenet Filene          Baritone            2
                                  Studio          Baritone            2
```

I had originally thought that the `sum()` method on the dataframe _also_ took care of all the categories, but alas, it doesn't. However, it _did_ give me an opportunity to have a little fun with [React Context](https://reactjs.org/docs/context.html). I used context to help out with the circle coloring.
