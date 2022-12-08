import requests
import replicate
import openai

def generate_dalle_sticker(query):
  response = openai.Image.create(
    prompt=query,
    n=4,
    size="512x512"
  )
  # image_url = response['data'][0]['url']
  image_urls = [response['data'][i]['url'] for i in range(4)]
  return image_urls


def generate_dalle_variations(image):
  response = openai.Image.create_variation(
    image=image,
    n=1,
    size="512x512"
  )
  image_url = response['data'][0]['url']
  return image_url

def generate_deepai_sticker(query):
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
  image_urls = model.predict(prompt=query, num_outputs=4, width = 512, height = 512)
  return image_urls
  
def generate_dummy_sticker(query):
  image_urls = [
  "https://oaidalleapiprodscus.blob.core.windows.net/private/org-pAcoYvi80hCOVXyPQiQHWtPS/user-icheNIsCw0JW82RtAzEbiTr4/img-R4st2PL7utCiK5OtgICPYx1X.png?st=2022-12-08T11%3A37%3A51Z&se=2022-12-08T13%3A37%3A51Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2022-12-08T08%3A46%3A45Z&ske=2022-12-09T08%3A46%3A45Z&sks=b&skv=2021-08-06&sig=fjC8arKm/vUSo4KLyB2cS5fwUyMXOvQnRaPFHIqNUCE%3D",
  "https://oaidalleapiprodscus.blob.core.windows.net/private/org-pAcoYvi80hCOVXyPQiQHWtPS/user-icheNIsCw0JW82RtAzEbiTr4/img-wDfNsAecyvgGKQHrFCfhkXVt.png?st=2022-12-08T11%3A34%3A33Z&se=2022-12-08T13%3A34%3A33Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2022-12-08T09%3A31%3A38Z&ske=2022-12-09T09%3A31%3A38Z&sks=b&skv=2021-08-06&sig=xIN4BmOhxWiloqXnAhxPkpogD9iYFzIF4sqKxZg9qAQ%3D",
  "https://replicate.delivery/pbxt/SzneDGsKAvRuOSKKLLvfO9uJZjD7c9PPPgBZ1RTCAhGEWK7PA/out-1.png",
  "https://replicate.delivery/pbxt/L57IAErahd40KllFsp9bsMrI2TDG5xeQnDOrt9IoMDQCLl9HA/out-3.png"
  ]
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
