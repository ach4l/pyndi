import requests
import json

data = {'usercode': 'likh("Hello")'}

headers = {'content-type': 'application/json'}
url = 'https://ach4l.pythonanywhere.com/pyndiline'

r = requests.post(url = url, data = json.dumps(data) , headers=headers)
print(r.text)