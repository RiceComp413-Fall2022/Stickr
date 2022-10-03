from flask import Flask, render_template, url_for, flash, redirect, request, session
from src.forms import SearchForm
from src.sticker_generation import generate_stable_diffusion_sticker

application = Flask(__name__)
application.config['SECRET_KEY'] = '7a3140fad78d44bd'

@application.route("/", methods=['GET', 'POST'])
def home():
    form = SearchForm()
    if form.validate_on_submit():
      return redirect(url_for('search', query=request.form['query']))
    return render_template('home.html', form=form)

@application.route("/search/<query>")
def search(query):
  if not query.strip():
    raise Exception("Cannot search based on an empty query")
  image_url = generate_stable_diffusion_sticker(query)

  return render_template('search.html', query=query, image_url=image_url)

  
if __name__ == '__main__':
  application.run(debug=True)