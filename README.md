![next-secure-router logo](https://repository-images.githubusercontent.com/349206173/d8181300-8836-11eb-95c4-b6421a035f99)
Simple but elegant Next.js hook to help you protect your private routes with client side code.  

## How does it work?
Built on top of `next/router`, `next-secure-router` looks for the current route to determine if the user has access to the private pages or not.

By default, Next.js exposes all routes publicly to the client, making it difficult manage access to theses pages if you don't use `getInitialProps` or `getServerSideProps`. 

`next-secure-router` will allows `publicPages` to be accessible at all time, while all the other pages will accessible only if `hasSecureAccess`is true.

Depending on the situation, the `useSecureRouter` hook will redirect you to the right page if you're allowed to access private routes or to the `fallbackRoute`if you're not.




The hook returns a boolean called `isReady`. This helps you prevent **Next.js** from rendering the page before you are being redirected to the private or public route. You can show your loading screen while waiting for `isReady` to be true.


## Getting started

### Yarn
`yarn add @smartbills/next-secure-router`
### NPM
`npm install @smartbills/next-secure-router`

### 
```js
import { useSecureRouter, SecureRouterProps } from '@smartbills/next-secure-router';
var isReady = useSecureRouter({ hasSecureAccess: secure, publicRoutes: ["/sign-up", /401"], fallbackRoute: "/401", });

```

## API
### Interfaces
#### SecureRouterProps

| Name         | Description            | Type           | Required  |Default value  |
| ------------- |:-------------:| :-------------:| -----:|-----:|
| `publicRoutes`| Array of routes that are always accessible. Please refer to current limitations to learn more      | `string[]` | `true` | [] |
| `fallbackRoute`      | Route where the browser will be redirect if he tries to access a private route and `hasSecuredAccess` is set to `false`       |   `string` | `true`  | [] |
| `hasSecureAccess` |  Set to `true` if you want to have access to private routes. Set to `false` to only allow public routes.       |   `boolean` |`true` | `false` |

### Functions
#### useSecureRouter()
**Parameters**

| Type         | Description            |  Required  
| ------------- |:-------------:|  -----:|
|`SecureRouterProps` | See `SecureRouterProps` for more information | `true`

**Return Value**
| Name         | Description            | Type             |Default value  |
| ------------- |:-------------:| :-------------:|-----:|
| `isReady` | You can use this boolean to prevent react from rendering the page before the validation process is complete. When `isReady` is true, the user has been redirected and the page is ready to be render.    |   `boolean` | `false` |



## Example
```js
export default function App() {
	var {isLoggedIn, userloading} = validateUser();
	    
  var isReady = useSecureRouter({ hasSecureAccess: isLoggedIn, publicRoutes: ["test"], fallbackRoute: "", });
  
  if(!isReady || userLoading) {
  	return <Loading />
  }
  
  if(loggedIn) {
  return <PrivateLayout/> 
  } else {
  return <PublicLayout/>
  }
 
}
```

## Current limitations
We validate access to `publicRoutes`  with `startsWith()` meaning that all the router will match everything after the route name.

#### Example
```js
var publicRoutes = ["/app"]
// The router will match /app* as public route.
```

## Future of this project
- Granular access control. Instead of array of string, pass an array of `{path: string, hasSecureAccess: boolean}` to control `hasSecureAccess` for each page.
- Custom Regex Path matching for public routes.

