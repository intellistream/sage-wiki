---
title: 推理系统 Benchmark 指南
date: 2026-03-28
authors: [shuhao]
tags: [Benchmark, 性能测试, 评估]
sidebar_position: 2
---

# 推理系统 Benchmark 指南

如何科学地评估 LLM 推理系统的性能。

## 核心指标

| 指标 | 定义 | 单位 |
|------|------|------|
| **Throughput** | 单位时间处理的请求数 | req/s |
| **TTFT** | Time To First Token | ms |
| **TBT** | Time Between Tokens | ms |
| **E2E Latency** | 端到端延迟 | ms |
| **Token Throughput** | 单位时间生成的 token 数 | tokens/s |

## Benchmark 工具

### vLLM Benchmark

```bash
python benchmarks/benchmark_serving.py \
    --model Qwen/Qwen2.5-7B \
    --dataset-name sharegpt \
    --num-prompts 100
```

### 自定义 Workload

使用团队开发的 workload 生成器：
- 支持多种请求分布（Poisson, bursty）
- 可配置 input/output 长度分布
- 详见 [常用工具清单](tools-and-frameworks.md)

## 实验设计

### 变量控制

- **独立变量**：batch size, 模型大小, TP 度, KV Cache 策略
- **控制变量**：固定硬件配置、输入长度分布
- **测量变量**：上述核心指标

### 统计方法

- 至少 3 次重复实验
- 报告 p50, p95, p99 延迟
- 包含置信区间

## NPU 特有考量

- Ascend NPU 需要 Docker 容器化运行
- Graph mode vs Eager mode 性能差异显著
- 详细环境配置参见 [Ascend NPU 环境搭建](../tutorials/ascend-npu-setup.md)

## 延伸阅读

- [LLM 推理入门](../tutorials/llm-inference-basics.md)
- [KV Cache 优化](../tech-notes/kv-cache-optimization.md)
- [分布式推理架构](../tech-notes/distributed-inference-patterns.md)
