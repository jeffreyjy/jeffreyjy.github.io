---
title: Vibe Glasses
author: Jeffrey Yang
featured: true
draft: false
tags:
  - computer-vision
  - internet-of-things
description: Contextual music recommendations with smart glasses.
githubUrl: https://github.com/jeffreyjy/BGM-prototype
techStack:
  - HTML
  - CSS
  - JavaScript
  - Flask
  - Python
  - Spotify Web API
  - Arduino
---

## Overview

Wearable devices and embodied AI open up new possibilities for building systems that respond directly to what people see and experience in real time. A natural extension of this idea is creating tools that adapt to visual context, rather than requiring constant user input. <br><br> 

This motivation led me to build Vibe Glasses, a side project that uses computer vision from a small camera mounted on a pair of glasses to infer a user’s surroundings and automatically play context-appropriate music through their Spotify. For example, when you're studying it will play LoFi music, or if you're working out it will play gym music.<br><br> 

I believe smart glasses are the future for human–computer interaction, and this project was an opportunity to start exploring that space hands-on. <br>

## The Hardware

For the prototype, I used an ESP32-CAM, a development board with Wi-Fi and Bluetooth capabilities, along with a 2MP OV2640 camera module. 

<figure>
  <img
    src="/src/assets/images/camera.png"
    alt="CAM"
    class="border-0 shadow-none"
    style="width: 70%"
  />
  <figcaption style="text-align: center; width: 100%;">ESP32-CAM</figcaption>
</figure>

The ESP32 connects to the backend server via Wi-Fi, then periodically sends JPEG frame captures to the backend via API calls.

## The Software

The companion app is a small Flask webapp designed to run in the background. It connects to a user's Spotify account via OAuth authentication. Every few seconds, a background thread will read the latest frame retrieved from the camera, convert it to a PIL Image, and pass it to a vision-language model (ViT-B/32) which identifies what the scene is and selects an appropriate song or genre to play. <br><br>

The chosen song/genre is then checked against the currently playing Spotify track (queried via the Spotify API using the user's OAuth access token). If the detected scene differs from the current track's scene, the backend automatically switches playback to the corresponding Spotify track on the user's active Spotify device.

<figure style="display: flex; flex-direction: column; align-items: center; margin: 0;">
  <video controls style="width: 70%; display: block; margin: 0 auto;">
    <source src="/src/assets/videos/vibeglasses.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
  <figcaption style="text-align: center; width: 100%;">Demo</figcaption>
</figure>


<figure>
  <img
    src="/src/assets/images/vibeglasses.png"
    alt="Vibe Glasses"
    class="border-0 shadow-none"
    style="width: 70%"
  />
  <figcaption style="text-align: center; width: 100%;">Prototype</figcaption>
</figure>


