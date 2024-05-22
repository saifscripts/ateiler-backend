## How to run the application locally

Here is step by step guide provided to run the server on your local machine.

### 1. Clone the repository

First, clone this repository on your machine using this command.

```
git clone https://github.com/saifscripts/ateiler-backend
```

### 2. Change directory

Now, change the directory to the project directory using the following command.

```
cd ateiler-backend
```

### 3. Install dependencies

Before running the app we must install all dependencies. To do that use one of the following commands.

#### yarn

```
yarn install
```

or

#### npm

```
npm install --legacy-peer-deps
```

### 4. Add a .env file

To run the app we must add a .env file on the root folder, which contains following properties.

```
PORT=5000
DATABASE_URL=mongodb://localhost:27017
```

**[Note: You must change the DATABASE_URL if you want to run the app using your own database URI.]**

### 5. Run the app

Now, the app is ready for running. To run the app use one of the following commands.

#### yarn

```
yarn dev
```

or

#### npm

```
npm run dev
```
