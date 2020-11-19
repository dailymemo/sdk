## API

**叽喳・Giki** provides varierty of APIs for developers to build extensions, all kinds of extensions (Vim plugin, Emacs pluggin, CLI, etc) are welcome.

**Notes**: We use `giki` to represent an item of your writing. You can get your **token** from your profile setting page, **token** is optional for all the `GET` endpoints, but required for `POST` endpoints.


## Use SDK


```shell
npm install @gikiapp/sdk
```

```javascript
const API = require('@gikiapp/sdk')

const client = new API({ env: 'staging', token: <Your token> })
const res = await client.login()
if (res.ok) {
  console.log('user login success')
}

const res = client.save('talk', { text: 'hello world' })
if (res.ok) {
  console.log('talk created')
}
```

## Use HTTP


### Users

**user fetch**

```
GET https://api.giki.app/users
```

- fetch by name

```shell
curl 'https://api.giki.app/users?name=<your name>' \
  -H 'authorization: Basic <your token>'
```

- fetch by domain

```shell
curl 'https://api.giki.app/users?domain=<your domain>' \
  -H 'authorization: Basic <your token>'
```

**user update**

```shell
curl -X PUT 'https://api.giki.app/users' \
  -H 'authority: giki.app' \
  -H 'authorization: Basic eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFiMmRmZWMwLWE4NWUtNDRiZS04ZmYwLTZiNDkxNWFmMDEyNyIsIm5hbWUiOiJpIiwicHJvdmlkZXIiOiJ3ZWlibyIsInByb3ZpZGVyVXNlcklkIjoyMTY1NzE0NTA3LCJpYXQiOjE1OTE5NjE1MTYsImV4cCI6MTU5NDU1MzUxNn0.i0U501e382hsbGmFgk0fuxrofCtEU6PuTY7q4jLqswY' \
  -H 'content-type: application/json' \
  --data-binary '{"avatar":<your name>, "name": <your name>, "introduction": <your introduction>}' \
```

### Gikis

**giki create**

```
POST https://api.giki.app/api/talks
```

```shell

curl -X POST 'https://api.giki.app/talks' \
  -H 'authority: giki.app' \
  -H 'authorization: Basic <your token>' \
  -H 'content-type: application/json' \
  --data-binary '{"text":"hello world ","actions":["weibo"],"tags":["private"],"image":[]}'
```


**giki update**

```
PUT https://api.giki.app/talks
```

```shell

curl -X PUT 'https://giki.app/api/talks/update' \
  -H 'authority: giki.app' \
  -H 'authorization: Basic <your token>' \
  -H 'content-type: application/json' \
  --data-binary '{"id": "f031fbd2-f73f-11ea-adc1-0242ac120002", text":"hello world ","actions":["weibo"],"tags":["private"],"image":[]}'
```


**giki list**

```
GET https://api.giki.app/talks
```

- list by domain

```shell
curl 'https://api.giki.app/talks?domain=iiiii.li' \
  -H 'authority: giki.app' \
  -H 'authorization: Basic <your token>'
```

- list by name

```shell
curl 'https://api.giki.app/talks?name=i' \
  -H 'authority: giki.app' \
  -H 'authorization: Basic <your token>'
```

**giki query**

```
https://giki.app/api/talks/query
```

```
  curl 'https://api.giki.app/talks?id=<giki id>' \
  -H 'authorization: Basic <your token>'
```

**giki tags list**

```
https://api.giki.app/talks
```

you can list tags by a domain or a name of a user, with `list_tag=true` in query
string

- list by domain

```
curl 'https://api.giki.app/talks?domain=iiiii.li&list_tag=true' \
  -H 'authorization: Basic <your token>'
```

- list by name

```
curl 'https://api.giki.app/talks?name=i&list_tag=true' \
  -H 'authorization: Basic <your token>'
```
