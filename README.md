<div align="center">
  <h1 align="center">EcoPick</h1>
  <p align="center">
    AI-powered waste detection and recycling platform.
    <br />
    <a href="https://github.com/PRINCE-MEHTA91/ecopick"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/your-username/ecopick">View Demo</a>
    ·
    <a href="https://github.com/your-username/ecopick/issues">Report Bug</a>
    ·
    <a href="https://github.com/your-username/ecopick/issues">Request Feature</a>
  </p>
</div>

[![Build Status](https://img.shields.io/travis/com/your-username/ecopick.svg?style=for-the-badge)](https://travis-ci.com/your-username/ecopick)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg?style=for-the-badge)](https://opensource.org/licenses/ISC)

## Table of Contents

- [About The Project](#about-the-project)
- [Features](#features)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [Contact](#contact)

## About The Project

EcoPick is an innovative web application designed to promote recycling and environmental sustainability. Using a client-side AI model built with Teachable Machine, it allows users to upload images of waste materials and instantly receive an identification of the material. The platform also features user dashboards to track recycling history and calculate the potential earnings from the recycled items.

This project aims to make recycling more accessible and informative for everyone, encouraging more people to participate in creating a cleaner planet.

## Features

-   **AI-Powered Detection:** Instantly identifies waste materials with high accuracy using advanced AI.
-   **Real-Time Pricing:** Get market-based price estimates for your recyclables instantly.
-   **Eco-Friendly:** Encourages recycling and helps build a cleaner environment.
-   **User Authentication:** Secure login and registration system.
-   **User Dashboard:** Track your recycling history and your environmental impact.
-   **Admin Panel:** For managing users and prices.

## Screenshots

*(Add screenshots of your application here)*

**Home Page**
![Home Page](https://via.placeholder.com/800x400.png?text=Home+Page+Screenshot)

**Detection Page**
![Detection Page](https://via.placeholder.com/800x400.png?text=Detection+Page+Screenshot)

**Dashboard**
![Dashboard](https://via.placeholder.com/800x400.png?text=Dashboard+Screenshot)


## Tech Stack

-   **Frontend:** HTML, CSS, JavaScript
-   **Backend:** Node.js, Express.js
-   **AI:** [Teachable Machine](https://teachablemachine.withgoogle.com/) & [TensorFlow.js](https://www.tensorflow.org/js) (Client-side)
-   **Database:** JSON files for session and user data (for development)

## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

-   npm
    ```sh
    npm install npm@latest -g
    ```

### Installation

1.  Clone the repo
    ```sh
    git clone https://github.com/your-username/ecopick.git
    ```
2.  Install NPM packages
    ```sh
    npm install
    ```
3.  Start the server:
    ```bash
    npm start
    ```
4.  Open your browser and go to `http://localhost:3002` to use the application.

## API Endpoints

The primary API endpoints are defined in `routes/api.js`. The AI detection is handled on the client-side and does not have a dedicated backend endpoint.

-   `POST /api/login`: Handles user login or creates a new profile.
-   `GET /api/profile`: Returns data for the currently logged-in user.
-   `POST /api/profile/update`: Updates the profile of the logged-in user.
-   `POST /api/logout`: Logs the user out.
-   `GET /api/prices`: Returns the current prices for recyclable materials.
-   `POST /api/calculate-price`: Calculates the price for a given material and weight.
-   `POST /api/submit-waste`: Submits a waste transaction for a user.
-   `GET /api/dashboard`: Returns dashboard data for the logged-in user.

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request




Project Link: [https://github.com/your-username/ecopick](https://github.com/PRINCE-MEHTA91/ecopick)
