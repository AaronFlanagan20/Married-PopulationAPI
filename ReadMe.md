# Married-Population API
**By Aaron Flanagan and Ciaran Brennan**

*The aim of this project is to compare the population of Ireland, between 2011 and 2014, to the amount of married couples in Ireland in the same year. The scope of this API can be used in many aspects*

```
1. Auctioners looking for new home buyers.
2. Travel Agencies doing honeymoon deals.
3. New born products.
4. Insurance and tax calculations.
5. Companies calculating break even costs.
6. etc..
```

## Datasets used
There are two datasets used for this api: **Population 2011 - 2014.csv** and **Marriages 2011 - 2014.csv**. Both where supplied from the Central Statistics Office (CSO).

**Note** Minor format changes have been made to the datasets supplied by CSO.

**Population 2011 - 2014.json** is based on Age, gender and year. This file is based on the census of Ireland in the years of 2011, 2012, 2013 and 2014. It also calculates the total for both genders. 

**Marriages 2011 - 2014.json** is based on Age, gender and year. This file holds the statistics of how many marriages are active in the country in the same years. However this doesn't take both genders into account.

Two .csv files have been added to the repository so the data can be manipulated, updated or deleted.

1. **Population 2011 - 2014.csv**
2. **Marriages 2011 - 2014.csv**

## How to Query the API

### The steps to download this api.
**Step 1**: Download and access source code.
* First you can download the zip file or fork this repository to your own github and clone it to your machine.
* Next open your terminal/command prompt and change directory to where the repository is stored on your local machine.
* You can now run the command *_node Server.js_* and run the server on our local machine.
* Finally you can what the population amount in a given year at the following URL with your lcoal machine browser:

  *127.0.0.1:8000/population/[gender]/[year]*
  where you replace [year] with the year and [gender] with a gender.

  For example, the URL:
  *127.0.0.1:8000/population/male/2011*
  will return the number of males there was in Ireland in 2011.


**Step 2**: Run API and compare data

*The following URL's will post a request to the API to return data.*


You can compare both the datasets:
* 127.0.0.1:8000/population/marriage/sex/age/[sex]/[age]
* 127.0.0.1:8000/population/marriage/year/[year]
* 127.0.0.1:8000/population/marriage/age/year/[age]/[year]

*Sample Reponse*

**Population 2011 - 2014.json**
```json
 {
   "age": "21",
   "sex": "female",
   "year_2011": 28878,
   "year_2012": 28065,
   "year_2013": 25975,
   "year_2014": 24437
  }
```
**Marriage 2011 - 2014.json**
```json
 {
    "sex":"female",
    "age":21,
    "year_2011":3.5,
    "year_2012":4.8,
    "year_2013":4.6,
    "year_2014":5.6
  }
```


## Query URLS


#### Population

- 127.0.0.1:8000/population/sex/age/[sex]/[age] - Returns the specific gender and age in the country for 4 years
- 127.0.0.1:8000/population/year/[year] - Returns all ages and sexs in the country in given year
- 127.0.0.1:8000/population/age/year/[age]/[year] - Returns population for age and all sex's(male,female,both) for specific given year
- 127.0.0.1:8000/population/all - Returns all 3 sex's with age and population for 4 years


#### Marriages

- 127.0.0.1:8000/marriage/sex/age/[sex]/[age] - Returns the specific gender and age in the country for 4 years
- 127.0.0.1:8000/marriage/year/[year] - Returns all ages and sexs in the country in given year
- 127.0.0.1:8000/marriage/age/year/[age]/[year] - Returns marriages for age and all sex's(male,female,both) for specific given year
- 127.0.0.1:8000/marriage/all - Returns all 3 sex's with age and population for 4 years

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

[CSO datasets](http://www.cso.ie/en/index.html).

[Ian McLoughlin Lecture notes](https://github.com/ianmcloughlin).
