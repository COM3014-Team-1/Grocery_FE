import React from 'react';
import AuthForm from './AuthForm';  // Optional
import Header from "./components/Header";
//import OrderDetails from './orderdetails'; // Capitalize the component name

function App() {
  return (
    <div className="App">
      
      <AuthForm />  {/* Capitalized when used as a JSX component */}
    </div>
  );
}

export default App;
