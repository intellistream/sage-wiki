---
title: Ascend NPU 开发环境搭建指南
date: 2026-02-20
authors: [shuhao]
tags: [NPU, Ascend, 环境搭建]
sidebar_position: 2
---

# Ascend NPU 开发环境搭建指南

本文提供 Ascend NPU 推理环境的核对流程，不再给出一组容易过期的固定依赖版本。实际安装前，应以目标设备、驱动和所选引擎版本对应的兼容矩阵为准。

## 硬件要求

- 先运行 `npu-smi info`，确认设备型号、可用 HBM、驱动及可分配设备；不同型号与配置不可混为一谈。
- 并行度由模型规模、单卡可用容量、设备互联和目标负载决定，不存在通用的“四卡推荐值”。在共享宿主上先确认设备归属，不要占用他人的 NPU。

## 软件栈安装

1. 从 [vLLM-Ascend 版本兼容矩阵](https://docs.vllm.ai/projects/ascend/en/latest/community/versioning_policy.html)选择一整组相容的 vLLM、插件、Python、CANN、PyTorch 与 torch-npu 版本，不要跨行拼接。预构建镜像和现有 CANN 环境是两条不同安装路径，按[官方安装指南](https://docs.vllm.ai/projects/ascend/en/latest/installation.html)选择其一。
2. 使用团队分支时，成对核对 [vLLM-HUST](https://github.com/vLLM-HUST/vllm-hust) 和 [vLLM-Ascend-HUST](https://github.com/vLLM-HUST/vllm-ascend-hust) 的版本与安装说明；不要把 HUST 插件接到未经核对的上游核心版本。
3. 在启动推理服务前验证设备与 Python 导入。以下命令只做只读检查，不能代替模型加载和真实请求验收：

```bash
npu-smi info
python -c 'import torch, torch_npu, vllm; print(torch.__version__, torch_npu.__version__, vllm.__version__)'
```

## 常见问题

- **设备或动态库无法识别**：检查 CANN/ATB 环境脚本是否与安装路径匹配；参见[官方 FAQ](https://docs.vllm.ai/projects/ascend/en/latest/faqs.html)。不要在共享宿主上覆盖全局环境变量或驱动。
- **Graph 与 eager**：支持范围和性能因引擎版本、模型及 shape 而异。两者都应通过真实请求和同负载 benchmark 验证，不能把一种模式写成普遍禁止。

## 相关资源

- [LLM 推理入门](llm-inference-basics.md)
- [NPU 显存管理与调度](../tech-notes/npu-memory-management.md)
- [常用工具与框架清单](../resources/tools-and-frameworks.md)
