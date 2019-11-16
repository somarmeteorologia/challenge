import pytest
from app import app
from repository.repository import Repository


app.testing = True
client = app.test_client()

repo = Repository()


def test_dirlist_listpoints():
    repo.url = "data/forecast"
    assert len(repo.list_points()) == len(repo.dir_list())
