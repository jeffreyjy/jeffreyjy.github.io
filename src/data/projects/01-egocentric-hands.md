---
title: Egocentric 3D Hand Pose Estimation
author: Jeffrey Yang
featured: true
draft: false
tags:
  - machine-learning
  - deep-learning
  - computer-vision
description: 3D hand pose from first-person video, and what backbone choice does to generalization.
githubUrl: https://github.com/BJKin/Egocentric-3D-Hand-Pose-Estimation
techStack:
  - Python
  - PyTorch
  - PyTorch3D
  - timm
---

## Overview

Egocentric 3D hand pose estimation recovers the full 3D pose of both hands from a first-person camera, the kind mounted on AR/VR headsets and smart glasses. It is a hard version of the problem: hands sit close to the lens, get occluded by the objects they manipulate, and appear under heavy perspective distortion.<br><br>

Building on the [WildHands](https://ap229997.github.io/projects/hands/) method, I built a two-stream hand-pose pipeline and ran a controlled study of how the visual backbone affects accuracy, and more importantly, how well the model generalizes to cameras and scenes it never trained on.

## A Camera-Aware Pipeline

The pipeline reasons about the physical camera setup rather than pixels alone. Each hand is cropped and resized to a fixed scale, its angular position within the camera's field of view is injected back into the network as an intrinsics-aware positional encoding (KPE), and the model regresses a [MANO](https://mano.is.tue.mpg.de/) parametric hand mesh so every prediction is an anatomically valid hand.

## Backbone Ablation

Holding that pipeline fixed, I swapped in eight backbones spanning classic CNNs, efficient CNNs, modern ConvNets, and vision transformers. One of them is [Wave-ViT](https://arxiv.org/abs/2207.04978), a wavelet-based transformer that downsamples with an invertible wavelet transform instead of pooling, preserving the high-frequency edge detail that distinguishes a bent finger from a straight one.

## Results

<figure>
  <img
    src="/assets/images/egocentric-hands.png"
    alt="Predicted hand meshes across in-distribution and zero-shot datasets"
    class="border-0 shadow-none"
    style="width: 70%"
  />
  <figcaption style="text-align: center; width: 100%;">Predictions on in-distribution (top) and unseen zero-shot (bottom) datasets</figcaption>
</figure>

In distribution, the models reach 34.1 mm mean joint error. The more interesting result is out of distribution: the smallest backbones generalized best, cutting error up to 61% over the baseline, while the largest generalized worst. For egocentric hand pose, architectural fit matters more than raw model scale.
