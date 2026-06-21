---
title: RAG 系统设计与实践
date: 2026-06-01
authors: [shuhao]
tags: [RAG, 检索增强, 知识库]
sidebar_position: 5
---

# RAG 系统设计与实践

Retrieval-Augmented Generation (RAG) 将检索系统与 LLM 生成结合，是当前知识问答的主流架构。

## RAG 架构

```
用户查询 → 向量检索(ANNS) → 上下文增强 → LLM 生成 → 回答
```

核心组件：
1. **Embedding 模型**：将文本转为向量表示
2. **向量索引**：ANNS (Approximate Nearest Neighbor Search) 索引
3. **Reranker**：对候选文档进行精排
4. **生成模型**：基于检索上下文生成回答

## 检索质量优化

### 混合检索

结合向量检索和关键词检索（BM25）的优势：
- 向量检索：语义匹配能力强
- BM25：精确匹配能力强
- 融合策略：Reciprocal Rank Fusion (RRF) 或线性加权

### Query 改写

- **HyDE**：让 LLM 先生成假设性答案，再用答案做检索
- **Query Expansion**：扩展查询词，提高召回率

### 链接结构增强

我们的研究探索了利用 wiki 内部链接结构来增强检索质量：
- ANNS 检索后进行 1-hop 链接扩展
- 利用 wiki 中人工策划的链接关系
- 在保持低延迟的同时提高召回率
- 详细设计参见 [Prompt Engineering 实践](../tutorials/prompt-engineering-guide.md)

## 与知识库系统的整合

RAG 系统通常需要一个高质量的知识库作为检索源：
- 结构化 wiki（如 Docusaurus）提供天然的组织结构
- 知识图谱方案（如 GraphRAG）增加了实体关系但成本高
- 轻量级方案利用现有链接结构，成本更低

## 延伸阅读

- [Prompt Engineering 指南](../tutorials/prompt-engineering-guide.md)
- [推荐阅读](recommended-reading.md)
- [知识库架构参考](../achievements/sage-system-overview.md)
