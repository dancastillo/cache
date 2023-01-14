# imcache

In-Memory cache for node.js

### Install

To install imcache in an existing project as a dependency:

Install with npm:
```sh
npm install imcache
```
Install with yarn:
```sh
yarn add imcache
```
Install with pnpm:
```sh
pnpm install imcache
```

### Example

```js
// ESM
import imcache from 'imcache'
const cache = new imcache()

// CommonJs
const imcache = require('imcache')()
```
## Configuration

`scache(<options>)` accepts an options object.

### Options

#### DurationOptions

```js
const duration = {
  days: 1,
  hours: 12,
  minutes: 10,
  seconds: 30
}

const cache = imcache({ duration })
```

- `duration`: This is used to add a time to live for the cache data. This option is optional.
- `duration.days`: Number of days to hold the data in cache. This option is optional.
- `duration.hours`: Number of hours to hold the data in cache. This option is optional.
- `duration.minutes`: Number of minutes to hold the data in cache. This option is optional.
- `duration.seconds`: Number of seconds to hold the data in cache. This option is optional.

### Methods

get
```js
const value = imcache.get('foo') // bar
```

- `get(key): any`: Used to get a value stored in cache
  - `key`: string 

put
```js
imcache.put('foo', 'bar')

// with duration
const duration = { hours: 12 }
imcache.put('foo', 'bar', duration)
```

- `put(key, value, DurationOptions): void`: Used to get a value stored in cache.
  - `key`: string
  - `value`: any
  - `DurationOptions`: [here](#DurationOptions)

del
```js
imcache.del('foo')
```

- `del(key): void`: Used to delete a value stored in cache
  - `key`: string 

clear
```js
imcache.clear()
```

- `clear(): void`: Used to delete all values stored in cache

keys
```js
imcache.keys()
```

- `keys(): string[]`: Used to retrieve all the keys in cache.


## License

Licensed under [MIT](./LICENSE).
