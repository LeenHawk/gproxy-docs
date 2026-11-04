import type { APIRoute, GetStaticPaths } from 'astro';
import api from '../../../public/generated/openapi.json';
import config from '../../../public/generated/configuration.schema.json';
import channels from '../../../public/generated/channels.json';

export const prerender = true;
export const getStaticPaths: GetStaticPaths = () => [
  { params: { locale: undefined }, props: { lang: 'en' } },
  { params: { locale: 'zh-cn' }, props: { lang: 'zh-cn' } },
  { params: { locale: 'zh-tw' }, props: { lang: 'zh-tw' } },
  { params: { locale: 'ru' }, props: { lang: 'ru' } },
];
const documents = {
  ru: [['HTTP API и структуры запросов и ответов',api],['Схема конфигурации',config],['Каталог каналов',channels]],
  en: [['HTTP API and payload schemas',api],['Configuration schema',config],['Channel catalogue',channels]],
  'zh-cn': [['HTTP API 与请求响应结构',api],['配置结构',config],['渠道能力目录',channels]],
  'zh-tw': [['HTTP API 與請求回應結構',api],['設定結構',config],['通道能力目錄',channels]],
};
export const GET: APIRoute = ({ props }) => new Response([
  '# GPROXY',
  ...documents[props.lang as keyof typeof documents].map(([title,data]) => [
    `## ${title}`, '```json', JSON.stringify(data,null,2), '```',
  ].join('\n\n')),
].join('\n\n')+'\n', { headers: { 'Content-Type':'text/plain; charset=utf-8' } });
