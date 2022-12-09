from flask_wtf import FlaskForm
from wtforms import (StringField, TextAreaField, IntegerField, BooleanField,
                     RadioField, SubmitField)
from wtforms.validators import InputRequired, Length

class SearchForm(FlaskForm):
  query = StringField('Generate a Sticker', validators=[InputRequired()])
  cutout = RadioField('Cutout', choices=[('default','Free Shape '),('circle','Circle'), ('square','Square')], default='default')
  model = RadioField('Model', choices=[('default', 'Stable Diffusion'), ('DALL-E', 'DALL-E')], default='default')
  submit = SubmitField('search')