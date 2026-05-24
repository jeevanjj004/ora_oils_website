import os
from PIL import Image, ImageEnhance

os.makedirs('public/images/hero-section', exist_ok=True)

# Load the base image
try:
    img = Image.open('public/images/hero.png')
except FileNotFoundError:
    print("Base image not found. Creating a solid color base.")
    img = Image.new('RGB', (1024, 1024), color=(250, 250, 245))

w, h = img.size
num_frames = 60

# We want to simulate a slow zoom in
# Start from 100% scale and end at 120% scale over 60 frames

for i in range(num_frames):
    progress = i / max(1, num_frames - 1)
    
    # Scale from 1.0 to 1.2
    scale = 1.0 + (progress * 0.2)
    
    new_w = int(w / scale)
    new_h = int(h / scale)
    
    # Crop from center
    left = (w - new_w) / 2
    top = (h - new_h) / 2
    right = (w + new_w) / 2
    bottom = (h + new_h) / 2
    
    cropped_img = img.crop((left, top, right, bottom))
    
    # Resize back to original size for smooth animation
    resized_img = cropped_img.resize((w, h), Image.Resampling.LANCZOS)
    
    # Optionally darken the later frames slightly for a cinematic transition
    enhancer = ImageEnhance.Brightness(resized_img)
    brightness = 1.0 - (progress * 0.4) # Darken to 60% brightness
    final_img = enhancer.enhance(brightness)
    
    # Save frame
    frame_name = f'public/images/hero-section/frame-{i:03d}.jpg'
    final_img.save(frame_name, quality=85)
    print(f"Saved {frame_name}")

print("Done generating sequence.")
