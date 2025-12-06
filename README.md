AiBoo has two components:

aiboo_agent – a Rust program that monitors new Windows processes.

aiboo_backend – a Node.js server that stores events in MongoDB and sends them to an LLM for analysis.

How to run the entire project:

First, make sure MongoDB is running locally on your machine at:
mongodb://127.0.0.1:27017/aiboo

Step 1: Run the backend.
Open a terminal and go to the folder AIBOO_PROJECT/aiboo_backend.
Run the following commands:

npm install
node src/index.js

If everything is correct, the terminal will show:
Backend running on port 4000
MongoDB Connected

Step 2: Set up environment variables.
Inside the aiboo_backend folder, create a file named .env and add:

PORT=4000
MONGO_URI=mongodb://127.0.0.1:27017/aiboo
MISTRAL_API_KEY=your_api_key_here

Step 3: Run the agent.
Open a second terminal and go to the folder AIBOO_PROJECT/aiboo_agent.
Run:

cargo run

Whenever Windows starts a new process, the agent will detect it, print it in the terminal, and send the event to the backend.

What happens internally:
The agent detects new processes.
It sends each event to the backend.
The backend saves the event in MongoDB.
The backend also forwards the event to an LLM using the API key.
The LLM returns severity, summary, and reason.
The backend saves this LLM output into the same MongoDB event record.

Project structure:
AIBOO_PROJECT contains two folders: aiboo_agent (Rust code) and aiboo_backend (Node.js backend + LLM integration).
There is also one .gitignore file at the project root.

Next steps after this:
Add a frontend dashboard.
Add a rule engine to classify events without LLM.
Improve the LLM scoring system.
