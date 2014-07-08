
Documentation TODOs
* Document how to create a self-signed SSL cert and force OSX to always trust it
* http://www.robpeck.com/2010/10/google-chrome-mac-os-x-and-self-signed-ssl-certificates/#.U7GhbI1dUgo
* How to configure the path in the Gruntfile to the location of the certs

Taken from http://docs.nodejitsu.com/articles/HTTP/servers/how-to-create-a-HTTPS-server
```
openssl genrsa -out key.pem
openssl req -new -key key.pem -out csr.pem
openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem
rm csr.pem
```
