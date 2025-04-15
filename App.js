import React from 'react';
// import AuthForm from './AuthForm';  // Optional
import UserProfile from './userprofile'; // Capitalize the component name

function App() {
  return (
    <div className="App">
      <UserProfile />  {/* Capitalized when used as a JSX component */}
    </div>
  );
}

export default App;
