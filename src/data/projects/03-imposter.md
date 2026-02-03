---
title: Imposter
author: Jeffrey Yang
featured: true
draft: false
tags:
  - web-development
  - react
  - typescript
description: AI plays imposter.
githubUrl: https://github.com/jeffreyjy/example-project
techStack:
  - python
  - openai
  - cli
---

## Overview

An implementation of the game Imposter, played on the terminal. Here's how it works: A random secret word is chosen. One player is chosen as the imposter who doesn't know the word, the rest are regular players. Take turns giving hints one by one.

- **Regular Players**: Know the secret word and give indirect hints that are obvious to those who know the word but not to the imposter
- **Imposter**: Doesn't know the word and must analyze other players' hints, then give hints that blend in
- **Voting**: After all rounds, players analyze all hints and vote on who they think is the imposter

Create AI players and watch them play, or play with them yourself!

## Setup

To begin, you will need an OpenAI API key. 

- Clone the repo
- Create `.env` file in the projec troot
- Add API key to `OPENAI_API_KEY=your_api_key_here`
- Adjust settings in `config.py`
  
To start the game, simply type `python app.py` into the terminal. Open `players.json` to take a peek at what each AI player is thinking or strategizing.


<img
  src="/src/assets/images/imposter.png"
  alt="CAM"
  class="border-0 shadow-none"
  style="width: 70%"
/>