from flask_wtf import FlaskForm
from wtforms import (StringField, TextAreaField, IntegerField, BooleanField,
                     RadioField, SubmitField)
from wtforms.validators import InputRequired, Length

class SearchForm(FlaskForm):
  query = StringField('Generate a Sticker', validators=[InputRequired()])
  submit = SubmitField('search')