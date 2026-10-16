import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  description: ReactNode;
  emoji: string;
  href: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: '开始一个研究课题',
    emoji: '🏆',
    description: '从问题定义、论文阅读到基线复现，明确每一步需要交付的证据。',
    href: '/sage-wiki/docs/tutorials/research-start/',
  },
  {
    title: '理解推理系统',
    emoji: '📚',
    description: '沿着调度、KV Cache、并行与状态管理建立知识地图。',
    href: '/sage-wiki/docs/resources/inference-systems-reading-path/',
  },
  {
    title: '验收一个模型服务',
    emoji: '💡',
    description: '检查流式结束、真实工具调用、长上下文、检索和并发，不只看 HTTP 200。',
    href: '/sage-wiki/docs/tutorials/serving-acceptance/',
  },
  {
    title: '维护可信知识库',
    emoji: '📋',
    description: '管理来源、更新、删除、索引与引用，区分知识过期和检索失败。',
    href: '/sage-wiki/docs/tutorials/knowledge-maintenance/',
  },
  {
    title: '设计可信实验',
    emoji: '🔗',
    description: '固定负载与对照，分别报告吞吐、延迟、正确性和适用边界。',
    href: '/sage-wiki/docs/resources/inference-benchmark-guide/',
  },
  {
    title: '贡献与更新知识',
    emoji: '✍️',
    description: '写清问题、步骤、验收、限制和公开来源，让文档能持续维护。',
    href: '/sage-wiki/docs/standards/wiki-contribution/',
  },
];

function Feature({title, description, emoji, href}: FeatureItem) {
  return (
    <div className={clsx('col col--4', styles.feature)}>
      <a href={href} className={styles.featureLink}>
        <div className="text--center">
          <span className={styles.featureEmoji}>{emoji}</span>
        </div>
        <div className="text--center padding-horiz--md">
          <Heading as="h3">{title}</Heading>
          <p>{description}</p>
        </div>
      </a>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <Heading as="h2">按目标阅读</Heading>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
