import csv
import json
import logging
import os
from typing import Callable, List


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
    found_directories = filter(lambda directory_path: 
                               directory_path if has_directory(directory_path) 
                               else None, directories_paths)
    
    logger.info(f"Applying extractor for found directories")
    
    output_filepath = 'data/extractor_output'
    file_extension = ".csv"
    get_filepaths = make_get_filepaths(os.walk)

    for directory in found_directories:
        if directory:
            filepaths = get_filepaths(directory, file_extension)
            map(lambda filepath: csv_to_json(filepath, output_filepath), filepaths)

    logger.info("Ending extract.py script")

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

def make_has_directory(checker_fn: Callable[[str], bool]) -> Callable[[str, str], bool]:
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

main("./data")