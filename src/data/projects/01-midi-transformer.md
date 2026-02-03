---
title: MIDI Transformer
author: Jeffrey Yang
featured: true
draft: false
tags:
  - machine-learning
  - deep-learning
  - LLMs
description: Transformer-based generative music AI.
githubUrl: https://github.com/jeffreyjy/MusicTransformer
techStack:
  - Python
  - PyTorch
  - NumPy
---



## Overview

A Transformer model inspired by the [Music Transformer (Huang et al., 2018 arXiv:1809.04281)](https://arxiv.org/abs/1809.04281) architecture, implemented entirely from scratch in PyTorch. I designed and built preprocessing pipelines for the 170k+ songs in the [Lakh MIDI Dataset](https://colinraffel.com/projects/lmd/) that convert raw MIDI files into a unified token sequence with a multi-instrument vocabulary suitable for sequence modeling. The model supports multi-instrument conditioning and can generate coherent musical continuations through an inference script.


## Relative Attention

Standard Transformers use absolute positional encodings, which signal where each event occurs in a sequence but do not explicitly model how events relate to each other based on their distance in time. In music, structural patterns such as motifs, phrases, and repeated progressions depend heavily on relative timing and interval relationships rather than absolute positions.

This project modifies self-attention to include relative attention, which weights token interactions by their relative distance in the sequence. This mechanism helps the model maintain long-term coherence and discover recurring motifs across extended sequences.

The pianoroll visualizations below show generated sequences where relative attention enables the model to sustain musical structure across long contexts.
<img
  src="/src/assets/images/pianoroll1.png"
  alt="Generated sequence with relative attention - Example 1"
  class="border-0 shadow-none"
/>

<img
  src="/src/assets/images/pianoroll2.png"
  alt="Generated sequence with relative attention - Example 2"
  class="border-0 shadow-none"
/>


## Listen

Take a listen to some generated samples!

<figure>
  <audio controls>
    <source src="/src/assets/audio/adventure.mp3" type="audio/mp3">
    Your browser does not support the audio element.
  </audio>
  <figcaption>Call to Adventure</figcaption>
</figure>

<figure>
  <audio controls>
    <source src="/src/assets/audio/thriller.mp3" type="audio/mp3">
    Your browser does not support the audio element.
  </audio>
  <figcaption>A Thrilling Melody</figcaption>
</figure>

<figure>
  <audio controls>
    <source src="/src/assets/audio/excitement.mp3" type="audio/mp3">
    Your browser does not support the audio element.
  </audio>
  <figcaption>Waking Up</figcaption>
</figure>

<figure>
  <audio controls>
    <source src="/src/assets/audio/symbolic_conditioned.mp3" type="audio/mp3">
    Your browser does not support the audio element.
  </audio>
  <figcaption>Four-Part Chorale</figcaption>
</figure>

