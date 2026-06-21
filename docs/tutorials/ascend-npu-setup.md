---
title: Ascend NPU 开发环境搭建指南
date: 2026-02-20
authors: [shuhao]
tags: [NPU, Ascend, 环境搭建]
sidebar_position: 2
---

# Ascend NPU 开发环境搭建指南

本文介绍如何在华为 Ascend 910B NPU 上搭建 LLM 推理开发环境。

## 硬件要求

- Ascend 910B3 NPU（64 GB HBM）
- 推荐 4 卡配置用于 Tensor Parallelism

## 软件栈安装

### 1. CANN Toolkit

```bash
# 下载并安装 CANN toolkit
./Ascend-cann-toolkit_8.0.RC1_linux-aarch64.run --install
source /usr/local/Ascend/ascend-toolkit/set_env.sh
```

### 2. PyTorch + torch_npu

```bash
pip install torch==2.1.0
pip install torch_npu==2.1.0
```

### 3. vLLM-Ascend

基于 vLLM 的 Ascend 适配版本，详见 [vLLM-HUST 项目](https://github.com/intellistream/vllm-hust)。

## 常见问题

- **环境变量**：`set_env.sh` 和 `LD_LIBRARY_PATH` 必须同时设置
- **Graph Mode**：Ascend 910B3 上禁止使用 `--enforce-eager`，需使用 graph mode 以获得最佳性能

## 相关资源

- [LLM 推理入门](llm-inference-basics.md)
- [NPU 显存管理与调度](../tech-notes/npu-memory-management.md)
- [常用工具与框架清单](../resources/tools-and-frameworks.md)
