from PIL import Image
from dotenv import load_dotenv
import os
import pytesseract
from groq import Groq
from duckduckgo_search import DDGS
import time

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

def extract_menu(file):
    menu = pytesseract.image_to_string(Image.open(file))
    return menu

def get_menu_items(menu):
    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "system",
                "content": "You are a helpful assistant that takes an OCR input of a restaurant "
                "menu which maybe not be structed and replies only with the food names, each item in a separate line."
                "Remove any Non Halal food items. "
                "These food items will be used for searching up images, so optimize for that"
            },
            {
                "role": "user",
                "content": menu
            }
        ],
        model="llama-3.3-70b-versatile",
    )

    menu_items = chat_completion.choices[0].message.content
    menu_items = menu_items.splitlines()
    menu_items = [item.strip() for item in menu_items if item.strip()]

    return menu_items

def get_image_url(keyword):
    with DDGS(headers={"User-Agent": "Mozilla/5.0"}) as ddgs:
        results = ddgs.images(keywords=keyword, max_results=1)
        for result in results:
            return result["image"] 


def get_images(file):
    menu = extract_menu(file)
    menu_items = get_menu_items(menu)

    images = []
    for item in menu_items:
        image_url = get_image_url(item)
        images.append((item, image_url))
        print("done with", item)
        time.sleep(1)
    
    result = [{"name": name, "url": url} for name, url in images]

    return result