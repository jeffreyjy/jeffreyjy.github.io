---
title: EtherCAT is Cool
author: Jeffrey Yang
pubDatetime: 2026-07-29T17:00:00.000Z
slug: ethercat-is-cool
featured: false
draft: false
tags:
  - update
  - ethercat
description: Updates on my internship at ASM.
---

Part of my work at ASM this summer involves EtherCAT. I'm building a troubleshooting screen that helps operators diagnose EtherCAT hardware issues on the tool — things like device states, port states, wiring faults, etc.

## EtherCAT

EtherCAT (Ethernet for Control Automation Technology) is an Ethernet-based communication protocol for industrial automation. It lets hundreds of synchronized devices work together to run a process quickly and deterministically.

An EtherCAT network has one **master** and many **slaves**. The master is the controller that owns the network: it initiates all communication, and the slaves respond. Slaves are the field devices themselves, daisy-chained together, and each one processes data as it passes through. The master always knows the exact order of devices on the network, which is a big part of why fault localization is even possible.

![EtherCAT network topology](@/assets/images/ethercat-topology.jpg)

EtherCAT runs on standard Ethernet frames. The master sends one frame that travels through every slave in the chain. Each slave reads the data addressed to it and writes its own data into the frame as it passes through. The frame makes it to the end of the chain and comes back to the master with everyone's data on board.

There are two main ways data moves on an EtherCAT network:

- **Process data (PDO) communication** is the cyclic, real-time exchange. Every cycle, the master sends outputs (setpoints, commands) and collects inputs (sensor readings, status) from all slaves. This is the fast path that keeps the machine running.
- **SDO (Service Data Object) communication** is acyclic, on-demand messaging. It's used for things like reading and writing device configuration parameters — data that doesn't need to be exchanged every cycle.

## What I'm Doing

A single machine can have a network of hundreds of EtherCAT devices. When something goes wrong it becomes difficult to diagnose the issue out of all these devices. My work at ASM centers around surfacing live device information to a diagnostics screen to decrease troubleshooting time from days to hours and ultimately lower tool downtime.

I'm working on pulling that information live from a running network and surfacing it through the software stack to present to the frontend for display.

I look forward to learning more!