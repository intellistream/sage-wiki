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

vLLM 提出的 PagedAttention 将 KV Cache 按 **block** 粒度管理，借鉴虚拟内存的映射思路：
- 减少连续预留带来的浪费和碎片，而不是消除所有碎片
- 支持 Copy-on-Write 实现 beam search 等共享场景
- 可用容量和吞吐收益取决于序列长度、批量及实现，应在目标负载上测量

## Prefix Caching

当多个请求共享相同前缀（如 system prompt）时，可以复用已计算的 KV Cache：
- **RadixAttention** (SGLang)：基于 radix tree 的自动前缀匹配
- 跨请求复用必须保证 token 序列、位置、模型与缓存有效性条件一致；仅凭“语义相似”不能复用 KV

## KV Cache 量化

将 FP16/BF16 的 KV Cache 压缩为 INT8 或 INT4：
- 理论张量字节数随位宽降低，实际显存节省还取决于元数据、分组尺度和后端实现
- 需要关注精度损失对生成质量的影响
- 常用方案：KIVI、GEAR 等

## 分布式 KV Cache

在多卡推理场景下，KV Cache 的管理面临额外挑战：
- Tensor Parallelism 下每张卡持有部分 KV Cache
- 跨节点的 KV Cache 传输优化（参见 [分布式推理架构模式](distributed-inference-patterns.md)）

## 相关论文与项目

团队关于推理状态管理的公开研究以[系统研究概览](../achievements/sage-system-overview.md)及其中的项目、论文链接为准。FlowRAG 研究动态检索器更新，不是 KV Cache 优化算法；不要把两者的收益混写。

## 实践建议

1. 始终监控 KV Cache 使用率，避免 OOM
2. 对于长上下文场景，先分析重复前缀比例、缓存容量和失效条件，再决定 prefix caching 是否值得开启
3. NPU 平台上的显存管理细节参见 [NPU 显存管理](npu-memory-management.md)

## 延伸阅读

- [LLM 推理入门](../tutorials/llm-inference-basics.md)
- [Continuous Batching 技术笔记](continuous-batching-notes.md)
- [推理系统 Benchmark 指南](../resources/inference-benchmark-guide.md)
