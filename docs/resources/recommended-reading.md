---
title: 推荐阅读与学习资源
date: 2026-01-15
authors: [shuhao]
tags: [阅读, 学习, 资源]
sidebar_position: 1
---

# 推荐阅读与学习资源

团队精选的 LLM 推理与系统方向必读论文和学习资源。

## 推理系统核心论文

| 论文 | 年份 | 关键词 | 推荐理由 |
|------|------|--------|----------|
| Efficient Memory Management for Large Language Model Serving with PagedAttention | 2023 | vLLM, PagedAttention | 推理引擎奠基之作 |
| Orca: A Distributed Serving System for Transformer-Based Generative Models | 2022 | Continuous Batching | 调度策略开创性工作 |
| SGLang: Efficient Execution of Structured Language Model Programs | 2024 | RadixAttention | 结构化生成与链接缓存 |

## KV Cache 优化

- **KIVI**: A Tuning-Free Asymmetric 2bit Quantization for KV Cache (2024)
- **GearKV**: High-Performance KV Cache Compression with Gear (2024)
- 实践笔记参见 [KV Cache 优化详解](../tech-notes/kv-cache-optimization.md)

## 分布式系统

- **Megatron-LM**: Training Multi-Billion Parameter Language Models Using Model Parallelism (2019)
- **Alpa**: Automating Inter- and Intra-Operator Parallelism (2022)
- 架构总结参见 [分布式推理架构模式](../tech-notes/distributed-inference-patterns.md)

## 推理引擎入门

- [LLM 推理入门教程](../tutorials/llm-inference-basics.md)
- [Ascend NPU 开发指南](../tutorials/ascend-npu-setup.md)

## 代码质量

- [代码 Review 规范](../standards/code-review-standards.md)
- [常用工具清单](tools-and-frameworks.md)
