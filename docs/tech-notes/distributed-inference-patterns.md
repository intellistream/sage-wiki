---
title: 分布式推理架构模式
date: 2026-05-05
authors: [shuhao]
tags: [分布式, 架构, Tensor Parallelism]
sidebar_position: 3
---

# 分布式推理架构模式

当模型参数量超过单卡显存容量时，需要采用分布式推理策略。本文总结主流的分布式推理架构模式。

## Tensor Parallelism (TP)

将模型权重切分到多张卡上，每张卡持有部分参数：
- **优点**：延迟低，适合推理场景
- **缺点**：需要高速互联（NVLink/HCCS），通常限制在单机内
- vLLM 通过 `--tensor-parallel-size` 参数控制 TP 度

### TP 在 NPU 上的实现

Ascend 910B 使用 HCCS 互联，TP=4 是推荐的并行度。注意事项：
- 确保所有 NPU 在同一 HCCS ring 内
- KV Cache 分布在每张卡上，总容量为单卡 × TP 数
- 显存管理详见 [NPU 显存管理](npu-memory-management.md)

## Pipeline Parallelism (PP)

按模型层切分，不同卡负责不同层：
- 适合跨节点部署
- 存在 pipeline bubble，需要 micro-batching 缓解

## Data Parallelism (DP)

每张卡持有完整模型副本，独立处理不同请求：
- 简单但显存效率低
- 适合小模型高吞吐场景

## KV Cache 跨节点传输

在 PP 或多节点 TP 场景下，KV Cache 的跨节点传输成为瓶颈：
- 使用 RDMA/RoCE 降低传输延迟
- Prefix caching 可减少传输量（参见 [KV Cache 优化](kv-cache-optimization.md)）

## 实际部署案例

我们团队的 SAGE 系统采用了多种并行策略的组合，详见 [SAGE 系统概述](../achievements/sage-system-overview.md)。

## 延伸阅读

- [LLM 推理入门](../tutorials/llm-inference-basics.md)
- [Continuous Batching 技术笔记](continuous-batching-notes.md)
- [推理系统 Benchmark 指南](../resources/inference-benchmark-guide.md)
