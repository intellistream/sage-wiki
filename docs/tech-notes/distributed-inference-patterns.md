---
title: 分布式推理架构模式
date: 2026-05-05
authors: [shuhao]
tags: [分布式, 架构, Tensor Parallelism]
sidebar_position: 3
---

# 分布式推理架构模式

当模型参数量超过单卡显存容量时，需要采用分布式推理策略。本文总结主流的分布式推理架构模式。

## Tensor Parallelism (TP)

将模型权重切分到多张卡上，每张卡持有部分参数：
- **适用条件**：单卡放不下模型，或经过实测可用多卡计算换取更好的时延/吞吐
- **代价**：层内通信随并行度增加；跨节点 TP 是否值得取决于互联、模型与 batch
- vLLM 通过 `--tensor-parallel-size` 参数控制 TP 度

### TP 在 NPU 上的实现

Ascend 的设备互联与可用拓扑依具体宿主而定，不能给所有模型固定 TP=4。注意事项：
- 先核对设备拓扑、配额和集体通信能否在所选卡组正常运行
- KV Cache 的分片与复制方式由注意力结构和并行实现决定，不能简单按单卡容量乘 TP 数估算可用上下文
- 显存管理详见 [NPU 显存管理](npu-memory-management.md)

## Pipeline Parallelism (PP)

按模型层切分，不同卡负责不同层：
- 适合跨节点部署
- 存在 pipeline bubble，需要 micro-batching 缓解

## Data Parallelism (DP)

每张卡持有完整模型副本，独立处理不同请求：
- 简单但显存效率低
- 适合小模型高吞吐场景

## KV Cache 跨节点传输

在 prefill/decode 分离或状态迁移场景，KV Cache 可能需要跨节点传输；普通 PP/TP 的主要跨节点代价也可能是激活或集合通信，不应一概称为“KV 传输瓶颈”。应测量传输量、互联带宽、同步等待与端到端时延，再评估 RDMA/RoCE 等路径。

## 实际部署案例

团队当前公开的系统定位与项目入口参见[系统研究概览](../achievements/sage-system-overview.md)；具体部署拓扑会变化，不在这篇通用笔记里固定写死。

## 延伸阅读

- [LLM 推理入门](../tutorials/llm-inference-basics.md)
- [Continuous Batching 技术笔记](continuous-batching-notes.md)
- [推理系统 Benchmark 指南](../resources/inference-benchmark-guide.md)
