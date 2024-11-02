import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import UserPage from "./pages/UserPage";
import NewPostPage from "./pages/NewPostPage";
import UserSettingsPage from "./pages/UserSettingsPage";
import PostPage from "./pages/PostPage";

import { UserProvider } from './UserContext';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<UserProvider><UserPage /></UserProvider>} />
        <Route path="/user/edit" element={<UserProvider><UserSettingsPage /></UserProvider>} />
        <Route path="/new/post" element={<UserProvider><NewPostPage /></UserProvider>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<UserProvider><SignIn /></UserProvider>} />
        <Route path="/post/:id" element={<UserProvider><PostPage /></UserProvider>} />
      </Routes>
    </Router>
  );
};

export default App;

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/user" element={<UserPage />} />
//         <Route path="/user/edit" element={<UserSettingsPage />} />
//         <Route path="/new/post" element={<NewPostPage />} />
//         <Route path="/signup" element={<SignUp />} />
//         <Route path="/signin" element={<SignIn />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;
