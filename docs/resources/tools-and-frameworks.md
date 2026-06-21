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
| vLLM | 高吞吐 LLM 推理引擎 | github.com/VLLM-HUST/vllm-hust |
| vLLM-Ascend | vLLM 的 Ascend NPU 适配 | github.com/VLLM-HUST/vllm-ascend-hust |
| SGLang | 结构化生成引擎 | github.com/sgl-project/sglang |

## 开发工具

- **Git**: 版本控制，团队规范参见 [代码 Review 规范](../standards/code-review-standards.md)
- **Docker**: 容器化部署，NPU 开发必须在 Docker 中运行
- **tmux/screen**: 终端复用，长时间训练必备

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
