import os
from PIL import Image

src_dir = '/home/thomas/Desktop/COCO/FRAMES/'
dest_dir = 'public/images/hero-loop/'

os.makedirs(dest_dir, exist_ok=True)

num_frames = 240
print(f"Starting frame processing from {src_dir} to {dest_dir}...")

for i in range(1, num_frames + 1):
    src_filename = f'ezgif-frame-{i:03d}.png'
    src_path = os.path.join(src_dir, src_filename)
    
    if not os.path.exists(src_path):
        print(f"Error: {src_path} does not exist. Skipping.")
        continue
        
    dest_filename = f'frame-{i:03d}.webp'
    dest_path = os.path.join(dest_dir, dest_filename)
    
    try:
        with Image.open(src_path) as img:
            # We compress to WebP at a premium visual quality (85)
            # WebP is natively supported in modern browsers and extremely efficient
            img.save(dest_path, 'WEBP', quality=85, method=4)
        if i % 20 == 0 or i == num_frames:
            print(f"Processed {i}/{num_frames} frames...")
    except Exception as e:
        print(f"Error processing frame {src_filename}: {e}")

print("Frame processing completed successfully!")
