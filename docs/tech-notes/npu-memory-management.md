---
title: NPU 显存管理与调度策略
date: 2026-04-25
authors: [shuhao]
tags: [NPU, 显存管理, 调度]
sidebar_position: 2
---

# NPU 显存管理与调度策略

Ascend NPU 与 CUDA GPU 的运行时、内存分配和图执行路径不同。本文给出排查维度；设备容量和最优参数应从当前硬件及同负载实测中取得。

## NPU 显存架构

不同 Ascend 与 GPU 型号的 HBM 容量、带宽和可用配额不同，不能用单一标称规格代替当前宿主的实际可用显存。先用 `npu-smi info` 查看设备，再分别记录模型权重、KV Cache、激活和运行时预留。

### 显存分配策略

- **静态分配**：模型权重 + KV Cache 预分配
- **动态分配**：运行时按需分配 activation 内存
- `gpu_memory_utilization` 等预算参数的含义与有效范围由所用引擎版本决定；从低风险配置开始，结合加载、长上下文、并发和 OOM 实测调整，不给全平台通用的比例。

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
