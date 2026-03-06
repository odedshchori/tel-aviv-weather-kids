from PIL import Image
import os

assets_dir = r"C:\projects\tel-aviv-weather-kids\src\assets"

animals = {
    "elephant": "פיל.png",
    "giraffe": "גירפה.png",
    "meerkat": "סוריקטה.png",
    "flamingo": "פלמינגו.png"
}

# Order: Sunny, Partly Cloudy, Cloudy, Rainy
weather_suffixes = ["sunny", "partly-cloudy", "cloudy", "rainy"]

def crop_animal_set(animal_name, filename):
    img_path = os.path.join(assets_dir, filename)
    if not os.path.exists(img_path):
        print(f"File {img_path} not found.")
        return

    with Image.open(img_path) as img:
        width, height = img.size
        # The images are sets of 4, laid out horizontally. 
        # Order: Sunny, Partly Cloudy, Cloudy, Rainy
        char_width = width // 4
        
        for i, suffix in enumerate(weather_suffixes):
            # Define crop box (left, upper, right, lower)
            left = i * char_width
            right = (i + 1) * char_width
            
            # Crop the character
            char_img = img.crop((left, 0, right, height))
            
            # Save the cropped image
            output_name = f"{animal_name}_{suffix}.png"
            output_path = os.path.join(assets_dir, output_name)
            char_img.save(output_path)
            print(f"Saved {output_path}")

for animal, filename in animals.items():
    crop_animal_set(animal, filename)
