---
title: NPU 显存管理与调度策略
date: 2026-04-25
authors: [shuhao]
tags: [NPU, 显存管理, 调度]
sidebar_position: 2
---

# NPU 显存管理与调度策略

华为 Ascend NPU 的显存管理与 CUDA GPU 有显著差异。本文总结团队在 NPU 推理实践中积累的显存管理经验。

## NPU 显存架构

Ascend 910B3 配备 64 GB HBM，显存带宽约 1.5 TB/s。相比 NVIDIA A100 (80 GB, 2 TB/s)，带宽较低但容量相当。

### 显存分配策略

- **静态分配**：模型权重 + KV Cache 预分配
- **动态分配**：运行时按需分配 activation 内存
- `gpu_memory_utilization` 参数控制 KV Cache 预分配比例（推荐 0.85-0.92）

## 调度优化

### Continuous Batching

与传统 static batching 不同，continuous batching 允许：
- 新请求随时加入正在运行的 batch
- 完成的请求立即释放显存
- 详细实现参见 [Continuous Batching 技术笔记](continuous-batching-notes.md)

### Chunked Prefill

将长 prompt 的 prefill 切分为多个 chunk，与 decode 交替执行：
- 避免单次 prefill 占用过多显存
- 减少 decode 请求的排队延迟

## 常见 OOM 场景与解决方案

| 场景 | 原因 | 解决方案 |
|------|------|----------|
| 长上下文 | KV Cache 超出显存 | 降低 max_model_len 或启用 KV Cache 量化 |
| 高并发 | 过多活跃请求 | 限制 max_num_seqs |
| 大模型 | 权重过大 | 增加 TP 并行度 |

## 与推理系统的关系

NPU 显存管理是推理系统设计的核心环节，与 [KV Cache 优化](kv-cache-optimization.md) 和 [分布式推理架构](distributed-inference-patterns.md) 密切相关。

环境搭建请参考 [Ascend NPU 开发环境搭建](../tutorials/ascend-npu-setup.md)。
