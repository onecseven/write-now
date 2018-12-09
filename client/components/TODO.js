//TODO
//1. onboarding modal for timer/word count
//2. calendar view
//3. read component
//4. sessions
//5. mongoDB
//6. save
//7. backend

// const handler = {
//   get: function(target, propKey, receiver) {
//     const origMethod = target[propKey]
//     if (typeof origMethod === "function" && propKey !== 'addToHistory') {
//       return function(...args) {
//         target.addToHistory(propKey, ...args)
//         return Reflect.get(target, propKey, receiver)
//       }
//     } else {
//       return Reflect.get(target, propKey, receiver)
//     }
//   },
//   set: function(obj, prop, value) {
//     let orig = obj[prop]
//     obj.addToHistory(
//       `Changing property "${String(prop)}" from {${String(orig)}} to {${String(
//         value
//       )}}`
//     )
//     return Reflect.set(obj, prop, value)
//   }
// }