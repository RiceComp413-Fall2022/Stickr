from flask import Flask, render_template, url_for, flash, redirect, request#, session, Response, send_file
from src.forms import SearchForm
from src.sticker_generation import generate_stable_diffusion_sticker, engineer_prompt, generate_dummy_sticker, generate_dalle_sticker, generate_deepai_sticker, generate_dalle_variations
import requests

application = Flask(__name__)
application.config['SECRET_KEY'] = '7a3140fad78d44bd'

image_urls = []
@application.route("/", methods=['GET', 'POST'])
def home():
    form = SearchForm()
    if form.validate_on_submit():
      query = request.form['query']
      cutout = request.form['cutout']
      final_query = engineer_prompt(query, cutout)
      model = request.form['model']
      return redirect(url_for('search', query=final_query, model=model))
    return render_template('home.html', form=form)

@application.route("/search/<query>/<model>", methods=['GET', 'POST'])
def search(query, model):
    global image_urls
    if request.method == 'GET':
        if not query.strip():
            raise Exception("Cannot search based on an empty query")
        
        if model == 'default':
          image_urls = generate_stable_diffusion_sticker(query)
        else:
          image_urls = generate_dalle_sticker(query)
        return render_template('search.html', query=query, image_urls=image_urls, model=model)

    elif request.method == 'POST':
        # Get the image from form
        url = request.form.get('url')
        print(url)
        files = request.files
        image = files.get('image').read()

        image_url = generate_dalle_variations(image)
        # image_url = url
        print(image_url)
        return image_url
        # return render_template('search.html', query=query, image_urls=image_urls)

if __name__ == '__main__':
  application.run(debug=True)
