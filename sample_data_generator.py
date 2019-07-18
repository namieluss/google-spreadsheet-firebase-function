import json
import random

reports = {}

""" Generate customer and sales report from 2009 to 2019 """
for year in range(2009, 2020):
    reports[year] = {}
    for month in ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]:        
        sales = random.randint (5000, 20000)
        customers = random.randint (100, 200)

        reports[year][month] = {"sales":sales, "customers": customers}

with open('fir-spreadsheet-export.json', 'w') as w:
    json.dump({"reports": reports}, w)