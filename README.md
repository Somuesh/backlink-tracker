# Backlink Discovery Web Application

## Overview

This web application allows users to discover backlinks pointing to their target domains from a list of provided URLs. It features a user-friendly dashboard to manage crawl jobs, a robust crawler engine capable of handling JavaScript-rendered content and anti-bot measures, and provides detailed analytics on the discovered backlinks.

The backend is built using **Django** with **Django REST Framework** for API endpoints. The frontend is developed using **React** with **Vite**. Asynchronous job processing and scheduling are handled by **Celery** with **Redis** as the broker. The crawler engine utilizes **Selenium** and **Beautiful Soup 4 (bs4)** for web automation and scraping.

## Features

**Web Application:**

* **Dashboard:** View a list of past and current crawl jobs with their status (queued, in-progress, completed, failed).
* **New Job Creation:** A form to submit new crawl jobs with the following parameters:
    * **List of URLs to Crawl:** Input field for multiple URLs to be analyzed.
    * **Target Domain(s):** Input field for one or more target domains to find backlinks for.
    * **Crawl Speed/Rate Limiting:** Settings to control the crawl intensity.

**Job Management:**

* **Background Processing:** Crawl jobs are processed asynchronously in the background using Celery.
* **Status Updates:** Updates on the status of each crawl job in the dashboard.

**Crawler Engine:**

* **Headless Browser:** Utilizes Selenium with a headless browser to render JavaScript content and bypass common anti-bot techniques.
* **Backlink Extraction:** Identifies and extracts all hyperlinks within the target doain.
* **Data Capture:** For each discovered backlink, the following information is captured:
    * Source URL and page title
    * Target URL
    * `rel` attribute of the link

**Analytics:**

* **Detailed Reporting:** Provides a table for each crawl job with the following columns:
    * URL that was checked (the page where the link was found)
    * URL to target domain (the specific backlink pointing to one of the target domains)
    * `rel` attribute of the link

**Bonus Features (Implemented):**

* **Asynchronous Processing:** Improved performance through Celery for background tasks.
* **Export Results:** Ability to download crawl results as CSV files.

## Getting Started

### Prerequisites

* **Python 3.x**
* **Node.js** and **npm** (or yarn)
* **Selenium** and **Redis**

### Installation

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/Somuesh/backlink-tracker.git
    cd backlink-tracker
    ```

2.  **Backend Setup (Django):**
    ```bash
    cd backend
    python -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
    ```

3.  **Database Setup:**
    * Configure your database settings in `backlink_tracker/backlink_tracker/settings.py`.
    * Run migrations:
        ```bash
        python manage.py makemigrations
        python manage.py migrate
        ```
    * Create a superuser (for admin access):
        ```bash
        python manage.py createsuperuser
        ```

4.  **Redis Setup:**
    ```bash
    sudo apt install redis-server redis-tools
    
    sudo systemctl start redis.service
    sudo systemctl enable redis.service
    ```

5.  **Celery Setup:**
    * Ensure Redis is running.
    * Open a new terminal window and navigate to the `backlink_tracker` directory, same level as of manage.py.
    * Start the Celery worker:
        ```bash
        celery -A backlink_tracker worker -l info
        ```

6.  **Backend Server:**
    ```bash
    python manage.py runserver
    ```
    The backend API will be accessible at `http://127.0.0.1:8000/`.

7.  **Frontend Setup (React):**
    ```bash
    cd ../frontend
    npm install
    ```

8. **Frontend Development Server:**
    ```bash
    npm run dev
    ```
    The frontend application will be accessible at `http://localhost:5173/` (or a similar port).

## Design Decisions and Trade-offs

* **Backend (Django & DRF):** Django was chosen for its robust ORM, built-in admin panel, and mature ecosystem, which accelerates backend development. Django REST Framework simplifies the creation of well-structured APIs for the React frontend.
    * **Trade-off:** Django can be more monolithic compared to microframeworks, but its features were deemed beneficial for this project's scope.

* **Frontend (React & Vite):** React provides a component-based architecture for building interactive user interfaces. Vite offers a fast development experience with hot module replacement.
    * **Trade-off:** React requires more upfront configuration compared to simpler HTML/CSS/JS approaches, but its scalability and maintainability are advantageous for a feature-rich application.

* **Asynchronous Tasks (Celery & Redis):** Celery was selected for its reliable asynchronous task queue, allowing for background processing of long-running crawl jobs without blocking the web application. Redis serves as an efficient and in-memory message broker for Celery.
    * **Trade-off:** Introducing Celery adds complexity to the deployment and requires managing a separate Redis instance. However, the benefits of background processing and job management outweigh this. Also, we just used basic functionalities which won't create any other issues.

* **Crawler Engine (Selenium & BeautifulSoup):** Selenium is crucial for rendering JavaScript-heavy websites and bypassing some anti-bot measures by automating a real browser. BeautifulSoup is used for efficient parsing of the HTML content once rendered by Selenium.
    * **Trade-off:** Selenium can be resource-intensive and slower than purely HTTP-based scraping libraries. However, its ability to handle dynamic content is essential for modern web applications.

* **Database:** (SQLite). The choice was made based on factors like scalability, ease of setup, and project requirements. Also, it comes by default with django and can be used directly without any external modifications.

## Potential Improvements and Extensions

Given more time, the following improvements and extensions could be implemented:

* **Advanced Anti-Bot Measures:** Implement more sophisticated techniques to bypass advanced anti-bot systems, such as rotating proxies, user-agent management, and CAPTCHA solving.
* **More Granular Rate Limiting:** Allow users to configure more detailed rate limiting settings (e.g., requests per domain per second).
* **Crawl Configuration:** Provide more options for crawl configuration, such as depth limits, exclusion patterns (robots.txt awareness), and specific link types to follow.
* **Live Updates on Crawl Progress:** Show you what's happening while a crawl is running, like how many pages it has checked and how many backlinks it has found so far, updating as it goes.
* **Data Visualization:** Integrate charts and graphs to visualize the crawl results and backlink data.
* **Different User Permissions:** Create different types of user accounts with different levels of access. Some users might only be able to see results adn download their CSVs, while others can create new crawls.
* **Scalability Improvements:** Explore strategies for scaling the crawler and backend to handle a larger volume of crawl jobs and data.
* **Handle More at Once:** Make the system able to handle many more websites and crawl jobs at the same time without slowing down or having problems.

## Contributions

Thanks AI for helping me out on topics such as scheduling using celery+redis and on helping me refactor my code. And also for generate Readme.md file's structure.
