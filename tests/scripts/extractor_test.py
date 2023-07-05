import logging
import os
import pytest
import sys

sys.path.append('./scripts')
import extractor

# def test_make_has_directory():
#     check_fn = os.path.isdir
#     result = extractor.make_has_directory(check_fn)
#     assert result == callable

class Test_has_directory:
    """
        Description
        -----------
            This class contains tests cases to check has_directory function
            from extractor.py.
    """

    @pytest.fixture(autouse=True)
    def before_and_after_each_test(self, caplog):
        """
            Fixture to clean up logging output before each test.
        """
        #before each test
        # Set to capture logs above INFO
        caplog.set_level(logging.INFO)
        caplog.clear()
        yield
        #after each test
    
    @pytest.fixture
    def check_fn_true(self, monkeypatch):
        def mock_isdir(path):
            return True  # Always return True for testing purposes

        # Patch the os.path.isdir function with the mock
        monkeypatch.setattr(os.path, "isdir", mock_isdir)
    
    @pytest.fixture
    def check_fn_false(self, monkeypatch):
        def mock_isdir(path):
            return False  # Always return False for testing purposes

        # Patch the os.path.isdir function with the mock
        monkeypatch.setattr(os.path, "isdir", mock_isdir)
    
    def test_has_directory(self, check_fn_true):
        """
            Description
            -----------
                When is given a directory name that exist
            
            Expected Result
            ---------------
                returns True
        """

        #setup
        has_directory = extractor.make_has_directory(os.path.isdir)
        
        #when
        test1 = has_directory("./data/observed")

        #result
        assert test1 is True
    
    def test_has_directory_log(self, check_fn_true, caplog):
        """
            Description
            -----------
                When is given a directory name that exist
            
            Expected Result
            ---------------
                Shows log that directory was found
        """

        #setup
        records = caplog.records
        has_directory = extractor.make_has_directory(os.path.isdir)
        directory_path = "./data/observed"
        
        #when
        test1 = has_directory(directory_path)

        #result
        assert len(records) == 1
        assert records[0].message == f"It was found directory {directory_path}"
    
    def test_doesnt_have_directory(self, check_fn_false):
        """
            Description
            -----------
                When is given a directory name that doesnt exist
            
            Expected Result
            ---------------
                returns False
        """

        # setup
        has_directory = extractor.make_has_directory(os.path.isdir)

        # when
        test2 = has_directory("./data/tests")

        # result
        assert test2 is False
    
    def test_doesnt_have_directory_log(self, check_fn_false, caplog):
        """
            Description
            -----------
                When is given a directory name that doesnt exist
            
            Expected Result
            ---------------
                Shows log that directory wasn't found
        """

        #setup
        records = caplog.records
        has_directory = extractor.make_has_directory(os.path.isdir)
        directory_path = "./data/tests"
        
        #when
        test2 = has_directory(directory_path)

        #result
        assert len(records) == 1
        assert records[0].message == f"It wasn't found directory {directory_path}"

class Test_get_filepaths:
    """
        Description
        -----------
            This class contains tests cases to check get_filepaths function
            from extractor.py.
    """
    
    def mock_get_files_fn(directory_path: str, file_extension: str):
        return [("dir1", [], ["file1.csv", "file2.csv"]),
            ("dir2", [], ["file3.txt", "file4.txt"])]

    def test_get_filepaths(self):
        """
            Description
            -----------
                When is given a directory path that exist 
                and has csv files
            
            Expected Result
            ---------------
                returns array with paths of files
        """

        #setup
        get_filepaths = extractor.make_get_filepaths(self.mock_get_files_fn)
        
        #when
        test1 = get_filepaths("./dir1", ".csv")

        #result
        assert len(test1) == 2
    
    def test_get_filepaths_empty(self):
        """
            Description
            -----------
                When is given a directory path that exist 
                and doesn't have csv files
            
            Expected Result
            ---------------
                returns array with paths of files
        """

        #setup
        get_filepaths = extractor.make_get_filepaths(self.mock_get_files_fn)

        
        #when
        test2 = get_filepaths("./dir2", ".c")

        #result
        assert len(test2) == 0

class Test_get_metadata_from_filepath:
    def test_observed_folder_path(self):
        """
            Description
            -----------
                When is given a directory path that has
                observed as parent folder and csv file
                with desired name
            
            Expected Result
            ---------------
                returns dictionary with right data
        """

        #setup
        filepath = ".data/observed/Abadia-BA_-11.56_-37.52.csv"
        expected_result = {
            "type": "observed",
            "city": "Abadia",
            "state": "BA",
            "coordinates": ['-11.56', '-37.52'],
            "observed": {}
        }
        
        #result
        assert extractor.get_metadata_from_filepath(filepath) == expected_result
    
    def test_forecast_folder_path(self):
        """
            Description
            -----------
                When is given a directory path that has
                forecast as parent folder and csv file
                with desired name
            
            Expected Result
            ---------------
                returns dictionary with right data
        """

        #setup
        filepath = ".data/forecast/Kano-KN_-9.09_7.39.json"
        expected_result = {
            "type": "forecast",
            "city": "Kano",
            "state": "KN",
            "coordinates": ['-9.09', '7.39'],
            "forecast": {}
        }
        #result
        assert extractor.get_metadata_from_filepath(filepath) == expected_result

    def test_invalid_file_path(self):
        """
            Description
            -----------
                When is given a directory path that has
                no forecast or observed as parent folder 
                and csv file with not desired name
            
            Expected Result
            ---------------
                returns dictionary with values
                empty
        """
        # Test with an invalid file path

        #setup
        filepath = ".data/kano/test.txt"
        expected_result = {
            "type": "",
            "city": "",
            "state": "",
            "coordinates": ["", ""],
            '': {}
        }

        #result
        assert extractor.get_metadata_from_filepath(filepath) == expected_result

