---
title: KV Cache 优化技术详解
date: 2026-04-10
authors: [shuhao]
tags: [KV Cache, 推理优化, 内存管理]
sidebar_position: 1
---

# KV Cache 优化技术详解

KV Cache 是 LLM 推理的核心数据结构，存储注意力机制的 Key 和 Value 张量，避免 Decode 阶段的重复计算。本文深入分析 KV Cache 的主要优化技术。

## PagedAttention

vLLM 提出的 PagedAttention 将 KV Cache 按 **page** 粒度管理，类似操作系统的虚拟内存：
- 消除预分配导致的内存碎片
- 支持 Copy-on-Write 实现 beam search 等共享场景
- 显存利用率提升 2-4 倍

## Prefix Caching

当多个请求共享相同前缀（如 system prompt）时，可以复用已计算的 KV Cache：
- **RadixAttention** (SGLang)：基于 radix tree 的自动前缀匹配
- **Segment-level reuse**：按语义段粒度进行缓存匹配

## KV Cache 量化

将 FP16/BF16 的 KV Cache 压缩为 INT8 或 INT4：
- 显存占用降低 2-4 倍
- 需要关注精度损失对生成质量的影响
- 常用方案：KIVI、GEAR 等

## 分布式 KV Cache

在多卡推理场景下，KV Cache 的管理面临额外挑战：
- Tensor Parallelism 下每张卡持有部分 KV Cache
- 跨节点的 KV Cache 传输优化（参见 [分布式推理架构模式](distributed-inference-patterns.md)）

## 相关论文与项目

我们团队在 KV Cache 优化方面有多项研究成果：
- BidKV：双向 KV Cache 复用系统（详见 [SAGE 系统概述](../achievements/sage-system-overview.md)）
- FlowRAG：持续学习框架下的动态检索增强

## 实践建议

1. 始终监控 KV Cache 使用率，避免 OOM
2. 对于长上下文场景，优先考虑 prefix caching
3. NPU 平台上的显存管理细节参见 [NPU 显存管理](npu-memory-management.md)

## 延伸阅读

- [LLM 推理入门](../tutorials/llm-inference-basics.md)
- [Continuous Batching 技术笔记](continuous-batching-notes.md)
- [推理系统 Benchmark 指南](../resources/inference-benchmark-guide.md)
