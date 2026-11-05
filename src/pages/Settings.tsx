import { useRef, useState } from 'react';
import { parseImport, type ProgressApi } from '../lib/progress';
import type { SettingsApi, Theme, VoiceMode } from '../lib/settings';
import { greekVoice, sfx, speakGreek, speechSupported } from '../lib/audio';
import { Back } from '../components/Back';

export function SettingsPage({ api, settingsApi }: { api: ProgressApi; settingsApi: SettingsApi }) {
  const { settings, set } = settingsApi;
  const fileRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<string | null>(null);
  const hasGreek = !!greekVoice();

  const exportProgress = () => {
    const blob = new Blob([JSON.stringify(api.progress, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `koine-adventure-progress-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setMessage('Progress file downloaded. Import it on another device to continue there.');
  };

  const importProgress = async (file: File) => {
    try {
      const p = parseImport(await file.text());
      if (confirm(`Replace your current progress with this file (${p.xp} XP)?`)) {
        api.replace(p);
        setMessage('Progress imported!');
      }
    } catch (e) {
      setMessage(e instanceof Error ? e.message : 'Could not read that file.');
    }
  };

  return (
    <div>
      <Back to="trophies" label="Me" />
      <h2>Settings</h2>

      <section className="card settings">
        <h3>🔊 Audio</h3>
        {!speechSupported() && <p className="feedback bad">Your browser doesn't support speech, so audio buttons are hidden.</p>}
        <label className="setting-row">
          <span>Sound effects</span>
          <input type="checkbox" checked={settings.sound} onChange={(e) => { set('sound', e.target.checked); if (e.target.checked) setTimeout(() => sfx('correct'), 50); }} />
        </label>
        <label className="setting-row">
          <span>Speak words automatically<small>When you tap a verse word or see a new flashcard</small></span>
          <input type="checkbox" checked={settings.autoSpeak} onChange={(e) => set('autoSpeak', e.target.checked)} />
        </label>
        <fieldset className="setting-row column">
          <legend>Pronunciation</legend>
          {([
            ['erasmian', 'Classroom (Erasmian)', 'The pronunciation taught in most Bible colleges and seminaries. Works on every device.'],
            ['modern', 'Modern Greek voice', hasGreek ? 'Uses your device\'s Greek voice. Sounds natural, but uses modern pronunciation (e.g. η = "ee", β = "v").' : 'No Greek voice was found on this device, so the Classroom voice will be used.'],
          ] as [VoiceMode, string, string][]).map(([value, label, hint]) => (
            <label key={value} className="radio">
              <input type="radio" name="voice" checked={settings.voiceMode === value} onChange={() => set('voiceMode', value)} />
              <span><strong>{label}</strong><small>{hint}</small></span>
            </label>
          ))}
        </fieldset>
        <label className="setting-row">
          <span>Speaking speed <small>{settings.rate.toFixed(1)}×</small></span>
          <input type="range" min="0.5" max="1.2" step="0.1" value={settings.rate} onChange={(e) => set('rate', Number(e.target.value))} />
        </label>
        <button className="secondary" onClick={() => speakGreek('Ἐν ἀρχῇ ἦν ὁ λόγος')} disabled={!speechSupported()}>
          ▶ Test: Ἐν ἀρχῇ ἦν ὁ λόγος
        </button>
      </section>

      <section className="card settings">
        <h3>🎯 Daily goal</h3>
        <div className="seg" role="group" aria-label="Daily XP goal">
          {[[20, 'Casual'], [50, 'Regular'], [100, 'Serious'], [200, 'Intense']].map(([xp, name]) => (
            <button key={xp} className={settings.dailyGoal === xp ? 'on' : ''} onClick={() => set('dailyGoal', xp as number)}>
              {name}<br /><small>{xp} XP</small>
            </button>
          ))}
        </div>
      </section>

      <section className="card settings">
        <h3>🎨 Appearance</h3>
        <div className="seg" role="group" aria-label="Theme">
          {(['system', 'light', 'dark'] as Theme[]).map((t) => (
            <button key={t} className={settings.theme === t ? 'on' : ''} onClick={() => set('theme', t)}>
              {t === 'system' ? 'Auto' : t === 'light' ? '☀️ Light' : '🌙 Dark'}
            </button>
          ))}
        </div>
      </section>

      <section className="card settings">
        <h3>💾 Your progress</h3>
        <p className="muted">Progress is saved on this device only. Use a backup file to move it to another device.</p>
        <div className="button-row">
          <button className="secondary" onClick={exportProgress}>⬇ Download backup</button>
          <button className="secondary" onClick={() => fileRef.current?.click()}>⬆ Restore from file</button>
          <input ref={fileRef} type="file" accept="application/json,.json" hidden onChange={(e) => e.target.files?.[0] && importProgress(e.target.files[0])} />
        </div>
        {message && <p className="feedback">{message}</p>}
        <button
          className="link danger"
          onClick={() => {
            if (confirm('Reset all progress? This cannot be undone.')) {
              api.reset();
              setMessage('Progress reset.');
            }
          }}
        >
          Reset all progress
        </button>
      </section>

      <section className="card settings">
        <h3>📲 Install the app</h3>
        <p className="muted">
          Koine Adventure works offline. On your phone, use your browser's <strong>Share → Add to Home Screen</strong> (iPhone) or
          <strong> ⋮ → Install app</strong> (Android/Chrome) to keep it on your home screen.
        </p>
      </section>
    </div>
  );
}
