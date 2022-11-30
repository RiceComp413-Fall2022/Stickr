import pytest
from src.sticker_generation import engineer_prompt

prepend_string = "Sticker illustration of "
append_string = ""
append_string1 = ", circle cutout"
append_string2 = ", square cutout"
query_str = "cats in space"

default_cutout = 'default'

def test_parse_empty():
    result = engineer_prompt("", default_cutout)
    if result != "":
        pytest.fail(f"Yielded: '{result}'; Expected empty string")

def test_parse_tab():
    result = engineer_prompt("    ", default_cutout)
    if result != "":
        pytest.fail(f"Yielded: '{result}''; Expected empty string.")

def test_parse_space():
    result = engineer_prompt(" ", default_cutout)
    if result != "":
        pytest.fail(f"Yielded: '{result}''; Expected: empty string.")

def test_parse_no_prepend_already():
    result = engineer_prompt(query_str, default_cutout)
    if result != prepend_string+query_str:
        pytest.fail(f"Yielded: '{result}''; Expected: '{prepend_string}{query_str}'.")

def test_parse_has_prepend_already():
    result = engineer_prompt(f"{prepend_string}{query_str}", default_cutout)
    print(result)
    if result != prepend_string+query_str:
        pytest.fail(f"Yielded: '{result}''; Expected: '{prepend_string}{query_str}' .")

def test_parse_has_prepend_with_surrounding_space():
    result = engineer_prompt(f" {prepend_string}{query_str}     ", default_cutout)
    if result != prepend_string+query_str:
        pytest.fail(f"Yielded: '{result}''; Expected: '{prepend_string}{query_str}'.")
