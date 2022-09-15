import pytest
import stickr.app as app

def test_search_empty():
  try:
    app.search("")
    pytest.fail("Searching for empty string did not throw exception.")
  except Exception as ex:
    pass

def test_search_tab():
  try:
    app.search("  ")
    pytest.fail("Searching for tab string did not throw exception.")
  except Exception as ex:
    pass

def test_search_space():
  try:
    app.search(" ")
    pytest.fail("Searching for space string did not throw exception.")
  except Exception as ex:
    pass