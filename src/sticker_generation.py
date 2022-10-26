import requests
import replicate

def generate_dalle_sticker(query):
  r = requests.post(
    'https://api.deepai.org/api/text2img',
    data={
      'text': query,
    },
    headers={'api-key': '8bc69e15-14aa-49ce-9b62-7a28f2efa916'}
  )
  return r.json()['output_url']

def generate_stable_diffusion_sticker(query):
  model = replicate.models.get("stability-ai/stable-diffusion")
  image_urls = model.predict(prompt=query, num_outputs=4)
  return image_urls

def engineer_prompt(query, cutout):
  # Check for empty queries
  stripped_query = query.strip()
  if not stripped_query:
    return ""

  final_query = stripped_query

  # Prepend style guide
  if "sticker" not in stripped_query.lower():
    final_query = "Sticker illustration of " + final_query

  # Append cutout specification
  if cutout == "circle":
    final_query += ", circle cutout"
  elif cutout == "square":
    final_query += ", square cutout"

  return final_query

