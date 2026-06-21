---
title: Continuous Batching 技术笔记
date: 2026-05-18
authors: [shuhao]
tags: [Batching, 调度, 推理优化]
sidebar_position: 4
---

# Continuous Batching 技术笔记

Continuous Batching（也称为 iteration-level scheduling）是现代 LLM 推理引擎的核心调度策略。

## 原理

传统 static batching 需要等整个 batch 的所有请求都完成才能释放资源。Continuous batching 在 **每个 decode step** 后检查：
- 已完成的请求立即移出 batch，释放 KV Cache
- 等待队列中的新请求可以立即加入

## 实现要点

### 请求调度

```
while True:
    # 移除已完成的请求
    batch = [req for req in batch if not req.is_finished()]
    # 加入新请求
    while len(batch) < max_batch_size and waiting_queue:
        batch.append(waiting_queue.pop())
    # 执行一个 decode step
    batch = decode_step(batch)
```

### Preemption 策略

当显存不足时，需要抢占低优先级请求：
- **Swap**：将被抢占请求的 KV Cache 移到 CPU 内存
- **Recompute**：丢弃 KV Cache，恢复时重新 prefill

## 性能对比

| 策略 | 吞吐量提升 | 延迟影响 |
|------|-----------|---------|
| Static Batching | 1.0× | baseline |
| Continuous Batching | 2-5× | TTFT 降低 |
| + Chunked Prefill | 3-6× | TBT 更稳定 |

## 与 NPU 的适配

NPU 上 continuous batching 需要特别注意：
- Graph mode 下的 batch 大小变化处理
- HBM 带宽对 decode 步时间的影响
- 详见 [NPU 显存管理](npu-memory-management.md)

## 延伸阅读

- [KV Cache 优化技术](kv-cache-optimization.md)
- [分布式推理架构](distributed-inference-patterns.md)
- [LLM 推理入门](../tutorials/llm-inference-basics.md)
- [SAGE 系统概述](../achievements/sage-system-overview.md)
