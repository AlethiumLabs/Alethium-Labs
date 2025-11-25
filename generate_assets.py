import os
from PIL import Image, ImageDraw

# Ensure directories exist
os.makedirs('assets/icons', exist_ok=True)
os.makedirs('assets/logo', exist_ok=True)

def create_logo_image(size):
    # Create a transparent image
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Colors
    mint = '#36E4A8'
    purple = '#7B5CFF'
    
    # Calculate dimensions relative to size
    center = size / 2
    outer_radius = size * 0.4
    inner_radius = size * 0.2
    
    # Draw Hexagon (simplified as polygon for PIL)
    import math
    def get_hex_points(cx, cy, r):
        points = []
        for i in range(6):
            angle_deg = 60 * i - 30
            angle_rad = math.radians(angle_deg)
            x = cx + r * math.cos(angle_rad)
            y = cy + r * math.sin(angle_rad)
            points.append((x, y))
        return points

    # Outer Hexagon Stroke
    outer_points = get_hex_points(center, center, outer_radius)
    draw.polygon(outer_points, outline=purple, width=int(size * 0.06))
    
    # Inner Hexagon Fill
    inner_points = get_hex_points(center, center, inner_radius)
    draw.polygon(inner_points, fill=(54, 228, 168, 50), outline=mint, width=int(size * 0.03)) # Mint with low opacity fill
    
    # Center Dot
    dot_radius = size * 0.06
    draw.ellipse([center - dot_radius, center - dot_radius, center + dot_radius, center + dot_radius], fill=mint)
    
    return img

# Generate Favicons
favicon_sizes = [16, 32, 64, 256, 512]
for size in favicon_sizes:
    img = create_logo_image(size)
    img.save(f'assets/icons/favicon-{size}.png')
    print(f'Generated favicon-{size}.png')

# Generate Logo PNGs
logo_sizes = [512, 1024] # 2048 might be too big for memory in some envs, keeping it safe with 1024 max for now unless strictly needed
for size in logo_sizes:
    img = create_logo_image(size)
    img.save(f'assets/logo/logo-{size}.png')
    print(f'Generated logo-{size}.png')

print("All assets generated.")
