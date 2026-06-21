---
title: SAGE 系统概述与里程碑
date: 2026-06-15
authors: [shuhao]
tags: [SAGE, 系统, 里程碑]
sidebar_position: 1
---

# SAGE 系统概述与里程碑

SAGE (State-Aware Generative Engine) 是团队的核心系统项目，涵盖 LLM 推理优化、知识管理和智能助手等多个方向。

## 系统架构

SAGE 系统由以下核心模块组成：

### 推理引擎层

- **vLLM-HUST**: 基于 vLLM 的 Ascend NPU 适配推理引擎
- **BidKV**: 双向 KV Cache 复用系统，支持 prefix 和 suffix 缓存
- **FlowRAG**: 持续学习框架下的动态检索增强生成

### 知识管理层

- **NeuroMem**: 基于记忆网络的知识存储与检索
- **SAGE Faculty Twin**: 学术数字人助手，集成知识库与对话系统
- **Wiki-Link Retrieval**: 利用 wiki 链接结构增强检索质量

### 系统调度层

- **VAMOS**: 多推理实例的请求调度与资源管理
- **StreamFP**: 流式数据选择与持续学习

## 技术亮点

1. **PagedAttention 在 NPU 上的实现**：适配华为 Ascend 910B 的内存管理模型
2. **连续批处理调度**：支持动态请求加入和退出
3. **多层链接检索**：利用知识文档间的链接关系提升检索召回率

## 关键指标

| 指标 | 数值 | 对比基线 |
|------|------|----------|
| 推理吞吐 | 2.3× | vs vLLM baseline |
| KV Cache 命中率 | 68% | vs 单向缓存 |
| 检索 Recall@5 | +15% | vs 纯向量检索 |

## 延伸阅读

- [KV Cache 优化技术](../tech-notes/kv-cache-optimization.md)
- [分布式推理架构](../tech-notes/distributed-inference-patterns.md)
- [Continuous Batching](../tech-notes/continuous-batching-notes.md)
- [RAG 系统设计](../tech-notes/retrieval-augmented-generation.md)
- [LLM 推理入门](../tutorials/llm-inference-basics.md)
