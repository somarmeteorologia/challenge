import csv
import json
import logging
import os
import re
from typing import Callable, Dict, Union, List


# Configure the root logger
logging.basicConfig(
    level=logging.INFO, 
    format='%(asctime)s [%(levelname)s] %(message)s', 
    datefmt='%d-%b-%y %H:%M:%S'
)

logger = logging.getLogger(__name__)

def main(data_path: str) -> None:
    logger.info("Starting extract.py script")
    #Verify if data_path has forecast and observed directories    
    logger.info(f"Checking if {data_path} has forecast and observed directories")
    
    has_directory = make_has_directory(os.path.isdir)
    directories = ["observed", "forecast"]
    
    directories_paths = list(map(lambda directory: data_path + "/" + directory, directories))
    found_directories = list(filter(lambda directory_path: 
                               directory_path if has_directory(directory_path) 
                               else None, directories_paths))
    logger.info(f"Applying extractor for found directories")
    
    output_filepath = '../data/extractor_output'
    file_extension = ".csv"
    get_filepaths = make_get_filepaths(os.walk)

    for directory in found_directories:
        if directory:
            filepaths = get_filepaths(directory, file_extension)
            for filepath in filepaths:
                csv_to_json(filepath, output_filepath)

    logger.info("Ending extract.py script")

def csv_to_json(csv_filepath, output_filepath):
    """
            Description
            -----------
                Transform a csv file to json file

            Parameters
            ----------
                - csv_filepath : str
                    - Path of csv file
                - output_filepath : str
                    - Path of where is going to dump the result
            
            Returns
            -------
                - None
                    - Creates a json file in filesystem

            Examples
            --------
                >>> csv_to_json("../data/observed/Abadia-BA_-11.56_-37.52.csv", "../data/output")
                None
    """

    data = get_metadata_from_filepath(csv_filepath)

    try:
        csv_data = {}
        with open(csv_filepath, 'r') as csv_file:
            csv_reader = csv.DictReader(csv_file, delimiter=";")

            column_names = csv_reader.fieldnames
            for column in column_names:
                csv_data[column] = []
            
            for row in csv_reader:
                for column_name in column_names:
                    column_value = row[column_name]
                    csv_data[column_name].append(column_value)
        
        if data['type'] == "forecast":
            data['forecast'] = csv_data
        if data['type'] == 'observed':
            data['observed'] = csv_data
        data.pop('type')
        
        output_filepath += f'/{data["state"]}_{data["city"]}.json'

        with open(output_filepath, "r") as json_file:
            found_data = json.load(json_file)
            data.update(found_data)
    except FileNotFoundError:
        pass

    with open(output_filepath, 'w') as json_file:
            json.dump(data, json_file, indent=4)

def get_metadata_from_filepath(filepath: str) -> Dict[str, Union[str, List[float]]]:
    """
            Description
            -----------
                Get metadata from filepath

            Parameters
            ----------
                - filepath : str 
                    - Path of directory
            
            Returns
            -------
                - Dict
                    - Return a dictionary containing the values extracted

            Examples
            --------
                >>> get_metadata_from_filepath(".data/observed/Abadia-BA_-11.56_-37.52.csv")
                {
                  type: "observed",
                  location: "Abadia",
                  state: "BA",
                  coordinates: ['-11.56', '-37.52'],
                  observed: {}
                }
                >>> get_metadata_from_filepath(".data/kano/test.txt")
                {
                  type: "",
                  location: "",
                  state: "",
                  coordinates: ['', '']
                  '': {}
                }
    """
    filename_match = re.search(r'(forecast|observed)/(\w+)-(\w+)_(\-?\d+\.\d+)_(\-?\d+\.\d+).\w+', filepath)
    type = filename_match.group(1) if filename_match else ''
    city = filename_match.group(2) if filename_match else ''
    state_abbreviation = filename_match.group(3) if filename_match else ''
    latitude = filename_match.group(4) if filename_match else ''
    longitude = filename_match.group(5) if filename_match else ''

    metadata = {
        "type": type,
        "city": city,
        "state": state_abbreviation,
        "coordinates": [latitude, longitude]
    }

    metadata[type] = {}

    return metadata

def make_get_filepaths(get_files_fn) -> Callable[[str, str], List[str]]:
    """
        Description
        -----------
            Creates get_filepaths function with get_files_fn.

        Parameters
        ----------
            - get_files_fn : Callable[[str], bool]) 
                - A function that get files in a directory with certain file extension
        
        Returns
        -------
            - Callable[[str]]
                - Returns get_filepaths function. 
                Go to implementation of make_get_filepaths function to see 
                how get_filepaths function works.

        Examples
        --------
            >>> make_get_filepaths(os.work)
            get_filepaths
    """

    def get_filepaths(directory_path: str, file_extension: str) -> List[str]:
        """
            Description
            -----------
                Get files inside of directory path.

            Parameters
            ----------
                - directory_path : str 
                    - Path of possible directory
                - file_extension: str
                    - Extension of file
            
            Returns
            -------
                - List[str]
                    - Return filepaths of files with given extension.

            Examples
            --------
                >>> get_filepaths("./data/observed", ".csv")
                ["abba.csv", "db.csv"]
                >>> get_filepaths("./data/observed", ".txt")
                []
        """
        filepaths = []

        for subdir, dirs, files in get_files_fn(directory_path):
            for file in files:
                #print os.path.join(subdir, file)
                filepath = subdir + os.sep + file

                if filepath.endswith(file_extension):
                    filepaths.append(filepath)
        
        return filepaths
    
    return get_filepaths

def make_has_directory(checker_fn: Callable[[str], bool]) -> Callable[[str], bool]:
    """
        Description
        -----------
            Creates has_directory function with checker.

        Parameters
        ----------
            - checker_fn : Callable[[str], bool]) 
                - A function that checks if directory exists in file system path
        
        Returns
        -------
            - Callable[[str, str], bool]
                - Returns has_directory function. 
                Go to implementation of make_has_directory function to see 
                how has_directory function works.

        Examples
        --------
            >>> make_has_directory(os.path.isdir)
            has_directory
    """

    def has_directory(directory_path: str) -> bool:
        """
            Description
            -----------
                Check if a directory is inside of file system path.

            Parameters
            ----------
                - directory_path : str 
                    - Path of possible directory
            
            Returns
            -------
                - bool 
                    - Return true if is found directory inside of path
                    and false if not.

            Examples
            --------
                >>> has_directory("./data/observed")
                True
                >>> has_directory("./data/dih")
                False
        """
        result = checker_fn(directory_path)
        if result:
            logger.info(f"It was found directory {directory_path}")
        else:
            logger.warning(f"It wasn't found directory {directory_path}")
        
        return result
    
    return has_directory

main("../data")