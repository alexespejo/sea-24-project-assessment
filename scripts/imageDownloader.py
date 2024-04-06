import requests

# URL of the image you want to download
url = "https://cdn2.albumoftheyear.org/200x/album/led-zeppelin-iv.jpg"

# Send a GET request to the URL
response = requests.get(url)

# Check if the request was successful (status code 200)
if response.status_code == 200:
    # Open a file in binary write mode to save the image
    with open("led-zeppelin-iv.jpg", "wb") as f:
        # Write the content of the response (image data) to the file
        f.write(response.content)
    print("Image downloaded successfully!")
else:
    print("Failed to download image:", response.status_code)
