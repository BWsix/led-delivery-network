# Led Delivery Network

![成品](/public/led.jpg "成品")

## Setup a Development Environment

- install [nodejs](https://nodejs.org/en/)

- install [yarn](https://github.com/yarnpkg/yarn) (better npm)

  ```bash
  npm i -g yarn
  ```

- install [vscode](https://code.visualstudio.com) (where we write our code)

  install these extensions as well

  - rangav.vscode-thunder-client
  - esbenp.prettier-vscode

- install firmware (used for Johnny-Five to communicate with the board)
  1. install [arduino IDE](https://www.arduino.cc/en/software)
  1. Verify correct port and board
  1. Navigate to File > Examples > Firmata > StandardFirmataPlus
  1. Load sketch onto board

## Setup a Next.js Project

1. initialize a [next.js](https://nextjs.org/docs) project

   ```bash
   yarn create next-app . --ts
   ```

1. install [nanoevents](https://github.com/ai/nanoevents), [axios](https://github.com/axios/axios), [johnney-five](https://github.com/rwaldron/johnny-five)

   ```bash
   yarn add nanoevents axios johnney-five @serialport/bindings
   yarn add -D @types/johnney-five
   ```

1. remove these folders/files

   - `styles/`
   - `public/vercel.svg`

1. update/rename these files

   - `pages/_app.tsx`

     ```tsx
     import type { AppProps } from "next/app";

     function MyApp({ Component, pageProps }: AppProps) {
       return <Component {...pageProps} />;
     }

     export default MyApp;
     ```

   - `pages/index.tsx`

     ```tsx
     import type { NextPage } from "next";

     const Home: NextPage = () => {
       return <>Hello</>;
     };

     export default Home;
     ```

   - `pages/api/hello.ts` -> `pages/api/led.ts`

     ```ts
     import type { NextApiRequest, NextApiResponse } from "next";

     export default function handler(
       req: NextApiRequest,
       res: NextApiResponse
     ) {
       return res.json({ data: "hello" });
     }
     ```

## Javascript / Typescript Crash Course

- print stuff

  ```py
  print("hey")
  ```

  ```ts
  console.log("hey");
  ```

- variables

  ```py
  name = "bob"
  ```

  ```ts
  const name = "bob";
  ```

- import

  ```py
  from math import ceil, floor
  ```

  ```ts
  import { get, post } from "axios";
  ```

- async / await

  ```py
  async def func():
    await asynchronousFunction()
  ```

  ```ts
  const func = async () => {
    await asynchronousFunction();
  };
  ```

- functions

  ```py
  def greet():
    return "hey"
  ```

  ```ts
  // arrow function (anonymous function)
  const greet = () => {
    return "hey";
  };

  // named function
  function greet() {
    return "hey";
  }
  ```

- typing

  ```py
  def greet(name: str):
    pass
  ```

  ```ts
  const greet = (name: string) => {};
  ```

- objects (javascript)

  ```ts
  const person = {
    name: "bob",
    age: 20,
    greet: () => {
      console.log("hey");
    },
  };

  console.log(person); // output: { name: "bob", age: 20 }
  console.log(person.age); // output: 20
  person.greet(); // output: hey
  ```

## Code Snippets

(You can find the full source code here: [server](pages/api/led.ts) / [client](pages/index.tsx))

### Api Route

```ts
// pages/api/led.ts

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.query);

  res.end("hey");
}
```

`http://localhost:3000/api/led?hello=bob`

### Buttons in React

```tsx
// pages/index.tsx

const Home: NextPage = () => {
  const greet = () => {
    console.log("hey");
  };

  return (
    <>
      <button onClick={() => greet()}>click me</button>
    </>
  );
};
```

### Axios

```tsx
import axios from "axios";

axios.get("http://locahost:3000/api/led?name=bob");
```

### Button & Axios

```tsx
// pages/index.tsx

const Home: NextPage = () => {
  const init = async () => {
    await axios.get("http://localhost:3000/api/led?init=1");
  };

  return (
    <>
      <button onClick={() => init()}>click me</button>
    </>
  );
};
```

### Server-Side Rendering with Next.js

1. `getServerSideProps` runs on each request (before server returns the page)
1. `getServerSideProps` only runs on server-side and never runs on the browser

[docs](https://nextjs.org/docs/api-reference/data-fetching/get-server-side-props)

```ts
// pages/index.tsx

import type { GetServerSideProps, NextPage } from "next";

// ...

export const getServerSideProps: GetServerSideProps = async () => {
  await axios.get("http://localhost:3000/api/led?init=1");

  return {
    props: {},
  };
};
```

### Nanoemitter

```ts
import { createNanoEvents } from "nanoevents";

const emitter = createNanoEvents();

emitter.on("greet", () => {
  console.log("hey");
});

emitter.emit("greet");
```

### Johnney-five

```ts
import { Board, Led } from "johnny-five";

const board = new Board({ repl: false });

board.on("ready", () => {
  const led = new Led(13);

  led.on();
});
```
