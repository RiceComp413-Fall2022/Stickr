import pytest
from src.sticker_generation import engineer_prompt

prepend_string = "sticker illustration of "
append_string = ""
append_string1 = ", circle cutout"
append_string2 = ", square cutout"
query_str = "cats in space"

def test_parse_empty():
    result = engineer_prompt("")
    if result != "":
        pytest.fail(f"Yielded: '{result}''; Expected: ''.")

def test_parse_tab():
    result = engineer_prompt("    ")
    if result != prepend_string:
        pytest.fail(f"Yielded: '{result}''; Expected: '{prepend_string}'.")

def test_parse_space():
    result = engineer_prompt(" ")
    if result != prepend_string:
        pytest.fail(f"Yielded: '{result}''; Expected: '{prepend_string}'.")

def test_parse_no_prepend_already():
    result = engineer_prompt(query_str)
    if result != prepend_string+query_str:
        pytest.fail(f"Yielded: '{result}''; Expected: '{prepend_string}'.")

def test_parse_has_prepend_already():
    result = engineer_prompt(f"{prepend_string}{query_str}")
    print(result)
    if result != prepend_string+query_str:
        pytest.fail(f"Yielded: '{result}''; Expected: '{prepend_string}' .")

def test_parse_has_prepend_with_surrounding_space():
    result = engineer_prompt(f" {prepend_string}{query_str}     ")
    if result != prepend_string+query_str:
        pytest.fail(f"Yielded: '{result}''; Expected: '{prepend_string}'.")
