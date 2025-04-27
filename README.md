# Grocery FE

# Folder Structure
src/
│   ├── components/   # Reusable UI components
│   ├── pages/        # Page-level components
│   ├── store/        # Zustand store
│   ├── hooks/        # Custom hooks (if needed)
│   ├── styles/       # Global styles
│   ├── tests/        # Unit and integration tests
│   ├── App.js
│   ├── index.js
│   ├── routes.js     # Centralized routes config
│── package.json
│── README.md


# Run the project
For the APIs to work:
-Start the BFF project
-Start the Product Service
-Start the User Service


Execute the following shell commands:
-npm i
-npm run start

# Run the tests
npm run test

-If you want to run a single test file, go to jest.config.js and replace this line
export const testMatch = ['**/src/tests/**/*.test.js'];
with
export const testMatch = ['**/src/tests/**/*filename*.test.js'];
