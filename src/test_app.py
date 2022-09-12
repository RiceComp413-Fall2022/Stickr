import pytest
import app

def test_search_empty():
  try:
    app.search("")
    pytest.fail("Empty search did not throw exception")
  except Exception as ex:
    pass