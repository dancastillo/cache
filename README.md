# cache

In-Memory cache for node.js

### Install

To install cache in an existing project as a dependency:

Install with npm:
```sh
npm install @dancastillo/cache
```
Install with yarn:
```sh
yarn add @dancastillo/cache
```
Install with pnpm:
```sh
pnpm install @dancastillo/cache
```

### Example

```js
// ESM
import * as Cache from 'cache'
const cache = new Cache()

// CommonJs
const cache = require('cache')()
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

const cache = cache({ duration })
```

- `duration`: This is used to add a time to live for the cache data. This option is optional.
- `duration.days`: Number of days to hold the data in cache. This option is optional.
- `duration.hours`: Number of hours to hold the data in cache. This option is optional.
- `duration.minutes`: Number of minutes to hold the data in cache. This option is optional.
- `duration.seconds`: Number of seconds to hold the data in cache. This option is optional.

### Methods

get
```js
const value = cache.get('foo') // bar
```

- `get(key): any`: Used to get a value stored in cache
  - `key`: string 

put
```js
cache.put('foo', 'bar')

// with duration
const duration = { hours: 12 }
cache.put('foo', 'bar', duration)
```

- `put(key, value, DurationOptions): void`: Used to get a value stored in cache.
  - `key`: string
  - `value`: any
  - `DurationOptions`: [here](#DurationOptions)

del
```js
cache.del('foo')
```

- `del(key): void`: Used to delete a value stored in cache
  - `key`: string 

clear
```js
cache.clear()
```

- `clear(): void`: Used to delete all values stored in cache

keys
```js
cache.keys()
```

- `keys(): string[]`: Used to retrieve all the keys in cache.


## License

Licensed under [MIT](./LICENSE).
