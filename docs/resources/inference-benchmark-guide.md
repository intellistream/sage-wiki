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

### vLLM 在线服务 Benchmark

先在隔离环境启动相应版本的服务，再按该版本的 [`vllm bench serve` 文档](https://docs.vllm.ai/en/stable/cli/bench/serve/)选择后端、数据集、模型、请求速率及输入输出长度。下面的旧式 `benchmarks/benchmark_serving.py` 入口不应被当作当前通用命令；不要直接对共享生产服务施加负载。

```bash
vllm bench serve --help
```

### 自定义 Workload

如需自定义 workload，应保存可重放的数据集、到达过程和随机种子，并记录实际请求速率与输入/输出长度分布。不要只按生成器配置推断服务端实际收到的负载。

## 实验设计

### 变量控制

- **独立变量**：batch size, 模型大小, TP 度, KV Cache 策略
- **控制变量**：固定模型与精度、硬件与配额、输入/输出长度分布、到达过程、并发和正确性要求
- **测量变量**：上述核心指标

### 统计方法

- 分开记录冷启动与预热后稳态；至少重复多次并保留原始样本
- 报告成功率、拒绝率、p50/p95/p99 延迟、TTFT、每输出 token 间隔与吞吐
- 对比策略要使用相同的到达过程和有效输出预算；尾时延的置信区间应从请求级样本或重复试验估计

## NPU 特有考量

- Ascend 可以采用预构建容器或已配置的宿主环境，按兼容矩阵选择
- Graph 与 eager 的可用性及收益取决于模型、shape 和版本，须在相同 workload 下比较
- 详细环境配置参见 [Ascend NPU 环境搭建](../tutorials/ascend-npu-setup.md)

## 延伸阅读

- [LLM 推理入门](../tutorials/llm-inference-basics.md)
- [KV Cache 优化](../tech-notes/kv-cache-optimization.md)
- [分布式推理架构](../tech-notes/distributed-inference-patterns.md)
