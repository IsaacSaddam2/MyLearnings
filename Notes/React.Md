## React is all about components

## uses of components:
1. reusablity
2. separation of concerns
3. component code is just a function that return jsx code
4. component name should start with Capital letter 


## declarative approach
- Define the desired target states and let the react figure out the actual javascript DOM instructions
- here 
    function App() {
  return (
    <div>
      <h2>Let's get started!</h2>  // This is target state we want and react will transform the js dom to transform into this
    </div>
  );
}

In vanilla js we would have written the same code as
const div = document.createElement('div');
document.getElementById('root').appendChild(p);
 

### Commands

1. To create a react app 
npx create-react-app app-name
   cd app-name
   npm start

----------------------------------------------------------------------------------------------------------------------------------------
##### Create React App

* search create-react-app (this is a tool whiich comes with config files used to deploy production and packages etc)  
* dynamic change development preview server
* optimise our code before deploying in production

##### understanding files
*  index.js file is the first file executed
*  react and react-dom libraries form the react library

**** index.js

import ReactDOM from 'react-dom/client'; 

import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));  //entry point to UI
root.render(<App />); // tells react what shold be render inside div tag of the created root

<App/> is a JSX

## public/index.html

- this is the only html file which would keep changing 
- <div id="root"></div>  //inside this div will inject all the react components

## App.js  (component jsx)

function App() {
  return (
    <div>
      <h2>Let's get started!</h2>  // Jsx code
    </div>
  );
}

export default App;  // this code transforms into complex code  developertools/sources/main.chunk.js

-------------------------------------------------------------------------------------------------------------------------------------

#### Introducing Jsx

1.  Jsx transforms the code in the browser
2.  App.js commponent uses jsx code

What is difference between JS and JSX?
JS is standard javascript, JSX is an HTML-like syntax that you can use with React to (theoretically) make it easier and more intuitive to create React components.

----------------------------------------------------------------------------------------------------------------------------------------

#### How react works
 // declarative approach

   function App() {
  return (
    <div>
      <h2>Let's get started!</h2>  // This is target state we want and react will transform the js dom to transform into this
    </div>
  );
}


In vanilla js we would have written the same code as

const div = document.createElement('div');
document.getElementById('root').appendChild(p);  // this is imperative approach
----------------------------------------------------------------------------------------------------------------------------------------


