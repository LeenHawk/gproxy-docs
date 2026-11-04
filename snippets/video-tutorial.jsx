/**
 * Tutorial video with one tab per recording language. Subtitles are burned
 * into the videos: en.mp4 (English), zh.mp4 (Chinese) and ru.mp4 (the English
 * recording with Russian subtitles, used for the English tab on ru pages).
 */
export const VideoTutorial = ({ locale = 'en', topic = 'sillytavern', title = 'GPROXY × SillyTavern' }) => {
  const ru = locale === 'ru';
  const languages = locale === 'en' || ru ? ['en', 'zh'] : ['zh', 'en'];
  const base = `/tutorials/${topic}`;
  const labels = {
    en: { tab: ru ? 'Английское видео' : 'English', video: ru ? 'ru' : 'en', poster: 'en' },
    zh: { tab: ru ? 'Китайское видео' : '中文', video: 'zh', poster: 'zh' },
  };
  const [active, setActive] = useState(0);
  // Unique per instance so two players on one page never share tab/panel ids.
  const [id] = useState(() => `gp-video-${topic}-${Math.random().toString(36).slice(2, 8)}`);
  const root = useRef(null);
  const tabs = useRef([]);

  const pauseAll = () => root.current?.querySelectorAll('video').forEach((video) => video.pause());
  const select = (index, focus) => {
    if (index !== active) pauseAll();
    setActive(index);
    if (focus) tabs.current[index]?.focus();
  };
  const onKeyDown = (event) => {
    const last = languages.length - 1;
    const next = { ArrowRight: active === last ? 0 : active + 1, ArrowLeft: active === 0 ? last : active - 1, Home: 0, End: last }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    select(next, true);
  };
  // Only one tutorial video plays at a time across the whole page.
  const onPlay = (event) => {
    document.querySelectorAll('.gp-video video').forEach((other) => {
      if (other !== event.currentTarget) other.pause();
    });
  };

  return (
    <div className="gp-video not-prose" ref={root}>
      {ru ? <p className="gp-video-note">Английское видео — с русскими субтитрами.</p> : null}
      <div className="gp-video-tabs" role="tablist" onKeyDown={onKeyDown}>
        {languages.map((language, index) => (
          <button
            key={language}
            type="button"
            role="tab"
            id={`${id}-tab-${language}`}
            aria-controls={`${id}-panel-${language}`}
            aria-selected={index === active}
            tabIndex={index === active ? 0 : -1}
            ref={(element) => { tabs.current[index] = element; }}
            onClick={() => select(index, false)}
          >
            {labels[language].tab}
          </button>
        ))}
      </div>
      {languages.map((language, index) => {
        const copy = labels[language];
        return (
          <div
            key={language}
            role="tabpanel"
            id={`${id}-panel-${language}`}
            aria-labelledby={`${id}-tab-${language}`}
            hidden={index !== active}
          >
            <video
              controls
              controlsList="nodownload"
              playsInline
              preload="metadata"
              width="1600"
              height="900"
              poster={`${base}/${copy.poster}.webp`}
              aria-label={`${title} · ${copy.tab}`}
              onPlay={onPlay}
            >
              <source src={`${base}/${copy.video}.mp4`} type="video/mp4" />
            </video>
          </div>
        );
      })}
    </div>
  );
};
