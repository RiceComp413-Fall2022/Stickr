import requests

def generate_sticker(query):
  r = requests.post(
    'https://api.deepai.org/api/text2img',
    data={
      'text': query,
    },
    headers={'api-key': 'quickstart-QUdJIGlzIGNvbWluZy4uLi4K'}
  )
  return r.json()['output_url']