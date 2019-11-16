import os
import csv

for file in os.listdir('.'):
    os.rename(file, file.title().upper())