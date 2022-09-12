from flask import Flask, render_template, url_for, flash, redirect, request, session
from forms import SearchForm
import sticker_generation

app = Flask(__name__)

app.config['SECRET_KEY'] = '7a3140fad78d44bd'

@app.route("/", methods=['GET', 'POST'])
def home():
    form = SearchForm()
    if form.validate_on_submit():
      return redirect(url_for('search', query=request.form['query']))
    return render_template('home.html', form=form)

@app.route("/search/<query>")
def search(query):
  if not query.strip():
    raise Exception("Cannot search based on an empty query")
  image_url = sticker_generation.generate_sticker(query)

  return render_template('search.html', query=query, image_url=image_url)

  
if __name__ == '__main__':
  app.run(debug=True)