/**
 * Download page: shared package catalog; source-specific release metadata is
 * loaded in the browser. Ported from the Starlight DownloadPage.astro.
 * Everything lives inside the component because Mintlify snippets only
 * support named exports.
 */
export const DownloadPage = ({ locale = 'en' }) => {
  const REPO = 'https://github.com/LeenHawk/gproxy';
  const LATEST = `${REPO}/releases/latest`;
  const prefix = locale === 'en' ? '' : `/${locale.toLowerCase()}`;

  const downloadSources = {
    github: {
      label: 'GitHub',
      releases: 'https://github.com/LeenHawk/gproxy/releases',
      latest: 'https://github.com/LeenHawk/gproxy/releases/latest',
      nightly: 'https://github.com/LeenHawk/gproxy/releases/tag/nightly',
    },
    cnb: {
      label: 'CNB',
      releases: 'https://cnb.cool/LeenHawk/gproxy/-/releases',
      latest: 'https://cnb.cool/LeenHawk/gproxy/-/releases',
      nightly: 'https://cnb.cool/LeenHawk/gproxy/-/releases/nightly',
    },
    gitlab: {
      label: 'GitLab',
      releases: 'https://gitlab.com/leenhawk1/gproxy/-/releases',
      latest: 'https://gitlab.com/leenhawk1/gproxy/-/releases',
      nightly: 'https://gitlab.com/leenhawk1/gproxy/-/releases/nightly',
    },
  };

  const GP_DL_COPY = {
    ru: {
      "eyebrow": "Загрузка",
      "title": "Скачать GPROXY",
      "lede": "Единый шлюз для ваших LLM-провайдеров. Выберите приложение, CLI, контейнер или облачное развёртывание. Все сборки входят в один подписанный выпуск.",
      "latest": "Последний выпуск",
      "loading": "Получение сведений о выпуске…",
      "released": "выпущено",
      "downloadSource": "Источник загрузки",
      "offline": "Не удалось получить сведения о выпуске из этого источника. Ссылки ниже ведут на страницу выпусков; можно выбрать другой источник.",
      "notes": "Примечания к выпуску",
      "allReleases": "Все выпуски",
      "nightly": "Сборки для разработки",
      "forYou": "Для этого устройства",
      "forYouHint": "Определено по браузеру. Если платформа выбрана неверно, выберите другую ниже.",
      "app": "Приложение",
      "cli": "CLI",
      "appHint": "Мастер настройки, значок в трее, запуск при входе в систему.",
      "cliHint": "Один исполняемый файл для серверов и терминалов.",
      "headless": "CLI без интерфейса",
      "headlessHint": "Только прокси и API управления, без веб-консоли. Для CI и небольших хостов.",
      "alpineKey": "Ключ подписи Alpine",
      "alpineGuide": "Установка в Alpine",
      "platforms": "Все платформы",
      "verify": "Проверка загруженных файлов",
      "verifyBody": "Каждый выпуск содержит SHA256SUMS и подписанный manifest.json. CLI и приложение проверяют одну и ту же подпись Ed25519 перед самообновлением; ключи подписи хранятся только в процессе выпуска.",
      "sums": "SHA256SUMS",
      "manifest": "manifest.json",
      "container": "Контейнеры",
      "containerBody": "Образы для amd64, arm64 и riscv64 доступны в Docker Hub (gproxy2/gproxy), GitHub, GitLab и CNB. Стабильные версии используют теги vX.Y.Z, бета-версии — staging, сборки для разработки — nightly.",
      "containerGuide": "Руководство по контейнерам",
      "hosted": "Облачные платформы",
      "hostedBody": "Разверните GPROXY на Cloudflare Workers, Netlify или Vercel без локальной среды сборки, с D1, libSQL или PostgreSQL.",
      "hostedGuide": "Облачное развёртывание",
      "source": "Сборка из исходного кода",
      "sourceBody": "Обычный cargo build создаёт CLI. Для приложения и версии без интерфейса предусмотрены отдельные короткие инструкции.",
      "sourceGuide": "Сборка из исходного кода",
      "next": "Установили? Далее:",
      "nextLink": "Быстрый старт",
      "upgrade": "Переходите с v3? Прочитайте",
      "upgradeLink": "руководство по миграции",
      "store": "Также в Microsoft Store",
      "storeDesktop": "GPROXY Desktop",
      "storeCli": "GPROXY CLI",
      "fdroid": "Приложение также доступно в F-Droid",
      "scoop": "Также через Scoop",
      "winget": "Через WinGet (Microsoft Store)",
      "quick": "Установка одной командой",
      "quickBody": "Устанавливает CLI и помогает настроить базу данных, администратора и прокси. Приложение с графическим интерфейсом можно скачать ниже.",
      "quickUnix": "Linux · macOS · Termux",
      "quickWindows": "Windows PowerShell",
      "quickMore": "Установка без вопросов",
      "quickMoreBody": "Добавьте -y и нужные параметры для установки без запросов. Запустите скрипт с --help, чтобы увидеть все параметры.",
      "setup": "После установки",
      "setupApp": "Приложение",
      "setupAppBody": "Откройте GPROXY. Мастер запросит порт, каталог данных, имя и пароль администратора, а также необязательную конфигурацию для импорта. Сохраните показанные в конце адрес и ключ API.",
      "setupCli": "CLI",
      "setupCliBody": "Если использовали установочный скрипт, запустите GPROXY указанной им командой. Иначе выполните команду ниже. Затем откройте консоль в браузере и войдите. Новый экземпляр показывает пароль администратора и ключ API только один раз — сохраните их.",
      "arch": {
          "x86_64": "x86_64",
          "aarch64": "ARM64",
          "riscv64": "RISC-V 64"
      },
      "os": {
          "linux": {
              "name": "Linux",
              "hint": "Сборки GNU подходят большинству дистрибутивов. Для musl доступны пакеты Alpine APK (apk-tools 3; сначала импортируйте ключ подписи). CLI статический; приложению нужны GTK/WebKitGTK из Alpine edge."
          },
          "windows": {
              "name": "Windows",
              "hint": "ZIP не требует установщика. Файлы MSIX предназначены для подачи в магазин и могут ещё не иметь подписи Microsoft."
          },
          "macos": {
              "name": "macOS",
              "hint": "Для Apple Silicon выберите ARM64. Приложения имеют подпись ad-hoc, без нотариализации; при первом запуске разрешите их в системных настройках."
          },
          "android": {
              "name": "Android",
              "hint": "Приложение распространяется как APK. CLI работает в Termux: установите DEB через apt или распакуйте ZIP и следуйте TERMUX.txt."
          },
          "ohos": {
              "name": "OpenHarmony / HarmonyOS NEXT",
              "hint": "CLI в ZIP для ARM64 и x86_64. HAP экспериментальный и требует собственной подписи. Фоновая работа зависит от устройства, профиля подписи и выданных разрешений."
          }
      }
  },
    en: {
      eyebrow: 'Download',
      title: 'Get GPROXY',
      lede: 'One gateway in front of every LLM provider. Pick the desktop Application, the headless-capable CLI, a container image, or a hosted deployment — every build ships from the same signed release.',
      latest: 'Latest release',
      loading: 'Reading the latest release…',
      released: 'released',
      downloadSource: 'Download source',
      offline: 'Could not load this source’s release details. The links below open its releases page; you can also choose another source.',
      notes: 'Release notes',
      allReleases: 'All releases',
      nightly: 'Nightly builds',
      forYou: 'Recommended for this device',
      forYouHint: 'Detected from your browser. Choose another platform below if this is wrong.',
      app: 'Application',
      cli: 'CLI',
      appHint: 'Graphical setup, tray icon, launch at login.',
      cliHint: 'A single binary for servers and terminals.',
      headless: 'Headless CLI',
      headlessHint: 'No web console; proxy and management APIs only. For CI runners and tiny hosts.',
      alpineKey: 'Alpine signing key',
      alpineGuide: 'Alpine installation',
      platforms: 'All platforms',
      verify: 'Verify what you downloaded',
      verifyBody: 'Every release attaches a SHA256SUMS file and a signed manifest.json. The CLI and Application verify the same Ed25519 signature before self-updating; signing keys live only in the release pipeline.',
      sums: 'SHA256SUMS',
      manifest: 'manifest.json',
      container: 'Containers',
      containerBody: 'Images on Docker Hub (gproxy2/gproxy), GitHub, GitLab and CNB registries for amd64, arm64 and riscv64. Stable versions use vX.Y.Z tags; beta is staging and development snapshots are nightly.',
      containerGuide: 'Container guide',
      hosted: 'Hosted platforms',
      hostedBody: 'Deploy to Cloudflare Workers, Netlify or Vercel without a local toolchain, with D1, libSQL or PostgreSQL behind it.',
      hostedGuide: 'Hosted deployments',
      source: 'Build from source',
      sourceBody: 'A plain cargo build produces the CLI; the Application and the headless edition each have a short recipe.',
      sourceGuide: 'Building from source',
      next: 'Installed? Continue with',
      nextLink: 'Quick start',
      upgrade: 'Upgrading from v3? Read the',
      upgradeLink: 'migration guide',
      store: 'Also on the Microsoft Store',
      storeDesktop: 'GPROXY Desktop',
      storeCli: 'GPROXY CLI',
      fdroid: 'The Application is also on F-Droid',
      scoop: 'Also with Scoop',
      winget: 'With WinGet (Microsoft Store)',
      quick: 'One-line install',
      quickBody: 'Installs the CLI for this computer and walks you through the database, administrator account and proxy. For the desktop Application, download it below.',
      quickUnix: 'Linux · macOS · Termux',
      quickWindows: 'Windows PowerShell',
      quickMore: 'Skip the questions',
      quickMoreBody: 'Add -y and any options to install without prompts. Run the script with --help to see them all.',
      setup: 'After installing',
      setupApp: 'Application',
      setupAppBody: 'Open GPROXY. A short wizard asks for the port and data folder, an administrator name and password, and an optional configuration to import. Keep the address and API key it shows at the end.',
      setupCli: 'CLI',
      setupCliBody: 'If you used the one-line installer, start GPROXY with the command it printed. Otherwise run the command below. Then open the console in your browser and sign in. A new instance prints its administrator password and API key once, so save them.',
      arch: { x86_64: 'x86_64', aarch64: 'ARM64', riscv64: 'RISC-V 64' },
      os: {
        linux: { name: 'Linux', hint: 'GNU builds suit most distributions. musl builds offer Alpine APKs (apk-tools 3; import the signing key first). The CLI is static; the Application needs Alpine edge GTK/WebKitGTK.' },
        windows: { name: 'Windows', hint: 'ZIP needs no installer. MSIX attachments are Store submission packages and may not yet carry a Microsoft signature.' },
        macos: { name: 'macOS', hint: 'Choose ARM64 for Apple Silicon. Apps are ad-hoc signed and not notarized; allow them in System Settings on first launch.' },
        android: { name: 'Android', hint: 'The Application is an APK. The CLI runs inside Termux: install the DEB with apt, or unpack the ZIP and follow TERMUX.txt.' },
        ohos: { name: 'OpenHarmony / HarmonyOS NEXT', hint: 'CLI ZIPs for ARM64 and x86_64. The HAP is experimental, needs your own signature and has no background service.' },
      },
    },
    'zh-CN': {
      eyebrow: '下载',
      title: '获取 GPROXY',
      lede: '一个网关，接入所有大模型服务商。选择桌面应用、可无头运行的 CLI、容器镜像或托管部署——所有构建都来自同一份签名发布。',
      latest: '最新版本',
      loading: '正在读取最新版本…',
      released: '发布于',
      downloadSource: '下载源',
      offline: '无法读取此下载源的版本信息。下方链接将打开该源的发布页面，也可切换其他下载源。',
      notes: '版本说明',
      allReleases: '全部版本',
      nightly: '每日构建',
      forYou: '为这台设备推荐',
      forYouHint: '根据浏览器检测得到。若不正确，请在下方选择其他平台。',
      app: '应用版',
      cli: 'CLI',
      appHint: '图形化设置、托盘图标、开机自启。',
      cliHint: '单一可执行文件，适合服务器与终端。',
      headless: '无头 CLI',
      headlessHint: '不含 Web 控制台，只保留代理与管理 API。适合 CI 运行器和小型主机。',
      alpineKey: 'Alpine 签名公钥',
      alpineGuide: 'Alpine 安装说明',
      platforms: '全部平台',
      verify: '校验下载内容',
      verifyBody: '每个版本都附带 SHA256SUMS 和已签名的 manifest.json。CLI 与应用版在自更新前会校验同一份 Ed25519 签名；签名私钥只存在于发布流水线中。',
      sums: 'SHA256SUMS',
      manifest: 'manifest.json',
      container: '容器',
      containerBody: '镜像发布在 Docker Hub（gproxy2/gproxy）、GitHub、GitLab 与 CNB 镜像仓库，支持 amd64、arm64、riscv64。稳定版使用 vX.Y.Z 标签，beta 为 staging，开发快照为 nightly。',
      containerGuide: '容器部署指南',
      hosted: '托管平台',
      hostedBody: '无需本地工具链即可部署到 Cloudflare Workers、Netlify 或 Vercel，后端可选 D1、libSQL 或 PostgreSQL。',
      hostedGuide: '托管平台部署',
      source: '从源码构建',
      sourceBody: '一条 cargo build 即可得到 CLI；应用版与无头版各有简短的构建步骤。',
      sourceGuide: '从源码构建',
      next: '安装完成？接着阅读',
      nextLink: '快速开始',
      upgrade: '从 v3 升级？请先阅读',
      upgradeLink: '迁移说明',
      store: '也可从 Microsoft Store 获取',
      storeDesktop: 'GPROXY Desktop',
      storeCli: 'GPROXY CLI',
      fdroid: 'Application 也可从 F-Droid 安装',
      scoop: '也可通过 Scoop 安装',
      winget: '通过 WinGet 安装（Microsoft Store）',
      quick: '一键安装',
      quickBody: '为本机安装 CLI，并引导你设置数据库、管理员账户和代理。需要桌面应用版请在下方下载。',
      quickUnix: 'Linux · macOS · Termux',
      quickWindows: 'Windows PowerShell',
      quickMore: '跳过提问',
      quickMoreBody: '加上 -y 和需要的参数即可无提示安装，用 --help 查看全部参数。',
      setup: '安装之后',
      setupApp: '应用版',
      setupAppBody: '打开 GPROXY，简短的设置向导会依次询问端口和数据目录、管理员用户名和密码，以及是否导入已有配置。请记下最后显示的地址和 API 密钥。',
      setupCli: 'CLI',
      setupCliBody: '用一键安装的话，按脚本最后打印的命令启动即可；否则运行下面的命令。然后在浏览器打开控制台登录。新实例只会打印一次管理员密码和 API 密钥，请妥善保存。',
      arch: { x86_64: 'x86_64', aarch64: 'ARM64', riscv64: 'RISC-V 64' },
      os: {
        linux: { name: 'Linux', hint: 'GNU 构建适用于大多数发行版。musl 版提供 Alpine APK 包（需要 apk-tools 3，先导入签名公钥）。CLI 为静态链接；应用版依赖 Alpine edge 的 GTK/WebKitGTK。' },
        windows: { name: 'Windows', hint: 'ZIP 无需安装器。MSIX 附件为商店提交包，可能尚未带有 Microsoft 签名。' },
        macos: { name: 'macOS', hint: 'Apple Silicon 请选 ARM64。应用为 ad-hoc 签名、未公证，首次启动需在系统设置中允许。' },
        android: { name: 'Android', hint: '应用版为 APK。CLI 在 Termux 中运行：用 apt 安装 DEB，或解压 ZIP 并按 TERMUX.txt 操作。' },
        ohos: { name: 'OpenHarmony / HarmonyOS NEXT', hint: '提供 ARM64 与 x86_64 的 CLI ZIP。HAP 为实验性，需自行签名，且没有后台服务。' },
      },
    },
    'zh-TW': {
      eyebrow: '下載',
      title: '取得 GPROXY',
      lede: '一個閘道，接入所有大型語言模型服務商。選擇桌面應用、可無頭執行的 CLI、容器映像或託管部署——所有建置都來自同一份簽章發布。',
      latest: '最新版本',
      loading: '正在讀取最新版本…',
      released: '發布於',
      downloadSource: '下載來源',
      offline: '無法讀取此來源的版本資訊。下方連結將開啟該來源的發布頁面，也可切換其他下載來源。',
      notes: '版本說明',
      allReleases: '全部版本',
      nightly: '每日建置',
      forYou: '為這台裝置推薦',
      forYouHint: '依瀏覽器偵測而得。若不正確，請在下方選擇其他平台。',
      app: '應用版',
      cli: 'CLI',
      appHint: '圖形化設定、系統匣圖示、開機自動啟動。',
      cliHint: '單一可執行檔，適合伺服器與終端機。',
      headless: '無頭 CLI',
      headlessHint: '不含 Web 控制台，只保留代理與管理 API。適合 CI 執行器和小型主機。',
      alpineKey: 'Alpine 簽章公鑰',
      alpineGuide: 'Alpine 安裝說明',
      platforms: '全部平台',
      verify: '驗證下載內容',
      verifyBody: '每個版本都附帶 SHA256SUMS 與已簽章的 manifest.json。CLI 與應用版在自我更新前會驗證同一份 Ed25519 簽章；簽章私鑰只存在於發布流水線中。',
      sums: 'SHA256SUMS',
      manifest: 'manifest.json',
      container: '容器',
      containerBody: '映像發布在 Docker Hub（gproxy2/gproxy）、GitHub、GitLab 與 CNB 映像倉庫，支援 amd64、arm64、riscv64。穩定版使用 vX.Y.Z 標籤，beta 為 staging，開發快照為 nightly。',
      containerGuide: '容器部署指南',
      hosted: '託管平台',
      hostedBody: '無需本機工具鏈即可部署到 Cloudflare Workers、Netlify 或 Vercel，後端可選 D1、libSQL 或 PostgreSQL。',
      hostedGuide: '託管平台部署',
      source: '從原始碼建置',
      sourceBody: '一條 cargo build 即可得到 CLI；應用版與無頭版各有簡短的建置步驟。',
      sourceGuide: '從原始碼建置',
      next: '安裝完成？接著閱讀',
      nextLink: '快速開始',
      upgrade: '從 v3 升級？請先閱讀',
      upgradeLink: '遷移說明',
      store: '也可從 Microsoft Store 取得',
      storeDesktop: 'GPROXY Desktop',
      storeCli: 'GPROXY CLI',
      fdroid: 'Application 也可從 F-Droid 安裝',
      scoop: '也可透過 Scoop 安裝',
      winget: '透過 WinGet 安裝（Microsoft Store）',
      quick: '一鍵安裝',
      quickBody: '為本機安裝 CLI，並引導你設定資料庫、管理員帳戶和代理。需要桌面應用版請在下方下載。',
      quickUnix: 'Linux · macOS · Termux',
      quickWindows: 'Windows PowerShell',
      quickMore: '略過提問',
      quickMoreBody: '加上 -y 和需要的參數即可無提示安裝，以 --help 查看全部參數。',
      setup: '安裝之後',
      setupApp: '應用版',
      setupAppBody: '開啟 GPROXY，簡短的設定精靈會依序詢問埠和資料目錄、管理員使用者名稱和密碼，以及是否匯入既有設定。請記下最後顯示的位址和 API 金鑰。',
      setupCli: 'CLI',
      setupCliBody: '使用一鍵安裝的話，依腳本最後列印的指令啟動即可；否則執行下方指令。接著在瀏覽器開啟控制台登入。新實例只會列印一次管理員密碼和 API 金鑰，請妥善保存。',
      arch: { x86_64: 'x86_64', aarch64: 'ARM64', riscv64: 'RISC-V 64' },
      os: {
        linux: { name: 'Linux', hint: 'GNU 建置適用於大多數發行版。musl 版提供 Alpine APK 套件（需要 apk-tools 3，先匯入簽章公鑰）。CLI 為靜態連結；應用版依賴 Alpine edge 的 GTK/WebKitGTK。' },
        windows: { name: 'Windows', hint: 'ZIP 無需安裝程式。MSIX 附件為商店提交套件，可能尚未帶有 Microsoft 簽章。' },
        macos: { name: 'macOS', hint: 'Apple Silicon 請選 ARM64。應用為 ad-hoc 簽章、未公證，首次啟動需在系統設定中允許。' },
        android: { name: 'Android', hint: '應用版為 APK。CLI 在 Termux 中執行：用 apt 安裝 DEB，或解壓 ZIP 並依 TERMUX.txt 操作。' },
        ohos: { name: 'OpenHarmony / HarmonyOS NEXT', hint: '提供 ARM64 與 x86_64 的 CLI ZIP。HAP 為實驗性，需自行簽章，且沒有背景服務。' },
      },
    },
  };

  const copy = GP_DL_COPY[locale] ?? GP_DL_COPY.en;

  const linuxRows = ['x86_64', 'aarch64', 'riscv64'].flatMap((arch) => [
    { arch, variant: 'GNU', app: [{ asset: `gproxy-tauri-linux-${arch}.zip`, label: 'ZIP' }, { asset: `gproxy-tauri-linux-${arch}.deb`, label: 'DEB' }], cli: [{ asset: `gproxy-linux-${arch}.zip`, label: 'ZIP' }, { asset: `gproxy-linux-${arch}.deb`, label: 'DEB' }] },
    { arch, variant: 'musl', app: [{ asset: `gproxy-tauri-linux-${arch}-musl.zip`, label: 'ZIP' }, { asset: `gproxy-tauri-linux-${arch}-musl.apk`, label: 'Alpine APK' }], cli: [{ asset: `gproxy-linux-${arch}-musl.zip`, label: 'ZIP' }, { asset: `gproxy-linux-${arch}-musl.apk`, label: 'Alpine APK' }] },
  ]);
  const platforms = [
    { id: 'linux', rows: linuxRows },
    { id: 'windows', store: true, scoop: true, rows: ['x86_64', 'aarch64'].map((arch) => ({ arch, app: [{ asset: `gproxy-tauri-windows-${arch}.zip`, label: 'ZIP' }, { asset: `gproxy-tauri-windows-${arch}.msix`, label: 'MSIX' }], cli: [{ asset: `gproxy-windows-${arch}.zip`, label: 'ZIP' }, { asset: `gproxy-windows-${arch}.msix`, label: 'MSIX' }] })) },
    { id: 'macos', rows: ['aarch64', 'x86_64'].map((arch) => ({ arch, app: [{ asset: `gproxy-tauri-macos-${arch}.dmg`, label: 'DMG' }, { asset: `gproxy-tauri-macos-${arch}.zip`, label: 'ZIP' }], cli: [{ asset: `gproxy-macos-${arch}.zip`, label: 'ZIP' }, { asset: `gproxy-macos-${arch}.dmg`, label: 'DMG' }] })) },
    { id: 'android', fdroid: true, rows: ['aarch64', 'x86_64'].map((arch) => ({ arch, app: [{ asset: `gproxy-tauri-android-${arch}.apk`, label: 'APK' }], cli: [{ asset: `gproxy-android-${arch}.deb`, label: 'Termux DEB' }, { asset: `gproxy-android-${arch}.zip`, label: 'ZIP' }] })) },
    { id: 'ohos', rows: ['aarch64', 'x86_64'].map((arch) => ({ arch, app: [{ asset: `gproxy-tauri-ohos-${arch}-unsigned.hap`, label: 'HAP' }], cli: [{ asset: `gproxy-ohos-${arch}.zip`, label: 'ZIP' }] })) },
  ];
  // Two independently stacked columns: a grid row would size Linux's neighbours
  // to whichever side is taller and leave a gap on the other.
  const columns = [['linux', 'ohos'], ['windows', 'macos', 'android']].map((ids) =>
    ids.map((id) => platforms.find((platform) => platform.id === id)),
  );
  const headless = [
    ...['x86_64', 'aarch64', 'riscv64'].flatMap((arch) => [`gproxy-headless-linux-${arch}.zip`, `gproxy-headless-linux-${arch}-musl.zip`, `gproxy-headless-linux-${arch}-musl.apk`]),
    'gproxy-headless-windows-x86_64.zip', 'gproxy-headless-windows-aarch64.zip',
    'gproxy-headless-macos-aarch64.zip', 'gproxy-headless-macos-x86_64.zip',
    'gproxy-headless-android-aarch64.zip', 'gproxy-headless-android-x86_64.zip',
  ];
  const headlessLabel = (asset) => asset.replace(/^gproxy-headless-/, '').replace(/\.zip$/, '').replace(/\.apk$/, ' · Alpine APK');

  const detect = () => {
    if (typeof navigator === 'undefined') return null;
    const ua = navigator.userAgent;
    const platform = (navigator.userAgentData?.platform ?? navigator.platform ?? '').toLowerCase();
    const arm = /aarch64|arm64|armv8/i.test(ua);
    if (/openharmony|harmonyos/i.test(ua)) return { os: 'ohos', arch: arm ? 'aarch64' : 'x86_64' };
    if (/android/i.test(ua)) return { os: 'android', arch: /x86_64|x64/i.test(ua) ? 'x86_64' : 'aarch64' };
    if (/iphone|ipad/i.test(ua)) return null;
    if (platform.startsWith('win') || /windows/i.test(ua)) return { os: 'windows', arch: arm ? 'aarch64' : 'x86_64' };
    // Safari on Apple Silicon reports an Intel platform string; prefer ARM64
    // and let the table offer the other.
    if (platform.startsWith('mac') || /macintosh/i.test(ua)) return { os: 'macos', arch: 'aarch64' };
    if (platform.includes('linux') || /linux/i.test(ua)) return { os: 'linux', arch: arm ? 'aarch64' : /riscv/i.test(ua) ? 'riscv64' : 'x86_64' };
    return null;
  };

  const human = (bytes) => bytes >= 1 << 30 ? `${(bytes / (1 << 30)).toFixed(1)} GB` : bytes >= 1 << 20 ? `${(bytes / (1 << 20)).toFixed(1)} MB` : `${Math.round(bytes / 1024)} KB`;

  const loadRelease = async (source, signal) => {
    const json = async (url) => {
      const response = await fetch(url, { signal });
      if (!response.ok) throw new Error(`Release request failed: ${response.status}`);
      return response.json();
    };
    if (source === 'github') {
      return json('https://api.github.com/repos/LeenHawk/gproxy/releases/latest');
    }
    const base = downloadSources[source].releases;
    // The moving "release" tag contains only the manifest, not the packages.
    const gitlabApi = 'https://gitlab.com/api/v4/projects/leenhawk1%2Fgproxy/releases';
    // CNB's public metadata is unavailable to the browser; use GitLab's mirror
    // for the version and package catalog while keeping CNB download URLs.
    const pointer = await json(`${gitlabApi}/release`);
    const manifestUrl = pointer.assets.links.find((asset) => asset.name === 'manifest.json')?.url;
    if (!manifestUrl) throw new Error('Missing release manifest');
    const manifest = await json(manifestUrl);
    const tag = `v${manifest.version}`;
    const encodedTag = encodeURIComponent(tag);
    const release = await json(`${gitlabApi}/${encodedTag}`);
    // Release links carry no size; read it from the generic package the links
    // point into. Sizes are cosmetic, so a failure only hides them.
    const sizes = new Map();
    try {
      const packageVersion = release.assets.links[0]?.url.match(/\/packages\/generic\/gproxy\/([^/]+)\//)?.[1];
      const projectApi = gitlabApi.replace(/\/releases$/, '');
      const [pkg] = await json(`${projectApi}/packages?package_type=generic&package_name=gproxy&package_version=${packageVersion}`);
      for (let page = 1; page; ) {
        const response = await fetch(`${projectApi}/packages/${pkg.id}/package_files?per_page=100&page=${page}`, { signal });
        if (!response.ok) break;
        for (const file of await response.json()) sizes.set(file.file_name, file.size);
        page = Number(response.headers.get('X-Next-Page')) || 0;
      }
    } catch (error) {
      if (signal.aborted) throw error;
    }
    return {
      tag_name: tag,
      html_url: `${base}/${encodedTag}`,
      published_at: release.released_at,
      assets: release.assets.links.map((asset) => ({
        name: asset.name,
        size: sizes.get(asset.name),
        browser_download_url: source === 'cnb'
          ? `${base}/download/${encodedTag}/${encodeURIComponent(asset.name)}`
          : asset.direct_asset_url,
      })),
    };
  };

  const [source, setSource] = useState(null);
  // { status: 'loading' | 'ready' | 'offline', release?: object }
  const [state, setState] = useState({ status: 'loading' });
  const [guess, setGuess] = useState(null);

  // Initial source from ?source=, and the device guess, are browser-only.
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get('source');
    setSource(requested === 'cnb' || requested === 'gitlab' ? requested : 'github');
    setGuess(detect());
  }, []);

  useEffect(() => {
    if (!source) return undefined;
    const controller = new AbortController();
    let current = true;
    // Reset immediately so links and metadata from the previous source never linger.
    setState({ status: 'loading' });
    const timeout = setTimeout(() => controller.abort(), 10000);
    loadRelease(source, controller.signal)
      .then((release) => { if (current) setState({ status: 'ready', release }); })
      .catch(() => { if (current) setState({ status: 'offline' }); })
      .finally(() => clearTimeout(timeout));
    return () => {
      current = false;
      clearTimeout(timeout);
      controller.abort();
    };
  }, [source]);

  const config = downloadSources[source ?? 'github'];
  const release = state.status === 'ready' ? state.release : null;
  const byName = useMemo(
    () => new Map((release?.assets ?? []).map((asset) => [asset.name, asset])),
    [release],
  );

  const selectSource = (event, id) => {
    // Preserve open-in-new-tab and no-JavaScript links to each host's releases.
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    const url = new URL(window.location.href);
    url.searchParams.set('source', id);
    window.history.replaceState(window.history.state, '', url);
    setSource(id);
  };

  const assetHref = (name) => byName.get(name)?.browser_download_url ?? config.latest;
  const assetClass = (name) => (release && !byName.has(name) ? 'dl-asset dl-asset--missing' : 'dl-asset');
  const assetSize = (name) => {
    const size = byName.get(name)?.size;
    return size === undefined ? '' : human(size);
  };
  const asset = (name, label, tag, withTitle = true) => (
    <a key={name} className={assetClass(name)} href={assetHref(name)} title={withTitle ? name : undefined}>
      {label}{tag ? <small>{tag}</small> : null}<span className="dl-size">{assetSize(name)}</span>
    </a>
  );

  let releasedDate = copy.loading;
  if (state.status === 'offline') releasedDate = '';
  if (release) {
    const when = new Date(release.published_at);
    const released = { ru: 'выпущено ', en: 'released ', 'zh-CN': '发布于 ', 'zh-TW': '發布於 ' }[locale] ?? '';
    releasedDate = Number.isNaN(when.getTime()) ? '' : `${released}${new Intl.DateTimeFormat(locale, { dateStyle: 'long' }).format(when)}`;
  }
  const version = release ? release.tag_name : state.status === 'offline' ? '—' : '…';

  // First match in catalog order: the rows put the preferred package first
  // (GNU before musl, DMG before ZIP, APK, ZIP before MSIX).
  let forYou = null;
  if (release && guess) {
    const platform = platforms.find((p) => p.id === guess.os);
    const names = (platform?.rows ?? []).flatMap((row) => [...row.app, ...row.cli].map((pkg) => pkg.asset)).filter((name) => byName.has(name));
    const app = names.find((name) => name.startsWith(`gproxy-tauri-${guess.os}-${guess.arch}`));
    const cli = names.find((name) => name.startsWith(`gproxy-${guess.os}-${guess.arch}`));
    if (app || cli) forYou = { app, cli };
  }

  return (
    <div className="gp-download dl not-prose" data-locale={locale}>
      <header className="dl-hero">
        <p className="dl-eyebrow">{copy.eyebrow}</p>
        <h1 className="dl-title">{copy.title}</h1>
        <p className="dl-lede">{copy.lede}</p>
        <nav className="dl-sources" aria-label={copy.downloadSource}>
          <span>{copy.downloadSource}</span>
          <div className="dl-source-options">
            {Object.entries(downloadSources).map(([id, item]) => (
              <a key={id} href={item.latest} aria-current={id === (source ?? 'github') ? 'true' : undefined} onClick={(event) => selectSource(event, id)}>{item.label}</a>
            ))}
          </div>
        </nav>
        <div className="dl-release" aria-live="polite">
          <span className="dl-pill"><span className="dl-dot" aria-hidden="true"></span><span className="dl-label">{copy.latest}</span> <strong>{version}</strong></span>
          <span className="dl-date">{releasedDate}</span>
          <a className="dl-link" href={release ? release.html_url : config.latest}>{copy.notes} ↗</a>
          <a className="dl-link" href={config.releases}>{copy.allReleases}</a>
          <a className="dl-link" href={config.nightly}>{copy.nightly}</a>
        </div>
        {state.status === 'offline' ? <p className="dl-offline">{copy.offline}</p> : null}
      </header>

      <section className="dl-quick">
        <article className="dl-card">
          <header className="dl-card-head">
            <h2>{copy.quick}</h2>
            <p>{copy.quickBody}</p>
          </header>
          <div className="dl-quick-cmds">
            <div>
              <h3>{copy.quickUnix}</h3>
              <pre className="dl-code"><code>curl -fsSL https://gproxy.leenhawk.com/install.sh | sh</code></pre>
            </div>
            <div>
              <h3>{copy.quickWindows}</h3>
              <pre className="dl-code"><code>irm https://gproxy.leenhawk.com/install.ps1 | iex</code></pre>
            </div>
          </div>
          <details className="dl-details">
            <summary>{copy.quickMore}</summary>
            <p>{copy.quickMoreBody}</p>
            <pre className="dl-code"><code>curl -fsSL https://gproxy.leenhawk.com/install.sh | sh -s -- -y --edition headless --proxy http://127.0.0.1:7890</code></pre>
            <pre className="dl-code"><code>{'& ([scriptblock]::Create((irm https://gproxy.leenhawk.com/install.ps1))) -Yes -Edition headless'}</code></pre>
          </details>
        </article>
      </section>

      {forYou && guess ? (
        <section className="dl-foryou">
          <div className="dl-foryou-head">
            <h2>{copy.forYou}</h2>
            <p>{copy.forYouHint} <span className="dl-mono">{`${guess.os} · ${guess.arch}`}</span></p>
          </div>
          <div className="dl-foryou-cards">
            {forYou.app ? (
              <a className="dl-primary" href={assetHref(forYou.app)}>
                <span className="dl-primary-kind">{copy.app}</span>
                <span className="dl-primary-name">{forYou.app}</span>
                <span className="dl-primary-hint">{copy.appHint}</span>
              </a>
            ) : null}
            {forYou.cli ? (
              <a className="dl-primary dl-primary--cli" href={assetHref(forYou.cli)}>
                <span className="dl-primary-kind">{copy.cli}</span>
                <span className="dl-primary-name">{forYou.cli}</span>
                <span className="dl-primary-hint">{copy.cliHint}</span>
              </a>
            ) : null}
          </div>
        </section>
      ) : null}

      <section className="dl-platforms">
        <h2>{copy.platforms}</h2>
        <div className="dl-grid">
          {columns.map((column, index) => (
            <div className="dl-col" key={index}>
              {column.map((platform) => (
                <article className="dl-card" data-platform={platform.id} key={platform.id}>
                  <header className="dl-card-head">
                    <h3>{copy.os[platform.id].name}</h3>
                    <p>{copy.os[platform.id].hint}</p>
                  </header>
                  <table className="dl-table">
                    <thead><tr><th scope="col"></th><th scope="col">{copy.app}</th><th scope="col">{copy.cli}</th></tr></thead>
                    <tbody>
                      {platform.rows.map((row) => (
                        <tr key={`${row.arch}-${row.variant ?? ''}`}>
                          <th scope="row"><span>{copy.arch[row.arch]}</span>{row.variant ? <span className="dl-variant">{row.variant}</span> : null}</th>
                          <td>{row.app.length ? row.app.map((pkg) => asset(pkg.asset, pkg.label, pkg.tag)) : <span className="dl-none">—</span>}</td>
                          <td>{row.cli.map((pkg) => asset(pkg.asset, pkg.label))}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {platform.id === 'linux' ? (
                    <footer className="dl-store">
                      <a href="https://raw.githubusercontent.com/LeenHawk/gproxy/dev/distribution/alpine/gproxy-alpine.rsa.pub">{copy.alpineKey} ↗</a>
                      <a href="https://github.com/LeenHawk/gproxy/blob/dev/distribution/alpine/README.txt">{copy.alpineGuide} ↗</a>
                    </footer>
                  ) : null}
                  {platform.fdroid ? (
                    <footer className="dl-store dl-fdroid">
                      <span>{copy.fdroid}</span>
                      <a href="https://f-droid.org/packages/com.leenhawk.gproxy.desktop/"><img src="https://f-droid.org/badge/get-it-on.png" alt="Get it on F-Droid" height="56" /></a>
                    </footer>
                  ) : null}
                  {platform.store ? (
                    <footer className="dl-store">
                      <span>{copy.store}</span>
                      <a href="https://apps.microsoft.com/detail/9P2FJRB9RS4Z?mode=direct">{copy.storeDesktop} ↗</a>
                      <a href="https://apps.microsoft.com/detail/9NBMH3S5K0L9?mode=direct">{copy.storeCli} ↗</a>
                    </footer>
                  ) : null}
                  {platform.store ? (
                    <footer className="dl-store dl-scoop">
                      <span>{copy.winget}</span>
                      <pre className="dl-code"><code>{'winget install --id 9P2FJRB9RS4Z --source msstore   # GPROXY Desktop\nwinget install --id 9NBMH3S5K0L9 --source msstore   # GPROXY CLI'}</code></pre>
                    </footer>
                  ) : null}
                  {platform.scoop ? (
                    <footer className="dl-store dl-scoop">
                      <span>{copy.scoop}</span>
                      <a href="https://github.com/LeenHawk/scoop-bucket">LeenHawk/scoop-bucket ↗</a>
                      <pre className="dl-code"><code>{'scoop bucket add gproxy https://github.com/LeenHawk/scoop-bucket\nscoop install gproxy/gproxy-desktop   # gproxy, gproxy-headless'}</code></pre>
                    </footer>
                  ) : null}
                </article>
              ))}
            </div>
          ))}

          <article className="dl-card dl-card--wide">
            <header className="dl-card-head">
              <h3>{copy.headless}</h3>
              <p>{copy.headlessHint}</p>
            </header>
            <div className="dl-chips">
              {headless.map((name) => asset(name, headlessLabel(name)))}
            </div>
          </article>
        </div>
      </section>

      <section className="dl-setup" id="setup">
        <h2>{copy.setup}</h2>
        <div className="dl-setup-grid">
          <article className="dl-card">
            <h3>{copy.setupApp}</h3>
            <p>{copy.setupAppBody}</p>
          </article>
          <article className="dl-card">
            <h3>{copy.setupCli}</h3>
            <p>{copy.setupCliBody}</p>
            <pre className="dl-code"><code>gproxy serve --data-dir ./data</code></pre>
            <pre className="dl-code"><code>http://127.0.0.1:8787/console/</code></pre>
          </article>
        </div>
      </section>

      <section className="dl-more">
        <article className="dl-card">
          <h3>{copy.container}</h3>
          <p>{copy.containerBody}</p>
          <pre className="dl-code"><code>docker run -d --name gproxy -p 127.0.0.1:8787:8787 -v gproxy-data:/app/data gproxy2/gproxy:{release ? release.tag_name : 'latest'}</code></pre>
          <a className="dl-link" href={`${prefix}/deployment/containers`}>{copy.containerGuide} →</a>
        </article>
        <article className="dl-card">
          <h3>{copy.hosted}</h3>
          <p>{copy.hostedBody}</p>
          <a className="dl-link" href={`${prefix}/deployment/edge`}>{copy.hostedGuide} →</a>
        </article>
        <article className="dl-card">
          <h3>{copy.source}</h3>
          <p>{copy.sourceBody}</p>
          <pre className="dl-code"><code>cargo build --release -p gproxy</code></pre>
          <a className="dl-link" href={`${prefix}/deployment/release-build`}>{copy.sourceGuide} →</a>
        </article>
        <article className="dl-card">
          <h3>{copy.verify}</h3>
          <p>{copy.verifyBody}</p>
          <div className="dl-chips">
            {asset('SHA256SUMS', copy.sums, undefined, false)}
            {asset('manifest.json', copy.manifest, undefined, false)}
          </div>
        </article>
      </section>

      <p className="dl-next">{copy.next} <a href={`${prefix}/getting-started/quick-start`}>{copy.nextLink}</a>. {copy.upgrade} <a href={`${prefix}/deployment/v3-to-v4`}>{copy.upgradeLink}</a>.</p>
    </div>
  );
};
