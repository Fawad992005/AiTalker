# AI Assistant Chatbot

This project is an AI-powered chatbot built with React and Vite, leveraging OpenAI's Gemini-1.5-Flash API for generating responses. The chatbot provides a user-friendly interface for interactive communication with the AI.

## Features

- **Fast Refresh with Vite**: Instant updates during development using Vite's Hot Module Replacement (HMR).
- **React for UI**: A clean, responsive user interface built with React.
- **Markdown Support**: Supports rich text formatting and code snippets using `react-markdown` and `react-syntax-highlighter`.
- **Copy-to-Clipboard**: Easily copy code snippets from bot responses.
- **Loading States**: Indicates when the AI is processing a response.
- **Error Handling**: Handles errors gracefully when the API fails to respond.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/ai-assistant-chatbot.git
   cd ai-assistant-chatbot
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000`.

## Usage

1. Open the application in your browser.
2. Type a message in the input field and press enter to send it.
3. The AI will respond, and you can continue the conversation.

## Project Structure

- **`src/`**: Contains the source code.
  - **`components/`**: Contains React components.
  - **`Apiservice.ts`**: Contains the function to interact with OpenAI's API.
  - **`App.tsx`**: Main application file.
- **`public/`**: Contains static assets.
- **`vite.config.ts`**: Vite configuration file.

## API Integration

This project uses OpenAI's Gemini-1.5-Flash API. You need an API key to use this service. Add your API key to `Apiservice.ts` or set it as an environment variable.

## Dependencies

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [React Markdown](https://github.com/remarkjs/react-markdown)
- [React Syntax Highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter)
- [Lucide Icons](https://lucide.dev/)
- [OpenAI API](https://platform.openai.com/docs/)

## Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the project for production.
- `npm run preview`: Previews the production build locally.
- `npm run lint`: Runs ESLint on the project files.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
