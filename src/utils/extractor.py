import csv
import json
import os
from typing import Callable

def csv_to_json(csv_file_path, json_file_path):
    data = []
    
    # Extract the CSV filename
    # Uses regex for getting this information
    # First name is city
    # Second name after - is state
    # The last numbers is coordinates
    csv_filename = csv_file_path.split('/')[-1]
    
    # Read the CSV file and convert to JSON
    with open(csv_file_path, 'r') as csv_file:
        csv_reader = csv.DictReader(csv_file)
        data = [row for row in csv_reader]
    
    # Create a dictionary containing the CSV filename and its data
    # if file is in folder forecast or observed, all data extracted from json will become
    # directory of it
    json_data = {
        'csv_filename': csv_filename,
        'data': data
    }
    
    # Check if already has json file created if it's observed or forecast
    # If yes, append the JSON data to file
    # If no, write the JSON data to a file
    with open(json_file_path, 'w') as json_file:
        json.dump(json_data, json_file, indent=4)

def apply_extractor(directory_path, extractor_function):
    # this function apply extractor function csv_to_json in directory
    return 1

def make_has_directory(checker_fn: Callable[[str], bool]) -> Callable[[str, str], bool]:
    """
        Description
        -----------
            Creates has_directory function with checker.

        Parameters
        ----------
            - checker_fn (Callable[[str], bool])): A function that checks if directory 
            exists in file system path
        
        Returns
        -------
            - Callable[[str, str], bool] : Returns has_directory function. 
            Go to implementation of make_has_directory function to see how has_directory
            function works.

        Examples
        --------
            >>> make_has_directory(os.path.isdir)
            has_directory
    """

    def has_directory(path_name: str, directory_name: str) -> bool:
        """
            Description
            -----------
                Check if a directory is inside of file system path.

            Parameters
            ----------
                - path_name (str): Name of file system path
                - directory_name (str): Name of possible directory
            
            Returns
            -------
                - (bool): Return true if is found directory inside of path
                and false if not.

            Examples
            --------
                >>> has_directory("./data", "observed")
                True
                >>> has_directory("./data", "dih")
                False
        """
        directory_path = path_name + directory_name
        return checker_fn(directory_path)
    
    return has_directory

def main(data_path):
    # define csv_to_file_function
    #Verify if data_path has forecast and observed directories
    # If has call csv_to_json for both directories and read each file inside of both
    # Else, finish program
    # Usage example
    csv_file_path = 'path/to/input.csv'
    json_file_path = 'path/to/output.json'
    csv_to_json(csv_file_path, json_file_path)
    return 0

def container():
    has_directory = make_has_directory(os.path.isdir)