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

传统静态批处理通常按整批安排工作，短请求可能被长请求拖住。Continuous batching 在调度边界重新检查活跃请求；具体边界和执行方式因引擎而异：
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

## 性能验证

Continuous batching 和 chunked prefill 并没有跨模型、硬件与负载通用的加速倍数。比较时同时固定请求到达过程、输入/输出长度、并发和正确性，报告吞吐、TTFT、每输出 token 间隔、尾时延及拒绝率；chunked prefill 也可能改变 prefill 与 decode 的资源竞争。

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
