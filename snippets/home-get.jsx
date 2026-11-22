/**
 * Download entry at the top of the home page: a button named after the
 * visitor's platform, the one-line install command, and links to the other
 * ways of running GPROXY. The button opens the download page, which picks the
 * package. Everything lives inside the component because Mintlify snippets
 * only support named exports.
 */
export const HomeGet = ({ locale = 'en' }) => {
  const prefix = locale === 'en' ? '' : `/${locale.toLowerCase()}`;

  const COPY = {
    en: {
      download: 'Download GPROXY',
      downloadFor: (os) => `Download for ${os}`,
      start: 'Quick start',
      terminal: 'Or install the CLI from a terminal:',
      all: 'All platforms',
      containers: 'Container images',
      upgrade: 'Upgrading from v3',
      label: 'Download and install',
    },
    'zh-CN': {
      download: '下载 GPROXY',
      downloadFor: (os) => `下载 ${os} 版`,
      start: '快速开始',
      terminal: '或者在终端里安装 CLI：',
      all: '全部平台',
      containers: '容器镜像',
      upgrade: '从 v3 升级',
      label: '下载与安装',
    },
    'zh-TW': {
      download: '下載 GPROXY',
      downloadFor: (os) => `下載 ${os} 版`,
      start: '快速開始',
      terminal: '或者在終端機裡安裝 CLI：',
      all: '全部平台',
      containers: '容器映像',
      upgrade: '從 v3 升級',
      label: '下載與安裝',
    },
    ru: {
      download: 'Скачать GPROXY',
      downloadFor: (os) => `Скачать для ${os}`,
      start: 'Быстрый старт',
      terminal: 'Или установите CLI из терминала:',
      all: 'Все платформы',
      containers: 'Образы контейнеров',
      upgrade: 'Переход с v3',
      label: 'Загрузка и установка',
    },
  };
  const copy = COPY[locale] ?? COPY.en;

  const OS_NAMES = { windows: 'Windows', macos: 'macOS', linux: 'Linux', android: 'Android', ohos: 'OpenHarmony' };
  const UNIX = 'curl -fsSL https://gproxy.leenhawk.com/install.sh | sh';
  const WINDOWS = 'irm https://gproxy.leenhawk.com/install.ps1 | iex';

  const detect = () => {
    if (typeof navigator === 'undefined') return null;
    const ua = navigator.userAgent;
    const platform = (navigator.userAgentData?.platform ?? navigator.platform ?? '').toLowerCase();
    if (/openharmony|harmonyos/i.test(ua)) return 'ohos';
    if (/android/i.test(ua)) return 'android';
    if (/iphone|ipad/i.test(ua)) return null;
    if (platform.startsWith('win') || /windows/i.test(ua)) return 'windows';
    if (platform.startsWith('mac') || /macintosh/i.test(ua)) return 'macos';
    if (platform.includes('linux') || /linux/i.test(ua)) return 'linux';
    return null;
  };

  // Detected after mount so the server-rendered markup matches the first paint.
  const [os, setOs] = useState(null);
  const [copied, setCopied] = useState(false);
  useEffect(() => { setOs(detect()); }, []);

  // HarmonyOS uses the application download.
  const command = os === 'windows' ? WINDOWS : os === 'ohos' ? null : UNIX;
  const copyCommand = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard access denied; the command stays selectable.
    }
  };

  return (
    <section className="gp-home not-prose" aria-label={copy.label} data-locale={locale}>
      <div className="gh-cta">
        <a className="gh-btn" href={`${prefix}/download`}>
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M8 2v8.5M4.5 7 8 10.5 11.5 7M2.5 13.5h11" /></svg>
          <span>{os ? copy.downloadFor(OS_NAMES[os]) : copy.download}</span>
        </a>
        <a className="gh-btn gh-btn--ghost" href={`${prefix}/getting-started/quick-start`}>{copy.start}</a>
      </div>
      {command ? (
        <div className="gh-term">
          <p>{copy.terminal}</p>
          <div className="gh-code">
            <pre><code>{command}</code></pre>
            <button type="button" onClick={copyCommand} aria-label="Copy" title="Copy">
              {copied ? (
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 8.5 6.5 12 13 4.5" /></svg>
              ) : (
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" aria-hidden="true"><rect x="5.5" y="5.5" width="8" height="8" rx="1.5" /><path d="M10.5 5.5v-2a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2" /></svg>
              )}
            </button>
          </div>
        </div>
      ) : null}
      <p className="gh-meta">
        <a href={`${prefix}/download`}>{copy.all}</a>
        <span aria-hidden="true">·</span>
        <a href={`${prefix}/deployment/containers`}>{copy.containers}</a>
        <span aria-hidden="true">·</span>
        <a href={`${prefix}/deployment/v3-to-v4`}>{copy.upgrade}</a>
      </p>
    </section>
  );
};
