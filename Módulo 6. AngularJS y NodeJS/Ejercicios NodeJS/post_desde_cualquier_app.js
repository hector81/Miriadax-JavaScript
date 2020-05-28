Ahora podemos hacerle un post desde cualquier app que nos
permita hacerlo. Se puede utilizar una extensión de Chrome llamada
Postman, desde ahí le podemos enviar lo siguiente a “http://
localhost:3000/users”:


POST /users HTTP/1.1
Host: localhost:3000
Authorization: ApiKey
appClient:xxxxxxxxxxxxxxxxxxxxxxxxxx
Cache-Control: no-cache
----WebKitFormBoundaryE19zNvXGzXaLvS5C
Content-Disposition: form-data; name=”username”
oscar1234
----WebKitFormBoundaryE19zNvXGzXaLvS5C
Y deberá retornar:
¡Hola, oscar1234!