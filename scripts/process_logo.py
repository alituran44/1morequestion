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

    h, w, c = arr.shape
    print(f"Input size: {w}x{h}")
    print(f"Corners RGB: [0,0]={arr[0,0,:3]}, [0,-1]={arr[0,-1,:3]}, [-1,0]={arr[-1,0,:3]}")

    r, g, b, a = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2], arr[:, :, 3]

    max_c = np.maximum(np.maximum(r, g), b)
    min_c = np.minimum(np.minimum(r, g), b)
    diff = max_c - min_c

    # Non-white pixels (actual content):
    # Anything that is either dark (black text) or colored (yellow/gold)
    # White background has high brightness (min_c > 220) and low saturation (diff < 30)
    is_content = (min_c < 220) | (diff >= 30)

    # Find tight bounding box of content
    coords = np.argwhere(is_content)
    if len(coords) == 0:
        print("Error: No content detected!")
        return

    y0, x0 = coords.min(axis=0)
    y1, x1 = coords.max(axis=0) + 1
    print(f"Tight bounding box: x:[{x0}..{x1}], y:[{y0}..{y1}], width: {x1-x0}, height: {y1-y0}")

    # Add small breathing room
    pad_x = 24
    pad_y = 16
    y0_pad = max(0, y0 - pad_y)
    x0_pad = max(0, x0 - pad_x)
    y1_pad = min(h, y1 + pad_y)
    x1_pad = min(w, x1 + pad_x)

    # Crop array to bounding box
    arr_cropped = arr[y0_pad:y1_pad, x0_pad:x1_pad].copy()
    ch, cw, _ = arr_cropped.shape
    cr, cg, cb = arr_cropped[:, :, 0], arr_cropped[:, :, 1], arr_cropped[:, :, 2]
    c_max = np.maximum(np.maximum(cr, cg), cb)
    c_min = np.minimum(np.minimum(cr, cg), cb)
    c_diff = c_max - c_min

    # Detect white background in cropped region
    is_bg = (c_min > 220) & (c_diff < 25)

    # 1. Transparent for light background
    arr_trans = arr_cropped.copy()
    # Smooth alpha near edges
    whiteness = np.clip((c_min.astype(float) - 210) / 40.0, 0.0, 1.0)
    alpha = np.where(c_diff < 25, (1.0 - whiteness) * 255.0, 255.0)
    arr_trans[:, :, 3] = np.clip(alpha, 0, 255).astype(np.uint8)

    img_trans = Image.fromarray(arr_trans)
    img_trans.save("public/logo-transparent.png")
    print(f"Saved public/logo-transparent.png: {cw}x{ch}")

    # 2. Dark mode version:
    # On dark backgrounds (#080c14), black letters ("1", "m", "r", "e", "q", "u", "i", "z")
    # need to be crisp white/platinum (#FFFFFF), while golden/amber elements
    # (the 'o', '1' bevel, 'q' tail ribbon) stay brilliant amber/gold!
    arr_dark = arr_cropped.copy()

    # Detect golden pixels: high red & green, low blue
    is_gold = (cr > 150) & (cg > 90) & (cb < 130) & (c_diff > 40)

    # Detect black/dark text: neutral & low brightness
    is_dark_text = (cr < 120) & (cg < 120) & (cb < 120) & (~is_gold)

    # Convert to dark mode:
    # - Background: transparent
    # - Dark text: clean white (#FFFFFF)
    # - Gold elements: untouched vibrant gold
    dark_output = np.zeros((ch, cw, 4), dtype=np.uint8)

    for y in range(ch):
        for x in range(cw):
            if is_bg[y, x]:
                dark_output[y, x] = [0, 0, 0, 0] # transparent
            elif is_gold[y, x]:
                # Keep golden color and full opacity
                dark_output[y, x] = [cr[y, x], cg[y, x], cb[y, x], 255]
            elif is_dark_text[y, x]:
                # Invert dark tone to crisp white/platinum with anti-aliasing
                lum = float(cr[y, x]) * 0.299 + float(cg[y, x]) * 0.587 + float(cb[y, x]) * 0.114
                white_val = int(255 - lum * 0.3)
                dark_output[y, x] = [white_val, white_val, white_val, 255]
            else:
                # Edge antialiasing
                if c_diff[y, x] > 20: # has color
                    dark_output[y, x] = [cr[y, x], cg[y, x], cb[y, x], 255]
                else:
                    # Near white or gray
                    dark_output[y, x] = [255, 255, 255, int(arr_trans[y, x, 3])]

    img_dark = Image.fromarray(dark_output)
    img_dark.save("public/logo-dark.png")
    print(f"Saved public/logo-dark.png: {cw}x{ch}")
    print("Logo processing completed successfully!")

if __name__ == "__main__":
    process_logo()
