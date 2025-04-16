# Agentic

A hosted platform for building and executing agentic software systems. Agentic provides a service where users can define autonomous agent agents through a web interface or configuration files, execute these agents via API, and get results without requiring any local SDK installation.

## Project Architecture

This project follows a hexagonal (ports and adapters) architecture pattern using TypeScript and Node.js. The architecture separates the application into the following layers:

- **Domain Layer**: Contains business entities and repository interfaces
- **Application Layer**: Contains application services and use cases
- **Infrastructure Layer**: Contains implementations of repositories, controllers, and external services

## Tech Stack

- **Language**: TypeScript
- **Runtime**: Node.js
- **Database**: MongoDB
- **Web Framework**: Express.js
- **Dependency Injection**: TypeDI
- **Testing**: Jest
- **CI**: GitHub Actions

## Getting Started

### Prerequisites

- Node.js (v16+)
- MongoDB

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/agentic.git
cd agentic
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables

```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Build the project

```bash
npm run build
```

5. Run the server

```bash
npm start
```

For development:

```bash
npm run dev
```

## API Endpoints

- `GET /api/agents` - List all agents
- `GET /api/agents/:id` - Get agent details
- `POST /api/agents` - Create a new agent
- `PUT /api/agents/:id` - Update a agent
- `DELETE /api/agents/:id` - Delete a agent
- `POST /api/agents/:id/execute` - Execute a agent

## Development

### Running Tests

```bash
npm test
```

### Linting

```bash
npm run lint
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.
