
# Rentry Clone

This project is a clone of [Rentry](https://rentry.co/), a markdown-based pastebin, developed as a school project. The application is built with Node.js, Express.js, and EJS for templating. Initially developed on my personal SD card, this project is now available on GitHub for demonstration.

## Video showcase

https://files.offshore.cat/y7fJK22m.mp4

## Features

- **Markdown Support**: Write and preview markdown text.
- **Paste Saving**: Create unique URLs for each paste.
- **Paste editing**: Edit your paste any time using edit code.
- **Simple Interface**: Minimalist, dark theme design.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Templating**: EJS
- **Frontend**: Basic HTML, CSS, JavaScript

## Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/tadas-vnc/trentry.git
   cd rentry-clone
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start the Application**
   ```bash
   node index.js
   ```

4. **Access the App**
   Open your browser and navigate to [localhost:3000](http://localhost:3000).

## Usage

1. Open the app on `localhost:3000`.
2. Use the text editor to write or paste markdown text.
3. Save your work to generate a unique URL for sharing.

## Project Structure

- `index.js` - The main entry point of the application.
- `views/` - Contains EJS templates for the frontend.
- `pastes/` - Pastes saved as txt files.
- `database.db` - Database for pastes data saving, except for paste contents.
