# Sage Wiki

IntelliStream 团队知识库，通过 Git 协作维护。

在线访问：**[https://intellistream.github.io/sage-wiki](https://intellistream.github.io/sage-wiki)**

## 本地开发

```bash
npm install   # 安装依赖
npm start     # 启动开发服务器 (http://localhost:3000/sage-wiki/)
```

## 贡献内容

### 快速开始

1. Clone 仓库：`git clone https://github.com/intellistream/sage-wiki.git`
2. 在对应目录下创建 Markdown 文件（见下方目录说明）
3. 本地预览：`npm start`
4. 提交 PR 或直接 push

### 内容目录

| 目录 | 用途 | 示例 |
|------|------|------|
| `docs/achievements/` | 成果展示 | 项目里程碑、获奖记录、产出报告 |
| `docs/tutorials/` | 学习教程 | 技术入门、工具使用教程、最佳实践 |
| `docs/tech-notes/` | 技术心得 | 踩坑记录、源码分析、技术调研 |
| `docs/standards/` | 团队规范 | 代码规范、Git 工作流、Review 准则 |
| `docs/resources/` | 资源汇总 | 推荐书单、工具清单、常用链接 |
| `blog/` | 团队博客 | 周报、技术分享、团队动态 |

### 文件格式

每个 Markdown 文件开头使用 frontmatter 声明元数据：

```yaml
---
title: 文章标题
date: 2026-06-11
authors: [作者名]
tags: [标签1, 标签2]
---
```

## 自动部署

Push 到 `main` 分支后，GitHub Actions 自动构建并部署到 GitHub Pages。

## 技术栈

- [Docusaurus](https://docusaurus.io/) — React 静态站点生成器
- GitHub Pages — 托管
- GitHub Actions — CI/CD
