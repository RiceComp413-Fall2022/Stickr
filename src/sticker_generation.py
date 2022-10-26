import requests
import replicate

def generate_dalle_sticker(query):
  r = requests.post(
    'https://api.deepai.org/api/text2img',
    data={
      'text': prepend_sticker_design_of(query),
    },
    headers={'api-key': '8bc69e15-14aa-49ce-9b62-7a28f2efa916'}
  )
  return r.json()['output_url']

def generate_stable_diffusion_sticker(query):
  model = replicate.models.get("stability-ai/stable-diffusion")
  correct_query = prepend_sticker_design_of(query)
  image_urls = model.predict(prompt=correct_query, num_outputs=4)
  return image_urls

def generate_dummy_sticker(query):
  image_urls = [
  "https://upload.wikimedia.org/wikipedia/commons/c/cc/Icon_Pinguin_1_512x512.png", 
  "https://www.freepnglogos.com/uploads/512x512-logo/512x512-transparent-instagram-logo-icon-5.png", 
  "https://www.freepnglogos.com/uploads/512x512-logo-png/512x512-logo-iron-man-logo-png-iron-man-wallpaper-9.png",
  "https://www.freepnglogos.com/uploads/512x512-logo/512x512-transparent-logo-twitter-birds-logos-23.png"
  ]
  return image_urls

def prepend_sticker_design_of(query):
  stripped_query = query.strip()
  if "sticker" not in stripped_query.lower():
    return ("sticker design of "+stripped_query)
  else: 
    return stripped_query
