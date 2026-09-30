import os
from PIL import Image
import numpy as np

def process_logo():
    src_path = "public/logo.png"
    if not os.path.exists(src_path):
        print(f"Error: {src_path} not found")
        return

    img = Image.open(src_path).convert("RGBA")
    arr = np.array(img, dtype=np.uint8)

    # Dimensions
    h, w, c = arr.shape
    print(f"Loaded image {w}x{h}")

    # Detect white/near-white background
    # Smooth thresholding for antialiasing
    r, g, b, a = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2], arr[:, :, 3]

    # Calculate brightness and saturation
    max_c = np.maximum(np.maximum(r, g), b)
    min_c = np.minimum(np.minimum(r, g), b)
    diff = max_c - min_c

    # Background is high brightness and low saturation (pure white/off-white)
    is_white_bg = (min_c > 235) & (diff < 15)

    # 1. Version: Transparent for light backgrounds (keep black and gold, make white transparent)
    arr_transparent = arr.copy()
    # Apply alpha mask
    # For antialiasing near edges:
    whiteness = np.clip((min_c.astype(float) - 220) / 35.0, 0.0, 1.0)
    arr_transparent[:, :, 3] = np.clip((1.0 - whiteness * (diff < 20)) * 255, 0, 255).astype(np.uint8)

    # Crop to bounding box of content
    mask = arr_transparent[:, :, 3] > 10
    coords = np.argwhere(mask)
    y0, x0 = coords.min(axis=0)
    y1, x1 = coords.max(axis=0) + 1

    # Add small padding
    pad = 20
    y0 = max(0, y0 - pad)
    x0 = max(0, x0 - pad)
    y1 = min(h, y1 + pad)
    x1 = min(w, x1 + pad)

    cropped_transparent = Image.fromarray(arr_transparent[y0:y1, x0:x1])
    cropped_transparent.save("public/logo-transparent.png")
    print(f"Saved public/logo-transparent.png ({cropped_transparent.size[0]}x{cropped_transparent.size[1]})")

    # 2. Dark Mode Version:
    # On dark backgrounds (#0b0f17), black letters ("1", "QUIZ", etc.) need to be crisp white/silver,
    # while golden/amber elements remain vibrant golden amber!
    arr_dark = arr.copy()
    
    # Identify black/dark elements: min_c < 120 and diff < 50 (neutral dark/black)
    is_dark = (r < 110) & (g < 110) & (b < 110)
    
    # Identify gold elements: strong yellow/amber hue
    # (r > 160, g > 110, b < 100) or high red/green with low blue
    is_gold = (r > 150) & (g > 90) & (b < 120) & (diff > 50)

    # Invert black/dark text to bright white/platinum #F8FAFC
    arr_dark_content = arr_dark.copy()
    
    # Where it is dark, make it clean bright white/silver (#FFFFFF)
    # preserve shading if any
    for y in range(h):
        for x in range(w):
            if is_white_bg[y, x]:
                arr_dark_content[y, x, 3] = 0 # transparent
            elif is_dark[y, x] and not is_gold[y, x]:
                # Invert darkness to lightness
                lum = 0.299 * r[y, x] + 0.587 * g[y, x] + 0.114 * b[y, x]
                # Map 0..100 to 255..210
                new_v = int(255 - lum * 0.4)
                arr_dark_content[y, x, 0] = new_v
                arr_dark_content[y, x, 1] = new_v
                arr_dark_content[y, x, 2] = new_v
                arr_dark_content[y, x, 3] = 255

    cropped_dark = Image.fromarray(arr_dark_content[y0:y1, x0:x1])
    cropped_dark.save("public/logo-dark.png")
    print(f"Saved public/logo-dark.png ({cropped_dark.size[0]}x{cropped_dark.size[1]})")

    # 3. Also create a high-contrast pill badge with the original logo:
    # A sleek badge with dark glass/amber border containing the original logo cleanly
    print("Done processing logos!")

if __name__ == "__main__":
    process_logo()
