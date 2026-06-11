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
    title: '成果展示',
    emoji: '🏆',
    description: '项目里程碑、技术产出、获奖记录，记录团队的每一步成长。',
    href: '/sage-wiki/docs/achievements/',
  },
  {
    title: '学习教程',
    emoji: '📚',
    description: '技术入门、工具使用教程和最佳实践，帮助新人快速上手。',
    href: '/sage-wiki/docs/tutorials/',
  },
  {
    title: '技术心得',
    emoji: '💡',
    description: '踩坑记录、源码分析、技术调研，沉淀团队的技术积累。',
    href: '/sage-wiki/docs/tech-notes/',
  },
  {
    title: '团队规范',
    emoji: '📋',
    description: '代码规范、工作流程、Review 准则，统一团队的协作方式。',
    href: '/sage-wiki/docs/standards/',
  },
  {
    title: '资源汇总',
    emoji: '🔗',
    description: '推荐书单、工具清单、常用链接，整合优质外部资源。',
    href: '/sage-wiki/docs/resources/',
  },
  {
    title: '团队博客',
    emoji: '✍️',
    description: '周报、技术分享、团队动态，记录团队的思考和故事。',
    href: '/sage-wiki/blog',
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
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
