import requests

def generate_sticker(query):
  r = requests.post(
    'https://api.deepai.org/api/text2img',
    data={
      'text': query,
    },
    headers={'api-key': '8bc69e15-14aa-49ce-9b62-7a28f2efa916'}
  )
  return r.json()['output_url']