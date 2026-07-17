import subprocess
import re
import json

urls = [
    # Images
    "https://i.pinimg.com/1200x/23/f4/b1/23f4b12bd43b24394a6418203f5874bf.jpg",
    "https://www.pinterest.com/pin/335096028544457513/",
    "https://www.pinterest.com/pin/3377768468489418/",
    "https://www.pinterest.com/pin/480477854017630851/",
    "https://www.pinterest.com/pin/1130755419058561535/",
    "https://www.pinterest.com/pin/418975571598066180/",
    # Videos
    "https://www.pinterest.com/pin/95420085848757788/",
    "https://www.pinterest.com/pin/931541504202638155/",
    "https://www.pinterest.com/pin/786089310036719217/",
    "https://www.pinterest.com/pin/710654016240019736/",
    "https://www.pinterest.com/pin/93801604731814498/"
]

results = []

for i, url in enumerate(urls):
    print(f"Checking URL {i+1}/{len(urls)}: {url}")
    if url.endswith(".jpg") or url.endswith(".png") or url.endswith(".mp4"):
        results.append({"url": url, "image": url, "video": None})
        print(f"  -> Direct Link: {url}")
        continue

    try:
        # Run native curl command with standard browser User-Agent
        cmd = [
            "curl", 
            "-s", "-L", 
            "-A", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
            url
        ]
        
        process = subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8", errors="ignore", timeout=8)
        html = process.stdout
        
        # Parse og:image
        og_img_match = re.search(r'<meta[^>]*property=["\']og:image["\'][^>]*content=["\']([^"\']+)["\']', html)
        if not og_img_match:
            og_img_match = re.search(r'<meta[^>]*content=["\']([^"\']+)["\'][^>]*property=["\']og:image["\']', html)
            
        # Parse og:video
        og_vid_match = re.search(r'<meta[^>]*property=["\']og:video["\'][^>]*content=["\']([^"\']+)["\']', html)
        if not og_vid_match:
            og_vid_match = re.search(r'<meta[^>]*content=["\']([^"\']+)["\'][^>]*property=["\']og:video["\']', html)
            
        img_url = og_img_match.group(1) if og_img_match else None
        vid_url = og_vid_match.group(1) if og_vid_match else None
        
        # Fallback for video links
        if not vid_url:
            vid_search = re.findall(r'https://v1\.pinimg\.com/videos/mc/[^"\']+\.mp4', html)
            if vid_search:
                vid_url = vid_search[0]
                
        # Additional image fallback (e.g. pin-image-preload)
        if not img_url:
            img_search = re.findall(r'https://i\.pinimg\.com/736x/[^"\']+\.jpg', html)
            if img_search:
                img_url = img_search[0]
                
        print(f"  -> Extracted Image: {img_url}")
        print(f"  -> Extracted Video: {vid_url}")
        
        results.append({
            "url": url,
            "image": img_url,
            "video": vid_url
        })
    except Exception as e:
        print(f"  -> Error: {e}")
        results.append({
            "url": url,
            "image": None,
            "video": None,
            "error": str(e)
        })

# Write to file
with open("pinterest_media.json", "w", encoding="utf-8") as f:
    json.dump(results, f, indent=2, ensure_ascii=False)

print("\nDone! Output written to pinterest_media.json")
