# Query Strings

vue-tiny-router preserves query strings during navigation but does not parse them automatically. This keeps the bundle tiny while giving you full control.

## Reading Query Parameters

Use the standard `URLSearchParams` API in your components:

```vue
<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-tiny-router'

const route = useRoute()

const query = computed(() => {
  const search = route.route?.split('?')[1] || ''
  return new URLSearchParams(search)
})

// Access individual params
const page = computed(() => query.value.get('page') || '1')
const sort = computed(() => query.value.get('sort') || 'date')
</script>
```

## Navigating with Query Strings

Query strings are passed as part of the path:

```js
import { useRouter } from 'vue-tiny-router'

const router = useRouter()

// Navigate with query params
router.push('/search?q=vue&page=2')

// Build query strings programmatically
const params = new URLSearchParams({ q: 'vue', page: '2' })
router.push(`/search?${params}`)
```

## Initial Query

On page load, `initialQuery` captures the query string from the URL:

```js
import { initialQuery } from 'vue-tiny-router'

console.log(initialQuery.value) // "?ref=github&utm_source=blog"
```
