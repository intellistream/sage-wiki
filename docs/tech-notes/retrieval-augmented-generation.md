---
title: RAG 系统设计与实践
date: 2026-06-01
authors: [shuhao]
tags: [RAG, 检索增强, 知识库]
sidebar_position: 5
---

# RAG 系统设计与实践

Retrieval-Augmented Generation (RAG) 将检索系统与 LLM 生成结合，是知识问答的一类常见架构。是否需要 RAG，取决于知识更新频率、可追溯性、延迟与回答质量要求。

## RAG 架构

```
用户查询 → 候选召回（向量/关键词/混合）→ 可选精排 → 证据筛选 → LLM 生成 → 回答与引用
```

核心组件：
1. **Embedding 模型**：将文本转为向量表示
2. **向量索引**：ANNS (Approximate Nearest Neighbor Search) 索引
3. **Reranker（可选）**：对候选文档进行精排；是否启用应比较质量收益与额外时延
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

Wiki 链接可作为候选扩展信号，但不能直接视作相关性证据。可以比较“不扩展 / 1-hop 扩展 / 仅人工策划链接扩展”的 recall、误召回、端到端质量与时延；在有测量结果前，不应宣称链接扩展必然提高召回率或保持低延迟。实验设计参见 [Benchmark 指南](../resources/inference-benchmark-guide.md)。

## 与知识库系统的整合

RAG 系统通常需要一个高质量的知识库作为检索源：
- 结构化 wiki（如 Docusaurus）提供天然的组织结构
- 知识图谱方案（如 GraphRAG）增加了实体关系但成本高
- 轻量级方案利用现有链接结构，成本更低

## 延伸阅读

- [Prompt Engineering 指南](../tutorials/prompt-engineering-guide.md)
- [推荐阅读](../resources/recommended-reading.md)
- [知识库架构参考](../achievements/sage-system-overview.md)
