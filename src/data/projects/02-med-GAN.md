---
title: MedGAN
author: Jeffrey Yang
featured: true
draft: false
tags:
  - machine-learning
  - computer-vision
  - generative-ai
description: Medical Imaging GAN with Federated Learning.
githubUrl: https://github.com/jeffreyjy/cse291a-group11-final-project
techStack:
  - Python
  - PyTorch
---



## Overview

Conditional Generative Adversarial Networks (cGANs) are powerful tools for medical image generation because they enable controlled synthesis of images conditioned on clinically relevant labels, such as disease presence. This capability is valuable for data augmentation and research, especially in domains where labeled medical data is scarce.<br><br>

However, standard cGAN training requires a centralized dataset of sensitive patient data, creating privacy concerns. This project combines cGANs with federated learning, allowing institutions to jointly train a medical image generator by sharing model updates rather than raw data, preserving privacy while maintaining image quality. 




## Chest X-Rays

All models were trained on the [Chest X-Ray Dataset](https://www.kaggle.com/datasets/paultimothymooney/chest-xray-pneumonia), to generate synthetic X-Ray images conditioned on HEALTHY vs PNEUMONIA labels.<br><br>

Check out some samples below:

<figure>
    <figcaption style="text-align: center; width: 100%;">Real vs Generated Healthy Chest X-Rays</figcaption>
  <img
    src="/assets/images/HEALTHY.png"
    alt="Real vs Generated Healthy Chest X-Rays"
    class="border-0 shadow-none"
  />
</figure> <br>

<figure>
    <figcaption style="text-align: center; width: 100%;">Real vs Generated Pneumonia Chest X-Rays</figcaption>
  <img
    src="/assets/images/PNEUMONIA.png"
    alt="Real vs Generated Pneumonia Chest X-Rays"
    class="border-0 shadow-none"
  />
</figure> <br>

Generated images are virtually identical to real X-Rays, even under federated conditions!