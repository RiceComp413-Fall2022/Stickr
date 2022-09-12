# Stickr.ai

## Team Members
Akash Karanam (ak111),
Ayush Sachdeva (as216),
Benjamin Thomas (bwt2),
Nathan Powell (ndp3),
Rambod Azarbad (ra53)

## Pitch
Over the last few years image generation deep learning models have become more accurate and accessible. There is a unique opportunity to generate digital art on-demand to match any query a user inputs. We propose a website where a user can enter a prompt for a sticker design they would want, and then we display a page of image results generated by an AI system like DALL-E. Furthermore, we want to enable that user to interact with the image generation AI, which could include a more hands-on approach to prompt generation, and image editing tools. Furthermore, DALL-E is trained to return images, giving us the opportunity to apply our own AI model (trained through transfer learning) to convert the images DALL-E outputs to images that are suitable for stickers.


### Resources
Model Training:
https://arxiv.org/abs/2102.12092
https://www.reddit.com/r/StableDiffusion/comments/x41n87/how_to_get_images_that_dont_suck_a/

Blog on what differentiates an effective image prompt: https://www.creativebloq.com/news/how-to-use-dall-e

Style inspiration:
https://www.instagram.com/openaidalle/

## Running our code
After you have cloned our repo into your own local Stickr folder change directories into that folder. You can run the web application in debug mode by running
'''
python3 src/app.py
'''
Furthermore, the unit tests can be run by running
'''
pytest src/test_app.py
'''