from flask import Flask, render_template, url_for, flash, redirect, request, session, Response,send_file
from src.forms import SearchForm
from src.sticker_generation import generate_stable_diffusion_sticker
import requests

application = Flask(__name__)
application.config['SECRET_KEY'] = '7a3140fad78d44bd'

# image_urls = ["https://replicate.com/api/models/stability-ai/stable-diffusion/files/19e3a073-de22-49fd-97e5-cd3942b41c9b/out-0.png"]
image_urls = []
@application.route("/", methods=['GET', 'POST'])
def home():
    form = SearchForm()
    if form.validate_on_submit():
      return redirect(url_for('search', query=request.form['query']))
    return render_template('home.html', form=form)

@application.route("/search/<query>")
def search(query):
  global image_urls
  if not query.strip():
    raise Exception("Cannot search based on an empty query")
  image_urls = generate_stable_diffusion_sticker(query)

  return render_template('search.html', query=query, image_urls=image_urls)

@application.route("/downloadImg<int:img_num>/<query>")
def downloadImg(img_num, query):
  underscored_query = query.replace(" ","_")
  # Check to be sure that there is an image there, behavior if not unclear
  if len(image_urls) < img_num:
    return
    # raise Exception(f"Length of image_urls: {len(image_urls)} vs imgNum: {imgNum}")
  return Response(
    requests.get(url=image_urls[img_num-1]),
    mimetype="image/png",
    headers={"Content-disposition":
      f"attachment; filename=download_{underscored_query}_{img_num}.png"})

if __name__ == '__main__':
  application.run(debug=True)