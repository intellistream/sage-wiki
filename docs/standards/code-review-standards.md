---
title: 代码 Review 规范
date: 2026-01-20
authors: [shuhao]
tags: [规范, Review, 代码质量]
sidebar_position: 1
---

# 代码 Review 规范

团队代码 Review 的标准流程和质量要求。

## Review 流程

1. **提交 PR**：每个功能一个 PR，包含清晰的描述
2. **自动检查**：CI 运行 lint、类型检查、单元测试
3. **人工 Review**：至少一位 reviewer approve
4. **合并策略**：Squash merge，保持主分支整洁

## Review 检查清单

### 代码质量

- [ ] 命名清晰，无魔法数字
- [ ] 函数职责单一，不超过 50 行
- [ ] 必要的错误处理和日志
- [ ] 无硬编码的配置值

### 测试覆盖

- [ ] 核心逻辑有单元测试
- [ ] 边界条件有测试覆盖
- [ ] 测试可以在离线环境运行（不下载模型）

### 文档

- [ ] 公共 API 有 docstring
- [ ] 复杂算法有注释说明
- [ ] 变更影响有 CHANGELOG 条目

## Prompt Engineering 相关

编写 AI 辅助代码时，需要特别注意：
- 审查 LLM 生成的代码是否引入了安全漏洞
- 验证生成的代码逻辑是否正确
- 详细实践参见 [Prompt Engineering 指南](../tutorials/prompt-engineering-guide.md)

## 延伸阅读

- [常用工具与框架](../resources/tools-and-frameworks.md)
- [推荐阅读](../resources/recommended-reading.md)
