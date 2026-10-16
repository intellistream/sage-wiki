---
title: 常用工具与框架清单
date: 2026-02-10
authors: [shuhao]
tags: [工具, 框架, 开发]
sidebar_position: 3
---

# 常用工具与框架清单

团队日常开发和推理系统研究中常用的工具和框架。

## 推理引擎

| 工具 | 用途 | 链接 |
|------|------|------|
| vLLM-HUST | 面向国产算力和研究实验的 vLLM 分支 | [vLLM-HUST](https://github.com/vLLM-HUST/vllm-hust) |
| vLLM-Ascend-HUST | 与 vLLM-HUST 配套的 Ascend NPU 插件分支 | [vLLM-Ascend-HUST](https://github.com/vLLM-HUST/vllm-ascend-hust) |
| 上游 vLLM-Ascend | 通用 Ascend 后端与版本兼容说明 | [官方文档](https://docs.vllm.ai/projects/ascend/en/latest/) |
| SGLang | 推理与结构化生成框架 | [SGLang](https://github.com/sgl-project/sglang) |

## 开发工具

- **Git**: 版本控制，团队规范参见 [代码 Review 规范](../standards/code-review-standards.md)
- **Docker**: 可用于容器化部署；是否使用取决于所选安装路径和宿主环境
- **tmux/screen**: 终端复用，适合较长的交互式开发任务

## 监控与调试

- **npu-smi**: NPU 状态监控
- **ascend-dmi**: 硬件诊断工具
- **torch.profiler**: PyTorch 性能分析

## 环境搭建

详细的安装步骤参见 [Ascend NPU 开发环境搭建](../tutorials/ascend-npu-setup.md)。

## 延伸阅读

- [推荐阅读与学习资源](recommended-reading.md)
- [推理系统 Benchmark 指南](inference-benchmark-guide.md)
- [LLM 推理入门](../tutorials/llm-inference-basics.md)
