import os
import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter

def create_theme_cover():
    W, H = 1600, 900
    base = Image.new('RGBA', (W, H), (11, 15, 23, 255))
    
    # 1. Subtle Background Gradient
    # From top #0D131F to bottom #070A0F
    top_color = (13, 19, 31)
    bottom_color = (7, 10, 15)
    for y in range(H):
        factor = y / float(H)
        r = int(top_color[0] + factor * (bottom_color[0] - top_color[0]))
        g = int(top_color[1] + factor * (bottom_color[1] - top_color[1]))
        b = int(top_color[2] + factor * (bottom_color[2] - top_color[2]))
        for x in range(W):
            base.putpixel((x, y), (r, g, b, 255))
            
    # Draw subtle tech grid dots
    draw = ImageDraw.Draw(base)
    for x in range(0, W, 32):
        for y in range(0, H, 32):
            draw.point((x, y), fill=(255, 255, 255, 18))
            
    # 2. Ambient Theme Radial Glows
    glow_layer = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow_layer)
    
    # Glow 1: Terracotta Sun behind Center Hero Phone
    cx1, cy1, r1 = 800, 420, 520
    for r in range(r1, 0, -14):
        alpha = int(45 * (1.0 - (r / r1)**1.4))
        glow_draw.ellipse([cx1 - r, cy1 - int(r*0.8), cx1 + r, cy1 + int(r*0.8)], fill=(226, 114, 91, alpha))
        
    # Glow 2: Tropical Turquoise behind Left Chart Phone
    cx2, cy2, r2 = 300, 560, 440
    for r in range(r2, 0, -12):
        alpha = int(40 * (1.0 - (r / r2)**1.4))
        glow_draw.ellipse([cx2 - r, cy2 - int(r*0.85), cx2 + r, cy2 + int(r*0.85)], fill=(64, 224, 208, alpha))

    # Glow 3: Golden Saffron / Warm Amber behind Right Phone
    cx3, cy3, r3 = 1300, 520, 440
    for r in range(r3, 0, -12):
        alpha = int(32 * (1.0 - (r / r3)**1.4))
        glow_draw.ellipse([cx3 - r, cy3 - int(r*0.85), cx3 + r, cy3 + int(r*0.85)], fill=(244, 196, 48, alpha))
        
    glow_layer = glow_layer.filter(ImageFilter.GaussianBlur(35))
    base = Image.alpha_composite(base, glow_layer)
    draw = ImageDraw.Draw(base)

    # Load Windows fonts
    font_bold_lg = ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf', 44)
    font_bold_md = ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf', 24)
    font_bold_sm = ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf', 16)
    font_bold_xs = ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf', 13)
    
    font_reg_md = ImageFont.truetype('C:/Windows/Fonts/segoeui.ttf', 18)
    font_reg_sm = ImageFont.truetype('C:/Windows/Fonts/segoeui.ttf', 15)
    font_reg_xs = ImageFont.truetype('C:/Windows/Fonts/segoeui.ttf', 12)

    # 3. Header & Branding Banner
    # Top Tag Pill
    tag_x, tag_y = 80, 42
    tag_text = "● ANDROID OS 15  •  JETPACK COMPOSE  •  CLEAN ARCHITECTURE  •  MATERIAL 3"
    tag_bbox = draw.textbbox((0, 0), tag_text, font=font_bold_xs)
    tw, th = tag_bbox[2] - tag_bbox[0], tag_bbox[3] - tag_bbox[1]
    
    # Pill background
    draw.rounded_rectangle([tag_x, tag_y, tag_x + tw + 28, tag_y + th + 14], radius=14, 
                           fill=(18, 28, 42, 220), outline=(64, 224, 208, 160), width=1)
    draw.text((tag_x + 14, tag_y + 7), tag_text, font=font_bold_xs, fill=(64, 224, 208, 255))
    
    # Main Title
    draw.text((80, 80), "FinPulse", font=font_bold_lg, fill=(255, 255, 255, 255))
    # Pulse accent dot in terracotta
    fin_w = draw.textbbox((0, 0), "FinPulse", font=font_bold_lg)[2]
    draw.ellipse([80 + fin_w + 4, 110, 80 + fin_w + 16, 122], fill=(226, 114, 91, 255))
    
    # Subtitle with branding colors
    draw.text((80, 136), "Native Personal Finance Engine  •  Dynamic Vico Telemetry  •  Attached Photo Proofs", 
              font=font_reg_md, fill=(160, 174, 192, 255))
    
    # Top Right Badges & Color Palette
    rx = W - 80
    palette_y = 52
    
    # Palette Swatches
    swatches = [
        ("Terracotta Sun", (226, 114, 91)),
        ("Tropical Turquoise", (64, 224, 208)),
        ("Golden Saffron", (244, 196, 48))
    ]
    sw_x = rx - 240
    for label, col in swatches:
        draw.ellipse([sw_x, palette_y, sw_x + 18, palette_y + 18], fill=col)
        sw_x += 28
    draw.text((sw_x + 8, palette_y + 1), "FinPulse Theme Palette", font=font_reg_xs, fill=(160, 174, 192, 220))
    
    # Top Right Feature Pills
    features = ["Room + SQLCipher", "Vico Engine", "CameraX OCR Ready"]
    fx = rx
    for feat in reversed(features):
        fb = draw.textbbox((0, 0), feat, font=font_bold_xs)
        fw = fb[2] - fb[0]
        fx -= (fw + 24)
        draw.rounded_rectangle([fx, 88, fx + fw + 16, 114], radius=6, 
                               fill=(20, 28, 40, 200), outline=(255, 255, 255, 40), width=1)
        draw.text((fx + 8, 93), feat, font=font_bold_xs, fill=(226, 232, 240, 255))
        fx -= 8

    # 4. Helper Function to build high-end Realistic Phone Frame
    def create_phone_frame(screen_path, width, height, is_hero=False):
        screen_raw = Image.open(screen_path).convert('RGBA')
        
        # Phone chassis padding
        pad_x = 10
        pad_top = 24
        pad_bot = 22
        
        frame_w = width + pad_x * 2
        frame_h = height + pad_top + pad_bot
        
        # Build chassis with rounded corners
        corner_r = 34 if is_hero else 30
        
        # Phone canvas
        phone = Image.new('RGBA', (frame_w, frame_h), (0, 0, 0, 0))
        pdraw = ImageDraw.Draw(phone)
        
        # Outer titanium bezel border
        chassis_fill = (18, 23, 33, 255) if not is_hero else (24, 30, 44, 255)
        chassis_outline = (56, 72, 98, 255) if not is_hero else (226, 114, 91, 230)
        
        pdraw.rounded_rectangle([0, 0, frame_w, frame_h], radius=corner_r, 
                                fill=chassis_fill, outline=chassis_outline, width=2)
                                
        # Inner screen bezel highlight
        pdraw.rounded_rectangle([2, 2, frame_w - 2, frame_h - 2], radius=corner_r - 2, 
                                fill=None, outline=(255, 255, 255, 25), width=1)

        # Prepare screen image
        screen_resized = screen_raw.resize((width, height), Image.Resampling.LANCZOS)
        
        # Screen rounded mask
        screen_r = 24 if is_hero else 20
        mask = Image.new('L', (width, height), 0)
        m舖 = ImageDraw.Draw(mask)
        m舖.rounded_rectangle([0, 0, width, height], radius=screen_r, fill=255)
        
        # Paste screen
        phone.paste(screen_resized, (pad_x, pad_top), mask)
        
        # Top punch-hole camera & speaker
        cam_x = frame_w // 2
        pdraw.ellipse([cam_x - 5, pad_top // 2 - 4, cam_x + 5, pad_top // 2 + 6], fill=(5, 8, 12, 255))
        pdraw.ellipse([cam_x - 2, pad_top // 2 - 1, cam_x + 2, pad_top // 2 + 3], fill=(15, 25, 40, 255))
        
        # Bottom gesture pill
        bar_w = 70 if is_hero else 60
        bar_x = (frame_w - bar_w) // 2
        bar_y = frame_h - (pad_bot // 2) - 2
        pdraw.rounded_rectangle([bar_x, bar_y, bar_x + bar_w, bar_y + 4], radius=2, fill=(255, 255, 255, 120))
        
        # Glass reflection shine (diagonal sheen across upper portion)
        sheen = Image.new('RGBA', (width, height), (0, 0, 0, 0))
        sdraw = ImageDraw.Draw(sheen)
        # Draw translucent polygon across corner
        sdraw.polygon([(0, 0), (width, 0), (width, height // 3), (0, height // 2)], fill=(255, 255, 255, 14))
        sheen_masked = Image.composite(sheen, Image.new('RGBA', (width, height), (0, 0, 0, 0)), mask)
        phone.paste(sheen_masked, (pad_x, pad_top), sheen_masked)
        
        return phone, frame_w, frame_h

    # 5. Helper function for realistic Multi-layer Colored Drop Shadows
    def paste_with_shadow(canvas, img, x, y, blur=30, shadow_color=(0, 0, 0, 180), offset_y=16):
        iw, ih = img.size
        # shadow canvas
        pad = blur * 2
        s_w = iw + pad * 2
        s_h = ih + pad * 2
        shadow = Image.new('RGBA', (s_w, s_h), (0, 0, 0, 0))
        sdraw = ImageDraw.Draw(shadow)
        
        # Draw rounded shadow shape matching image
        sdraw.rounded_rectangle([pad, pad, pad + iw, pad + ih], radius=32, fill=shadow_color)
        shadow = shadow.filter(ImageFilter.GaussianBlur(blur))
        
        # Paste shadow on canvas
        sx = x - pad
        sy = y - pad + offset_y
        canvas.alpha_composite(shadow, (sx, sy))
        
        # Paste image
        canvas.alpha_composite(img, (x, y))

    # 6. Render Phones (3-Device Depth Arrangement)
    
    # Phone Left: Weekly Vico Telemetry (2.PNG)
    p_left, pl_w, pl_h = create_phone_frame('d:/Techxodia/finpulse/2.PNG', 310, 634, is_hero=False)
    paste_with_shadow(base, p_left, 120, 186, blur=32, shadow_color=(0, 0, 0, 190), offset_y=20)
    
    # Phone Right: Monthly Ledger & Photo Receipts (3.PNG)
    p_right, pr_w, pr_h = create_phone_frame('d:/Techxodia/finpulse/3.PNG', 310, 634, is_hero=False)
    paste_with_shadow(base, p_right, 1170, 186, blur=32, shadow_color=(0, 0, 0, 190), offset_y=20)
    
    # Phone Center (HERO): Core Dashboard with ₱37,942.11 Balance Card (1.PNG)
    p_center, pc_w, pc_h = create_phone_frame('d:/Techxodia/finpulse/1.PNG', 345, 715, is_hero=True)
    
    # Add ambient dual-color bounce shadow for the hero phone
    # Bounce shadow in Terracotta + Turquoise
    hero_bounce = Image.new('RGBA', (pc_w + 120, pc_h + 120), (0, 0, 0, 0))
    hdraw = ImageDraw.Draw(hero_bounce)
    hdraw.rounded_rectangle([60, 60, 60 + pc_w, 60 + pc_h], radius=40, fill=(226, 114, 91, 75))
    hdraw.rounded_rectangle([60, 60 + pc_h // 2, 60 + pc_w, 60 + pc_h], radius=40, fill=(64, 224, 208, 65))
    hero_bounce = hero_bounce.filter(ImageFilter.GaussianBlur(40))
    base.alpha_composite(hero_bounce, (628 - 60, 142 - 60 + 10))
    
    # Main drop shadow
    paste_with_shadow(base, p_center, 628, 142, blur=38, shadow_color=(0, 0, 0, 220), offset_y=24)

    # 7. Floating Glassmorphism Cards & Annotations (Facebook Ads / Behance Showcase Style)
    draw = ImageDraw.Draw(base)

    def draw_glass_card(x, y, w, h, border_color=(255, 255, 255, 60), fill_color=(14, 20, 30, 225)):
        # Card shadow
        card_shadow = Image.new('RGBA', (w + 40, h + 40), (0, 0, 0, 0))
        csdraw = ImageDraw.Draw(card_shadow)
        csdraw.rounded_rectangle([20, 20, 20 + w, 20 + h], radius=14, fill=(0, 0, 0, 150))
        card_shadow = card_shadow.filter(ImageFilter.GaussianBlur(16))
        base.alpha_composite(card_shadow, (x - 20, y - 20 + 8))
        
        # Card body
        card_img = Image.new('RGBA', (w, h), (0, 0, 0, 0))
        cdraw = ImageDraw.Draw(card_img)
        cdraw.rounded_rectangle([0, 0, w, h], radius=12, fill=fill_color, outline=border_color, width=1)
        base.alpha_composite(card_img, (x, y))

    # Floating Card 1: Center Phone Top-Right -> "₱37,942.11 Available Cash"
    fc1_x, fc1_y, fc1_w, fc1_h = 760, 126, 360, 68
    draw_glass_card(fc1_x, fc1_y, fc1_w, fc1_h, border_color=(226, 114, 91, 200), fill_color=(18, 22, 32, 235))
    cdraw = ImageDraw.Draw(base)
    # Green pulse dot
    cdraw.ellipse([fc1_x + 16, fc1_y + 18, fc1_x + 26, fc1_y + 28], fill=(74, 222, 128, 255))
    cdraw.text((fc1_x + 36, fc1_y + 14), "LIVE LIQUIDITY COMPUTATION", font=font_bold_xs, fill=(226, 114, 91, 255))
    cdraw.text((fc1_x + 16, fc1_y + 34), "₱37,942.11 Available Cash", font=font_bold_md, fill=(255, 255, 255, 255))

    # Floating Card 2: Left Phone -> "Vico Charting Engine • 7-Day Velocity"
    fc2_x, fc2_y, fc2_w, fc2_h = 48, 480, 290, 64
    draw_glass_card(fc2_x, fc2_y, fc2_w, fc2_h, border_color=(64, 224, 208, 180), fill_color=(15, 23, 34, 235))
    cdraw.ellipse([fc2_x + 14, fc2_y + 16, fc2_x + 22, fc2_y + 24], fill=(64, 224, 208, 255))
    cdraw.text((fc2_x + 30, fc2_y + 12), "VICO ENGINE TELEMETRY", font=font_bold_xs, fill=(64, 224, 208, 255))
    cdraw.text((fc2_x + 14, fc2_y + 32), "7-Day Velocity & Category Feed", font=font_reg_sm, fill=(240, 246, 252, 255))

    # Floating Card 3: Center Phone Bottom-Left -> "SQLCipher Room DB + Biometrics"
    fc3_x, fc3_y, fc3_w, fc3_h = 490, 716, 320, 64
    draw_glass_card(fc3_x, fc3_y, fc3_w, fc3_h, border_color=(244, 196, 48, 180), fill_color=(18, 24, 34, 235))
    cdraw.ellipse([fc3_x + 14, fc3_y + 16, fc3_x + 22, fc3_y + 24], fill=(244, 196, 48, 255))
    cdraw.text((fc3_x + 30, fc3_y + 12), "LOCAL ZERO-KNOWLEDGE SECURITY", font=font_bold_xs, fill=(244, 196, 48, 255))
    cdraw.text((fc3_x + 14, fc3_y + 32), "Room (SQLCipher) + Biometric Lock", font=font_reg_sm, fill=(240, 246, 252, 255))

    # Floating Card 4: Right Phone -> "Receipt Photo Gallery & Audit"
    fc4_x, fc4_y, fc4_w, fc4_h = 1260, 480, 290, 64
    draw_glass_card(fc4_x, fc4_y, fc4_w, fc4_h, border_color=(226, 114, 91, 180), fill_color=(18, 22, 32, 235))
    cdraw.ellipse([fc4_x + 14, fc4_y + 16, fc4_x + 22, fc4_y + 24], fill=(226, 114, 91, 255))
    cdraw.text((fc4_x + 30, fc4_y + 12), "TRANSACTION PHOTO PROOFS", font=font_bold_xs, fill=(226, 114, 91, 255))
    cdraw.text((fc4_x + 14, fc4_y + 32), "Visual Receipts & CameraX Hook", font=font_reg_sm, fill=(240, 246, 252, 255))

    # 8. Bottom Showcase Strip (Highlighting all 7 Screens)
    bottom_y = H - 56
    draw.line([(60, bottom_y), (W - 60, bottom_y)], fill=(255, 255, 255, 22), width=1)
    
    screen_ticker = [
        "1. Core Dashboard (₱37.9k Balance)",
        "2. Weekly Vico Telemetry",
        "3. Monthly Photo Receipts",
        "4. Year Time-Engine",
        "5. M3 Month Calendar",
        "6. Camera Expense Capture",
        "7. Liquidity Ratio"
    ]
    
    draw.text((60, bottom_y + 16), "SHOWCASE SUITE (7 SCREENS):", font=font_bold_xs, fill=(226, 114, 91, 255))
    
    tick_x = 290
    for i, s_name in enumerate(screen_ticker):
        if tick_x + 140 > W - 180:
            break
        draw.text((tick_x, bottom_y + 16), s_name, font=font_reg_xs, fill=(180, 195, 215, 230))
        tick_x += draw.textbbox((0, 0), s_name, font=font_reg_xs)[2] + 20
        if i < len(screen_ticker) - 1:
            draw.text((tick_x - 12, bottom_y + 16), "•", font=font_reg_xs, fill=(64, 224, 208, 160))
            
    # Right-aligned Studio Credit
    credit = "Techxodia Mobile Engineering Lab"
    cr_w = draw.textbbox((0, 0), credit, font=font_bold_xs)[2]
    draw.text((W - 60 - cr_w, bottom_y + 16), credit, font=font_bold_xs, fill=(64, 224, 208, 240))

    # 9. Save to destinations
    cover_out = 'd:/Techxodia/finpulse/cover.png'
    main_out = 'd:/Techxodia/finpulse.png'
    
    base.save(cover_out, format='PNG', optimize=True)
    base.save(main_out, format='PNG', optimize=True)
    print(f"Theme Cover successfully generated at {cover_out} and {main_out} ({W}x{H})")

if __name__ == '__main__':
    create_theme_cover()
