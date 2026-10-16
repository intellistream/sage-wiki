---
title: LLM 推理入门——从 Prefill 到 Decode
date: 2026-03-15
authors: [shuhao]
tags: [LLM, 推理, 入门]
sidebar_position: 1
---

# LLM 推理入门——从 Prefill 到 Decode

本文介绍大语言模型（LLM）推理的两个核心阶段：**Prefill**（预填充）和 **Decode**（解码），帮助团队成员快速理解推理系统的基本架构。

## Prefill 阶段

Prefill 阶段处理输入 prompt 中的 token，为各注意力层生成可供后续解码使用的 KV Cache。它通常更容易利用设备并行计算，但是否受算力限制仍取决于模型、输入长度、批量和后端实现。

关键优化方向包括：
- **Chunked Prefill**：将长 prompt 切分为多个 chunk，避免单次计算量过大
- **Prefix Caching**：复用已有 KV Cache，避免重复计算（详见 [KV Cache 优化技术详解](../tech-notes/kv-cache-optimization.md)）

## Decode 阶段

自回归 Decode 通常每轮为每个活跃序列生成一个 token，并读取已有 KV Cache。小批量时常受权重与状态访存约束；批量、上下文长度和硬件变化后，瓶颈也可能改变。

优化策略包括：
- **Speculative Decoding**：用小模型预测多个 token，大模型一次验证
- **Continuous Batching**：动态合并不同请求的 decode 步骤（参考 [Continuous Batching 技术笔记](../tech-notes/continuous-batching-notes.md)）

## 硬件选择

推理性能与硬件密切相关。相关工作覆盖 Ascend NPU 和 GPU；Ascend 环境的版本匹配与准备参见 [Ascend NPU 开发环境搭建](../tutorials/ascend-npu-setup.md)。

## 性能评估

推理系统的性能评估需要关注多个维度：吞吐量、延迟、首 token 延迟（TTFT）等。详细的 benchmark 方法参见 [推理系统 Benchmark 指南](../resources/inference-benchmark-guide.md)。

## 延伸阅读

- [KV Cache 优化技术详解](../tech-notes/kv-cache-optimization.md)
- [分布式推理架构模式](../tech-notes/distributed-inference-patterns.md)
- [推荐阅读与学习资源](../resources/recommended-reading.md)
