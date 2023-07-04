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

class TestHasDirectory:
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
