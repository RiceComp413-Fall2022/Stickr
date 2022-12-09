from flask_wtf import FlaskForm
from wtforms import (StringField, TextAreaField, IntegerField, BooleanField,
                     RadioField, SubmitField, SelectField)
from wtforms.validators import InputRequired, Length
from flask import Flask

class SearchForm(FlaskForm):

  query = StringField('Generate a Sticker', validators=[InputRequired()])
  cutout = RadioField('Cutout', choices=[('default','Free Shape '),('circle','Circle'), ('square','Square')], default='default')
  # model = RadioField('Model', choices=[('default', 'Stable Diffusion'), ('DALL-E', 'DALL-E')], default='default')
  style = SelectField('Style', choices=[('DALL-E', 'DALL-E'), ('Stable Diffusion', 'Stable Diffusion'), ('Vivid', 'Vivid'), ('Mono', 'Monochrome'), ('Abstract', 'Abstract')])
  submit = SubmitField('search')