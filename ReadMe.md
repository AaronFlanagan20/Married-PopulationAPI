# Married-Population API
**By Aaron Flanagan and Ciaran Brennan**

*The aim of this project is to compare the population of Ireland, between 2011 and 2014, to the amount of married couples in Ireland in the same year. The scope of this API can be used in many aspects*

```
1. Auctioners looking for new home buyers
2. Travel Agencies doing honeymoon deals.
3. New born products.
4. Insurance and tax calculations.
5. etc
```

## Datasets used
There are two datasets used for this api: **Population 2011 - 2014.csv** and **Marriages 2011 - 2014.csv**

**Population 2011 - 2014.json** is based on Age, gender and year. This also reads in the total for both genders.
**Marriages 2011 - 2014.json** is based on Age, gender and year. However this doesn't take both genders into account.

Two .csv files have been added to the repository so the data can be manipulated, updated or deleted.

1. **Population 2011 - 2014.csv**
2. **Marriages 2011 - 2014.csv**

## How to Query the API

### There is two methods to use this API.
**Method 1**: Download and access source code.
* First you can download the zip file or fork this repository to your own github and clone it
* Next open your terminal/command prompt and change directory to where the repository is stored on your local machine
* You can now run the command *_node Server.js_* and run the server on our local machine
* Finally you can what the population amount in a given year at the following URL with your lcoal machine browser:

  *127.0.0.1:8000/population/[gender]/[year]*
  where you replace [year] with the year and [gender] with a gender.

  For example, the URL:
  *127.0.0.1:8000/population/male/2011*
  will return the number of males there was in Ireland in 2011.


**Method 2**: Query API online

You can query the api at *http://married-populationAPI/male/2012/*

## Query URLS


#### Population

- 127.0.0.1:8000/population/[gender]/[year] Returns amount of [gender] in the country in given [year]
- 127.0.0.1:8000/population/[year] Returns amount of people in the country in given [year]
- 127.0.0.1:8000/population/[age]/[year] Returns amount of [age] in the country in given [year]
- 127.0.0.1:8000/population/[age]/[gender]/[year] Returns amount of [age] and [gender] in the country in given [year]


#### Marriages

- 127.0.0.1:8000/marriages/[gender]/[year] Returns amount of [gender] married in given [year]
- 127.0.0.1:8000/marriages/[year] Returns amount of people married in given [year]
- 127.0.0.1:8000/marriages/[age]/[year] Returns amount of [age] married in given [year]
- 127.0.0.1:8000/marriages/[age]/[gender]/[year] Returns amount of [age] and [gender] married in given [year]

## Returned format
The API will return information in one of two formats:

**Population 2011 - 2014.json**
```json
  {
    "Sex":"Both",
    "Age":"0",
    "2011":72452,
    "2012":74235,
    "2013":75160,
    "2014":73850
  }
```

**Marriages 2011 - 2014.json**
```json
  {
    "Sex":"Male",
    "Age":20,
    "2011":1.7,
    "2012":2.3,
    "2013":2.5,
    "2014":2.4
  }
```

## References
[Node,js](https://nodejs.org/en/).

[Ian McLoughlin Lecture notes](https://github.com/ianmcloughlin).