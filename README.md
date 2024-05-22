# How to Run the Application Locally

Follow this step-by-step guide to run the server on your local machine.

### 1. Clone the Repository

First, clone the repository to your machine using the following command:

```
git clone https://github.com/saifscripts/ateiler-backend
```

### 2. Change Directory

Next, navigate to the project directory with this command:

```
cd ateiler-backend
```

### 3. Install Dependencies

Before running the app, you need to install all dependencies. You can do this using either Yarn or npm.

#### Using Yarn

```
yarn install
```

#### Using npm

```
npm install --legacy-peer-deps
```

### 4. Add a .env File

To run the app, create a `.env` file in the root folder with the following properties:

```
PORT=5000
DATABASE_URL=mongodb://localhost:27017
```

**Note:** Change the `DATABASE_URL` if you want to use your own database URI.

### 5. Run the App

Now, you're ready to run the app. Use one of the following commands to start the server.

#### Using Yarn

```
yarn dev
```

#### Using npm

```
npm run dev
```

That's it! Your application should now be running locally.
