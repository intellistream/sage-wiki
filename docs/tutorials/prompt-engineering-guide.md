---
title: Prompt Engineering 实践指南
date: 2026-05-22
authors: [shuhao]
tags: [Prompt, LLM, 工程实践]
sidebar_position: 3
---

# Prompt Engineering 实践指南

本文总结团队在 LLM 应用开发中的 Prompt Engineering 最佳实践。

## 核心原则

1. **明确角色**：在 system prompt 中定义清晰的身份和行为边界
2. **结构化输出**：使用 JSON/XML 格式约束输出
3. **Few-shot 示例**：提供 2-3 个高质量的输入-输出示例
4. **思维链 (CoT)**：引导模型展示推理过程

## System Prompt 设计

好的 system prompt 应包含：
- 身份定义：你是谁，你的专长是什么
- 行为准则：哪些可以做，哪些不可以做
- 输出格式：期望的回答格式和长度
- 安全策略：内容过滤和拒绝策略

详细翻译和模板参见 [Codebuddy CLI 提示词设计](../industry-docs/prompt-engineering-cb-cli.md)。

## RAG 场景下的 Prompt

在检索增强生成场景中，prompt 需要整合检索到的上下文：

```
基于以下参考资料回答用户问题：
{retrieved_context}

用户问题：{user_question}
```

注意事项：
- 上下文排序影响生成质量
- 过长的上下文可能导致 "lost in the middle" 现象
- 建议使用 [RAG 系统设计](../tech-notes/retrieval-augmented-generation.md) 中的检索优化策略

## 评估方法

Prompt 质量的评估维度：
- **准确性**：回答是否正确
- **完整性**：是否覆盖了问题的所有方面
- **一致性**：相同问题多次回答是否一致
- **安全性**：是否能正确拒绝不当请求

## 延伸阅读

- [Codebuddy CLI 提示词设计](../industry-docs/prompt-engineering-cb-cli.md)
- [LLM 推理入门](llm-inference-basics.md)
- [代码 Review 规范](../standards/code-review-standards.md)
