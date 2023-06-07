## Done Done
Not just a simple todo list application

![logo](https://github.com/Prajwal264/done-done/assets/53701638/daf1d115-2343-4df2-a155-782e79d6023f)


This is a monorepo containing a full-stack Todo List application built using React + Redux, Node.js, and Inversify Express. The application allows users to create, edit, delete, and manage tasks in a simple and intuitive interface. It also provides authentication and authorization using JWT tokens.

The application is currently deployed and accessible at https://done-done.onrender.com/.

### Features
- User authentication and authorization using JWT tokens.
- Two main pages:
  - All Tasks: Lists all tasks, including both completed and uncompleted ones.
  - Completed: Lists only the completed tasks.
- Task management:
  - Create new tasks.
  - Edit existing tasks.
  - Delete tasks.
  - Toggle the completion state of tasks.
  - Drag and drop feature for task listing.
 
### Technologies Used
**React**: A popular JavaScript library for building user interfaces.
**Node.js**: A JavaScript runtime environment for server-side development.
**Inversify Express**: A lightweight inversion of control (IoC) container for Express.js applications.

### Prerequisites
Make sure you have the following software installed on your machine:

**Node.js**: https://nodejs.org/
**Yarn (optional)**: https://yarnpkg.com/

### Screenshots
#### Homepage
-----
<img width="1440" alt="Screenshot 2023-06-07 at 9 44 13 PM" src="https://github.com/Prajwal264/done-done/assets/53701638/be6d6f5d-7fbc-4d88-9759-8181176d9fe2">

#### Signup Page
-----
<img width="1440" alt="Screenshot 2023-06-07 at 9 44 22 PM" src="https://github.com/Prajwal264/done-done/assets/53701638/419e40e7-cdd6-4b4a-85c5-7df15421f705">

#### Login Page
-----
<img width="1440" alt="Screenshot 2023-06-07 at 9 44 29 PM" src="https://github.com/Prajwal264/done-done/assets/53701638/77559b9f-5ce2-4649-922a-838299781d92">

#### All Tasks Page
-----
<img width="1440" alt="Screenshot 2023-06-07 at 10 07 43 PM" src="https://github.com/Prajwal264/done-done/assets/53701638/19e5704d-35ca-411b-acbb-fab06f1d2d7a">

#### Completed Tasks Page
------
<img width="1440" alt="Screenshot 2023-06-07 at 10 07 50 PM" src="https://github.com/Prajwal264/done-done/assets/53701638/c1db3e95-d4d1-4b92-9618-9bad2899e796">

#### Add Tasks Modal
--------
<img width="1440" alt="Screenshot 2023-06-07 at 10 09 16 PM" src="https://github.com/Prajwal264/done-done/assets/53701638/323f861c-d048-4912-a789-918db86e4684">

#### Edit Task 
-------
<img width="1440" alt="Screenshot 2023-06-07 at 10 09 42 PM" src="https://github.com/Prajwal264/done-done/assets/53701638/84fbc85c-3b72-4cb8-bb73-36d860460437">

#### Responsive
------
<img width="391" alt="Screenshot 2023-06-07 at 10 09 33 PM" src="https://github.com/Prajwal264/done-done/assets/53701638/b25cfaf5-8064-49e7-b97a-0a890d16d670">


### Installation
To set up the Todo List application locally, follow these steps:

Clone the repository:
```bash
git clone https://github.com/Prajwal264/done-done done-done
```

Navigate to the project directory:

```bash
cd done-done
```
Install the dependencies:

```bash
yarn install
```

Usage
Start the typescript server:

```bash
yarn watch
```
Start the development server:

```bash
yarn dev
```

This will start both the frontend (React) and backend (Node.js) servers concurrently.

Access the application in your web browser at `http://localhost:3001`

### Configuration
The application requires some configuration to run properly. Make sure to set up the following environment variables:

.env should be created under `/apps/server/`
CLIENT_ORIGIN = `http://localhost:3001`
PORT = 4000

.env should be created under `/apps/web/`
BASE_API_URL = `http://localhost:4000`

### Deployment
This application auto deploys to the orender on push to **main** branch

### Contributing
Contributions to this project are welcome. Feel free to open issues and submit pull requests.

### License
This project is licensed under the MIT License.

Thank you for using the application! If you have any questions or need further assistance, please contact prajwal.praveen1997@gmail.com.
