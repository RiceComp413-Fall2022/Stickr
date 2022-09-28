import pytest
import stickr.application as application

def test_search_empty():
  try:
    application.search("")
    pytest.fail("Searching for empty string did not throw exception.")
  except Exception as ex:
    pass

def test_search_tab():
  try:
    application.search("  ")
    pytest.fail("Searching for tab string did not throw exception.")
  except Exception as ex:
    pass

def test_search_space():
  try:
    application.search(" ")
    pytest.fail("Searching for space string did not throw exception.")
  except Exception as ex:
    pass