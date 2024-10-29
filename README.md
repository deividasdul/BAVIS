![🏢 BAVIS 🏢](https://github.com/user-attachments/assets/19eca3cc-8325-4006-8e6b-40faf693834a)

 ![Github last commit](https://img.shields.io/github/last-commit/deividasdul/BAVIS) <br />
 ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
 
This project is a hostel accommodation management system that allows users to select and rent rooms based on their preferences, providing details on room availability, occupancy, pricing, and personalized recommendations. Administrators can manage room requests, view complaints, and control room data, streamlining the rental process and enhancing the user experience.

Table of Contents

## Table of Contents
1. [Installation](#installation)
2. [Usage](#usage)
3. [Technologies](#technologies)
4. [Additional Information](#additional-information)
5. [License](#license)
6. [Donations](#donations)

## Installation

To get the project running locally, follow these steps:

### Prerequisites

-   Ensure you have **Node.js** and **npm** installed.
-   Ensure **PostgreSQL** is installed and running.

### Backend Setup

1.  Clone the repository:

    ```
    git clone https://github.com/deividasdul/BAVIS
    cd BAVIS
    ```

3.  Navigate to the server folder:
    
    `cd server` 
    
4.  Install server dependencies:
    
    `npm install` 
    
5.  Configure your PostgreSQL database by creating a `.env` file in the server directory and adding the necessary environment variables:

    ```
    DB_USER=yourUsername
    DB_PASSWORD=yourPassword
    DB_HOST=localhost
    DB_PORT=5432
    DB_NAME=yourDatabaseName
    ```
    
7.  Start the backend server:

    `npm start` 
    
### Frontend Setup

1.  Open a new terminal window and navigate to the client folder:
    
    `cd client` 
    
2.  Install client dependencies:
    
    `npm install` 
    
3.  Start the frontend development server:
    
    `npm run dev` 
    

The application should now be running locally, with the backend server on `http://localhost:3000` and the frontend on `http://localhost:5173`.

----------

## Usage

-   **User Side**: Users can view available rooms, check occupancy, pricing, and recommendations. Rooms can be selected based on individual preferences.
-   **Admin Side**: Administrators can approve or deny room requests, manage room listings, and handle messages or complaints submitted by users.

----------

## Technologies

The project is built using the following technologies:

-   **Frontend**: React.js, HTML, CSS
-   **Backend**: Node.js, Express.js, PostgreSQL
-   **Database**: PostgreSQL

----------

## Additional Information

This project is developed as part of a thesis to improve room selection and management in a hostel setting. Users have control over their room choices, which enhances their experience, and the admin side simplifies reservation and room management.

----------

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

----------

## Donations

If you find this project helpful and would like to support further development, consider making a donation. Every contribution is appreciated!
