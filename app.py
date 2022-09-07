from flask import Flask, render_template, url_for, flash, redirect
from forms import SearchForm

app = Flask(__name__)

app.config['SECRET_KEY'] = '7a3140fad78d44bd'

@app.route("/", methods=['GET', 'POST'])
def home():
    form = SearchForm()
    if form.validate_on_submit():
      flash(f'Search query is {form.query}', 'success')
      return redirect(url_for('search'))
    return render_template('home.html', form=form)

@app.route("/search")
def search():
  return render_template('search.html')

  
if __name__ == '__main__':
  app.run(debug=True)