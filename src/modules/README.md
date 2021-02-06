## Modules

A custom user plugins. Place a `.ts` file with the following template, it will be installed automatically.

```ts
import { UserPlugin } from '@/types'

export const install: UserPlugin = ({ app, router, isClient }) => {
  // do something
}
```
