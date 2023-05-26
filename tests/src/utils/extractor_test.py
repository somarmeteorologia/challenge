import os
from unittest.mock import MagicMock, patch
import pytest
import sys

sys.path.append('./src/utils')
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
        test1 = has_directory("./data", "observed")

        #result
        assert test1 is True

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
        test2 = has_directory("./data", "tests")

        # result
        assert test2 is False