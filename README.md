# Personal Portfolio

## Table of Contents

- [Personal Portfolio](#personal-portfolio)
  - [Table of Contents](#table-of-contents)
  - [Translations](#translations)
  - [Introduction](#introduction)
  - [Local Development](#local-development)
    - [Docker](#docker)
    - [Standalone](#standalone)
      - [Pre-requisites](#pre-requisites)
      - [Install dependencies](#install-dependencies)
      - [Start the development server](#start-the-development-server)

## Translations

- [English](/README.md)
- [日本語](/docs/README.ja.md)

## Introduction

This is a personal portfolio website which I use to provide more information about myself and projects I have previously completed. The website is built using Next.js 15.

## Local Development

### Docker

To run the project locally using Docker, you can use the following command:

```bash
docker-compose up -d
```

This will start the development server and you can access the website at `http://localhost:14452`.

### Standalone

#### Pre-requisites

- Node.js (v18 or later)
- pnpm (v8 or later)
- Redis (v7 or later)

#### Install dependencies

```bash
pnpm install
```

#### Start the development server

```bash
pnpm run dev
```

This will start the development server and you can access the website at `http://localhost:3000`.
