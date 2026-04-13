📖 About the Project

# Around Auth - Authentication System

## Project Description

Around Auth is a web application built with React that allows users to share photos of interesting places. This version includes a complete authentication system featuring user registration and login, expanding the functionality of the original Around project. ## Features

### User Authentication

- **New user registration** via email and password
- **Secure login** with credential validation
- **Logout** with session cleanup
- **Route protection** – access restricted to authenticated users
- **Session persistence** using localStorage

### Profile Management

- **Viewing and editing** of profile information
- **Custom avatar upload**
- **Real-time form validation**

### Card Management

- **Adding new cards** with a photo and description
- **"Like" system** for cards
- **Deletion** of one's own cards
- **Popup view** for full-size images

### Responsive Interface

- **Adaptive design** for desktop, tablet, and mobile
- **Informative popups** for user feedback
- **Intuitive navigation** between different sections

## Technologies Used

- **React 18** – JavaScript library for user interfaces
- **React Router DOM** – Routing for React applications
- **JavaScript ES6+** – Modern programming language
- **HTML5** – Semantic structuring
- **CSS3** – Styling and responsiveness
- **Create React App** – Build and development tool
- **Git & GitHub** – Version control

## Implemented Techniques

### Advanced React

- **Custom Hooks** (useState, useEffect, useContext)
- **Context API** for global state management
- **Functional components** with props and state
- **Conditional rendering** based on authentication status

### State Management

- **CurrentUserContext** for logged-in user data
- **Local state** for popup and form control
- **Persistence** of authentication tokens

### API Integration

- **HTTP requests** to the authentication backend
- **Error handling** and visual feedback
- **Validation** of API responses

## Structure of the Project

```
src/
├── components/
│   ├── App.js
│   ├── Header.js
│   ├── Main.js
│   ├── Footer.js
│   ├── Card.js
│   ├── ImagePopup.js
│   ├── PopupWithForm.js
│   ├── AddPlacePopup.js
│   ├── EditProfilePopup.js
│   ├── EditAvatarPopup.js
│   ├── Login.js
│   ├── Register.js
│   ├── ProtectedRoute.js
│   └── InfoTooltip.js
├── contexts/
│   └── CurrentUserContext.js
├── utils/
│   └── api.js
├── blocks/
│   └── [CSS files organized by blocks]
├── images/
│   └── [project images and icons]
├── index.css
└── index.js---

##

⚙️ Installation and Execution
### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

---

Check it out here: https://gisela-lucena.github.io/web_project_around_auth/

---

## 👩‍💻 Author

**Gisela Elia**
Full-Stack Developer | JavaScript & Web Applications
📧 www.linkedin.com/in/giselaelia
🌐 https://github.com/gisela-lucena

---

## 📝 License

This project is licensed under the **MIT License**.
Feel free to use, modify, and distribute it as long as proper credit is given.

---

> “Around the U.S.” is part of a learning project focused on front-end architecture, user experience, and clean, maintainable JavaScript code.

---

```
