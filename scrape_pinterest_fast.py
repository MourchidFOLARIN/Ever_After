import urllib.request
import re
import json
import sys

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

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5'
}

results = []

print("Starting Scraper...", flush=True)

for i, url in enumerate(urls):
    print(f"Scraping ({i+1}/{len(urls)}): {url}", flush=True)
    if url.endswith(".jpg") or url.endswith(".png") or url.endswith(".mp4"):
        item = {"url": url, "image": url, "video": None}
        results.append(item)
        print(f"  -> Direct link: {url}", flush=True)
        continue
        
    try:
        req = urllib.request.Request(url, headers=headers)
        # Use a short timeout of 4 seconds so it doesn't hang
        with urllib.request.urlopen(req, timeout=4) as response:
            html = response.read().decode('utf-8', errors='ignore')
            
            # Find og:image
            og_image = re.search(r'<meta[^>]*property=["\']og:image["\'][^>]*content=["\']([^"\']+)["\']', html)
            if not og_image:
                og_image = re.search(r'<meta[^>]*content=["\']([^"\']+)["\'][^>]*property=["\']og:image["\']', html)
                
            # Find og:video
            og_video = re.search(r'<meta[^>]*property=["\']og:video["\'][^>]*content=["\']([^"\']+)["\']', html)
            if not og_video:
                og_video = re.search(r'<meta[^>]*content=["\']([^"\']+)["\'][^>]*property=["\']og:video["\']', html)
                
            img_url = og_image.group(1) if og_image else None
            vid_url = og_video.group(1) if og_video else None
            
            # Fallbacks for Pinterest video links
            if not vid_url:
                # Look for video URL in JSON script blocks or plain matches
                video_matches = re.findall(r'https://v1\.pinimg\.com/videos/mc/[^"\']+\.mp4', html)
                if video_matches:
                    vid_url = video_matches[0]
                    
            item = {"url": url, "image": img_url, "video": vid_url}
            results.append(item)
            print(f"  -> Image: {img_url}", flush=True)
            print(f"  -> Video: {vid_url}", flush=True)
            
    except Exception as e:
        print(f"  -> Error: {e}", flush=True)
        # Append empty info so we don't break the list indexing
        results.append({"url": url, "image": None, "video": None, "error": str(e)})

# Save results
with open("pinterest_media.json", "w", encoding="utf-8") as f:
    json.dump(results, f, indent=2, ensure_ascii=False)
    
print("Scraping Completed. Saved to pinterest_media.json.", flush=True)
