# Native Spider
spider solitaire using React Native

## Commands:
### Start Metro Server
```
    npx expo start
```

### Install via Expo
Allows Expo to do an opinionated install of an npm package
```
    npx expo install <npm-package>
```


### Bundle Visualizer:
Should limit of 500MB, should shoot for below 80MB 
[Apple Bundle Limits](https://developer.apple.com/help/app-store-connect/reference/maximum-build-file-sizes/)
```
npx react-native-bundle-visualizer
```

## To Do:
- [ ] cypress install for testing
- [ ] remove Stack view component, only cards should be view objects

## Thoughts:

I think that I made near enough the right call on when to enfore typescript and 
when to start enabling Cypress. I think I would have been pretty upset if I had
constructed all of the state-machine events and comms without knowing what would 
satisfy cypress


