import pytest
from sticker_generation import prepend_sticker_design_of

prepend_string = "sticker design of "
query_str = "cats in space"

def test_parse_empty():
    result = prepend_sticker_design_of("")
    if result != prepend_string:
        pytest.fail(f"Yielded: '{result}''; Expected: '{prepend_string}'.")

def test_parse_tab():
    result = prepend_sticker_design_of("    ")
    if result != prepend_string:
        pytest.fail(f"Yielded: '{result}''; Expected: '{prepend_string}'.")

def test_parse_space():
    result = prepend_sticker_design_of(" ")
    if result != prepend_string:
        pytest.fail(f"Yielded: '{result}''; Expected: '{prepend_string}'.")

def test_parse_no_prepend_already():
    result = prepend_sticker_design_of(query_str)
    if result != prepend_string+query_str:
        pytest.fail(f"Yielded: '{result}''; Expected: '{prepend_string}'.")

def test_parse_has_prepend_already():
    result = prepend_sticker_design_of(f"{prepend_string}{query_str}")
    print(result)
    if result != prepend_string+query_str:
        pytest.fail(f"Yielded: '{result}''; Expected: '{prepend_string}'.")

def test_parse_has_prepend_with_surrounding_space():
    result = prepend_sticker_design_of(f" {prepend_string}{query_str}     ")
    if result != prepend_string+query_str:
        pytest.fail(f"Yielded: '{result}''; Expected: '{prepend_string}'.")
