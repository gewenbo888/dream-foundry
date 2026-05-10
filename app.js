const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));
const html = document.documentElement;

const langBtn = $('#lang-btn'), themeBtn = $('#theme-btn');
const sLang = localStorage.getItem('df-lang') || 'en';
const sTheme = localStorage.getItem('df-theme') || 'dark';
html.setAttribute('data-lang', sLang);
html.setAttribute('data-theme', sTheme);
langBtn.textContent = sLang === 'en' ? 'EN' : '中';
langBtn.addEventListener('click', () => {
  const n = html.getAttribute('data-lang') === 'en' ? 'zh' : 'en';
  html.setAttribute('data-lang', n);
  localStorage.setItem('df-lang', n);
  langBtn.textContent = n === 'en' ? 'EN' : '中';
});
themeBtn.addEventListener('click', () => {
  const n = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', n);
  localStorage.setItem('df-theme', n);
});

// hero swirl
$('#dream-viz').innerHTML = `
  <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="d1" cx="40%" cy="40%">
        <stop offset="0%" stop-color="var(--twilight)" stop-opacity="0.92"/>
        <stop offset="40%" stop-color="var(--dream)" stop-opacity="0.55"/>
        <stop offset="80%" stop-color="var(--abyss)" stop-opacity="0.2"/>
        <stop offset="100%" stop-color="var(--abyss)" stop-opacity="0"/>
      </radialGradient>
      <filter id="db"><feGaussianBlur stdDeviation="3"/></filter>
    </defs>
    ${[230, 195, 160, 125, 90, 55].map((r, i) =>
      `<circle cx="250" cy="250" r="${r}" fill="none" stroke="${i%2 ? 'var(--twilight)' : 'var(--dream)'}" stroke-opacity="${0.18 + i*0.05}" stroke-width="${1 + i*0.18}" stroke-dasharray="${i*2 + 2} ${5 - i*0.4}" transform="rotate(${i*22} 250 250)"/>`
    ).join('')}
    <circle cx="250" cy="250" r="280" fill="url(#d1)" filter="url(#db)" opacity="0.55"/>
    <circle cx="250" cy="250" r="36" fill="var(--twilight)" filter="url(#db)" opacity="0.7"/>
    <circle cx="250" cy="250" r="22" fill="var(--bg)"/>
    <circle cx="250" cy="250" r="20" fill="none" stroke="var(--mist)" stroke-width="1.4"/>
    <text x="250" y="255" text-anchor="middle" font-family="Cormorant Garamond" font-style="italic" font-size="20" fill="var(--text)">夢</text>
  </svg>`;

// archetypes
const archs = [
  { id: 'chase', en_t: 'Chase', zh_t: '追逐', glow: 'oneiric', en_p: 'Pursued by an unspecified figure. Reading: an unprocessed obligation that has accreted into the form of a body. The chaser\'s identity is rarely the point.', zh_p: '被一个未明身形者追赶。读法：一项未消化的责任，结晶成了身体的样貌。追赶者的身份很少是重点。' },
  { id: 'falling', en_t: 'Falling', zh_t: '坠落', glow: 'abyss', en_p: 'Loss of footing without bottom. Reading: the body has noticed an instability the waking mind has not. Not a literal fall — more often a structural one.', zh_p: '失去立足，没有底。读法：身体已注意到清醒头脑尚未注意的某种不稳定。不是字面坠落，更常是一次结构性的。' },
  { id: 'flying', en_t: 'Flying', zh_t: '飞行', glow: 'mist', en_p: 'Self-propelled lift. Reading: regression to a high-agency state, often surfacing in periods when waking life feels constrained. The mood after waking matters more than the imagery during.', zh_p: '自身推动的升起。读法：回归高能动状态，常出现在清醒生活感觉受限的时期。醒后的心境，比梦中影像更重要。' },
  { id: 'lost', en_t: 'Lost place', zh_t: '迷路', glow: 'dream', en_p: 'Returning to an old building you can\'t find the exit of. Reading: an identity layer being calibrated against a room you no longer live in.', zh_p: '回到一栋你找不到出口的旧建筑。读法：一层身份正在对照一个你不再居住的房间被校准。' },
  { id: 'drown', en_t: 'Drowning', zh_t: '溺水', glow: 'abyss', en_p: 'Submersion under water that does not threaten its surface. Reading: emotional load past the recovery threshold; the body knows before the mouth does.', zh_p: '没入不威胁其表面的水中。读法：情感负荷已超过恢复阈值；身体先于口知道。' },
  { id: 'found', en_t: 'Found room', zh_t: '发现的房间', glow: 'sigil', en_p: 'A new room appears in your familiar house. Reading: a capacity surfacing that the conscious self has not yet authorised. Often misread as anxiety; usually it is permission.', zh_p: '熟悉的家中出现一间新房。读法：意识自我尚未授权的某种容量正在浮现。常被误读为焦虑；通常是许可。' },
  { id: 'dead', en_t: 'Dead loved one', zh_t: '逝去的亲人', glow: 'twilight', en_p: 'Conversation with someone gone. Reading: the body completing an emotional process the calendar has marked complete but the system has not. Not visitation; integration.', zh_p: '与已逝者对话。读法：身体在完成日历已标记完成、但系统尚未完成的情感过程。不是来访，是整合。' },
  { id: 'naked', en_t: 'Naked in public', zh_t: '在公共场合裸身', glow: 'oneiric', en_p: 'Visible in a context that demands disguise. Reading: an authenticity bid, not a shame signal. Most adults misread the affect as the content.', zh_p: '在要求伪装的语境中可见。读法：一次本真出价，不是羞耻信号。多数成年人把情感误读为内容。' },
];

function renderArchetypes() {
  $('#archetypes-grid').innerHTML = archs.map(a => `
    <div class="card glow-${a.glow}">
      <div class="card-tag">${a.id}</div>
      <h3><span lang="en">${a.en_t}</span><span lang="zh">${a.zh_t}</span></h3>
      <p><span lang="en">${a.en_p}</span><span lang="zh">${a.zh_p}</span></p>
    </div>`).join('');
}
renderArchetypes();

// foundry
const arches = archs.map(a => ({ id: a.id, en: a.en_t, zh: a.zh_t }));
const picked = new Set();
function renderPicker() {
  $('#arch-picker').innerHTML = arches.map(a => `<button class="arch-btn ${picked.has(a.id)?'on':''}" data-id="${a.id}"><span lang="en">${a.en}</span><span lang="zh">${a.zh}</span></button>`).join('');
  $$('.arch-btn').forEach(b => b.addEventListener('click', () => {
    const id = b.dataset.id;
    if (picked.has(id)) picked.delete(id);
    else if (picked.size < 3) picked.add(id);
    renderPicker();
  }));
}
renderPicker();

['s-fear','s-mem','s-des'].forEach(id => $('#'+id).addEventListener('input', e => {
  const k = id.split('-')[1];
  $('#v-' + k.slice(0,3)).textContent = e.target.value;
}));

const palettes = {
  grief:   { en: 'low gray light through wet windows', zh: '透过潮湿窗户的低沉灰光' },
  longing: { en: 'amber half-light, the kind a kitchen has at 4 a.m.', zh: '凌晨四点厨房里那种琥珀色的半明半暗' },
  dread:   { en: 'green-tinted dusk that makes objects look unreliable', zh: '让物体显得不可靠的、染绿的黄昏' },
  elation: { en: 'overexposed white that bleaches the edges of things', zh: '将物体边缘漂白的过曝白光' },
  numb:    { en: 'flat indoor light without a discernible source', zh: '没有可辨光源的、平直的室内光' },
  rage:    { en: 'low red light beneath a doorframe you don\'t remember', zh: '一道你不记得的门框下的低红光' },
};

const fragments = {
  chase: { en: 'A figure you cannot identify follows you, never closing the distance, never falling behind.', zh: '一个你无法辨认的人追着你，从不缩短距离，也从不落下。' },
  falling: { en: 'The floor declines to remain solid. You drop without acceleration.', zh: '地板拒绝保持坚实。你坠落，不带加速度。' },
  flying: { en: 'You lift, with no surprise, an inch above the road.', zh: '你升起，毫不诧异，距路面一寸。' },
  lost: { en: 'You are inside a school you stopped attending decades ago, looking for an exit that keeps becoming a corridor.', zh: '你在一所你几十年前就不再就读的学校里，寻找一个不断变成走廊的出口。' },
  drown: { en: 'Water rises to chin level and stays there. It does not feel like an emergency.', zh: '水上升到下巴位置并停在那里。这并不像紧急情况。' },
  found: { en: 'You discover a room in your apartment you have never seen before. It contains exactly what it needs to.', zh: '你发现公寓里一间你从未见过的房间。它包含的恰是它必须包含的。' },
  dead: { en: 'Someone you loved who is no longer alive sits at the table and asks how you have been.', zh: '一位你爱过、如今已不在的人坐在桌旁，问你近来如何。' },
  naked: { en: 'You realise mid-conversation that you are not wearing what the room expects you to be wearing.', zh: '在对话进行到一半时，你意识到你穿的不是这个房间期待你穿的。' },
};

function forge() {
  const fear = +$('#s-fear').value;
  const mem = +$('#s-mem').value;
  const des = +$('#s-des').value;
  const mood = $('#s-mood').value;
  const ids = Array.from(picked);
  if (ids.length === 0) {
    $('#dream-out').innerHTML = `<span lang="en">Pick one to three archetypes first.</span><span lang="zh">先挑一到三个原型。</span>`;
    return;
  }
  const lang = html.getAttribute('data-lang');
  const palette = palettes[mood][lang === 'en' ? 'en' : 'zh'];
  const frags = ids.map(id => fragments[id][lang === 'en' ? 'en' : 'zh']);
  const intensity = (fear + mem + des) / 3;
  let closing_en, closing_zh;
  if (intensity > 7) { closing_en = ' You wake before the next part. The next part wakes anyway.'; closing_zh = '你在下一段开始前醒来。下一段照样醒了。'; }
  else if (intensity < 3) { closing_en = ' The dream releases you without negotiating.'; closing_zh = '梦不经协商就释放了你。'; }
  else { closing_en = ' The dream does not resolve. You wake midway.'; closing_zh = '梦不收尾。你在中途醒来。'; }

  if (lang === 'en') {
    $('#dream-out').textContent = `The light is ${palette}. ${frags.join(' ')}${closing_en}`;
  } else {
    $('#dream-out').textContent = `光是${palette}。${frags.join('')}${closing_zh}`;
  }
}
$('#forge-go').addEventListener('click', forge);

// lexicon
const lex = [
  { en_s: 'Water',    zh_s: '水',     en_r: 'emotion, especially unintegrated',     zh_r: '情感，尤其是未整合的',       en_c: 'mistaken for cleansing; usually it is volume', zh_c: '常被误读为净化；多数时候是容量' },
  { en_s: 'Mirror',   zh_s: '镜',     en_r: 'identity not yet recognized',           zh_r: '尚未被识别的身份',           en_c: 'mistaken for vanity; usually it is calibration', zh_c: '常被误读为虚荣；多数时候是校准' },
  { en_s: 'Door',     zh_s: '门',     en_r: 'transition pending consent',            zh_r: '等待同意的过渡',             en_c: 'mistaken for opportunity; usually it is decision overdue', zh_c: '常被误读为机会；多数时候是逾期的决定' },
  { en_s: 'Animal',   zh_s: '动物',   en_r: 'instinct that the conscious self has muted',  zh_r: '被意识自我静音的本能',  en_c: 'mistaken for danger; usually it is signal', zh_c: '常被误读为危险；多数时候是信号' },
  { en_s: 'Shadow',   zh_s: '阴影',   en_r: 'a disowned part returning',             zh_r: '一个被否认的部分在回归',     en_c: 'mistaken for a stalker; usually it is yours', zh_c: '常被误读为跟踪者；多数时候是你自己的' },
  { en_s: 'House',    zh_s: '房子',   en_r: 'self-structure, room-by-room',          zh_r: '逐间房的自我结构',           en_c: 'mistaken for nostalgia; usually it is current', zh_c: '常被误读为怀旧；多数时候是当下' },
  { en_s: 'Stairs',   zh_s: '楼梯',   en_r: 'level change between identity registers',  zh_r: '身份语域间的层级变更',     en_c: 'mistaken for direction; usually it is transition', zh_c: '常被误读为方向；多数时候是过渡' },
  { en_s: 'Phone',    zh_s: '电话',   en_r: 'an integration the body has scheduled',     zh_r: '身体已排程的某次整合',     en_c: 'mistaken for anxiety; usually it is reminder', zh_c: '常被误读为焦虑；多数时候是提醒' },
  { en_s: 'Teeth',    zh_s: '牙齿',   en_r: 'agency under threat',                  zh_r: '受威胁的能动性',             en_c: 'mistaken for vanity; usually it is voice', zh_c: '常被误读为虚荣；多数时候是嗓音' },
  { en_s: 'Vehicle',  zh_s: '车',     en_r: 'autonomy in motion',                   zh_r: '运动中的自治',               en_c: 'mistaken for direction; usually it is control', zh_c: '常被误读为方向；多数时候是控制' },
  { en_s: 'Forest',   zh_s: '林',     en_r: 'the unconscious as territory, not as adversary',  zh_r: '作为疆域、而非对手的潜意识', en_c: 'mistaken for danger; usually it is depth', zh_c: '常被误读为危险；多数时候是深度' },
  { en_s: 'Light',    zh_s: '光',     en_r: 'attention, applied or withheld',        zh_r: '被施予或被收回的注意',       en_c: 'mistaken for hope; usually it is gaze', zh_c: '常被误读为希望；多数时候是凝视' },
];
function renderLex() {
  const head = `<tr><th><span lang="en">Symbol</span><span lang="zh">符号</span></th><th><span lang="en">Common reading</span><span lang="zh">常见读法</span></th><th><span lang="en">Cost line</span><span lang="zh">代价</span></th></tr>`;
  const body = lex.map(l => `<tr>
    <td><span lang="en">${l.en_s}</span><span lang="zh">${l.zh_s}</span></td>
    <td><span lang="en">${l.en_r}</span><span lang="zh">${l.zh_r}</span></td>
    <td><span lang="en">${l.en_c}</span><span lang="zh">${l.zh_c}</span></td></tr>`).join('');
  $('#lex-table').innerHTML = `<table><thead>${head}</thead><tbody>${body}</tbody></table>`;
}
renderLex();

// oneiric engine
const probes = [
  { id: 'recurring',
    en_t: 'Recurring Dream', zh_t: '反复梦',
    en_h: 'I have the same dream again and again. Why?',
    zh_h: '我反复做同一个梦。为什么？',
    en_a: `Recurring dreams are filings the body keeps re-submitting because nothing in waking life has marked them resolved. The signal isn't in the imagery; it's in the recurrence rate. The body switches to a different image as soon as the underlying matter integrates — so as long as the same dream returns, the matter is still open.

Three diagnostic questions, in order. (1) When did the dream first appear? Recurring dreams typically attach to a specific decade — childhood, late twenties, post-loss. The window of first appearance is the matter's home address. (2) What changes when it recurs? The imagery is usually constant; the affect is not. Track whether the dread, the longing, or the relief has shifted by even one notch. The shift is the integration. (3) What stops it? Recurring dreams stop when something in waking life acknowledges the matter — not solves it. Acknowledgment is cheaper than solution and the body accepts it.

What this engine will not pretend: that the meaning is universal. The same imagery means different things to different dreamers because the symbol is bounded by the dreamer's lived associations. Don't take a dream-key table at its word.`,
    zh_a: `反复出现的梦，是身体反复重新提交的归档单据——因为清醒生活中没有什么标记它为"已结案"。信号不在影像里，而在复发率里。底层事项一被整合，身体就会切换到另一种影像——只要同一个梦还回来，事项就仍未结。

三个诊断问题，按顺序。(1) 这个梦最初出现于何时？反复梦通常依附于某个具体的十年——童年、二十几岁后期、丧失之后。首次出现的窗口，是这桩事项的"家庭住址"。(2) 它复发时什么在变？影像通常恒定，情感不是。追踪那份惧、那份思慕，或那份释然是否已经位移哪怕一档。位移就是整合。(3) 是什么让它停下？反复梦在清醒生活承认那桩事项时停下——不是解决它。承认比解决便宜，身体接受承认。

本引擎不会假装的：意义是普世的。同一影像对不同梦者意味不同的事，因为符号被梦者的活体联想所限定。别把"梦的钥匙"表当真。` },
  { id: 'lucid',
    en_t: 'Lucid Asymmetry', zh_t: '清醒梦的不对称',
    en_h: 'I can sometimes lucid-dream. Should I?',
    zh_h: '我有时能做清醒梦。我该这么做吗？',
    en_a: `Lucid dreaming is a real capacity and a complicated tool.

What you gain: control inside the image. What you lose: the body's preferred mode of communication. Dreams compress emotional residue into images precisely because the conscious mind isn't supervising the compression; turn supervision on, and you get an image that performs for you. It's still vivid. It's also less honest.

The split most lucid-dreamers settle into after a few years: lucid dreaming for play, non-lucid dreaming for processing. They notice the body produces fewer recurring dreams during heavy lucid-dream periods, and that some of the deferred matter shows up as waking-life affect spikes instead. The body filed the complaint elsewhere.

What this engine will not pretend: that there's a clean answer. Lucid dreaming is fine to enjoy, dangerous to over-rely on, and useless as a therapeutic substitute. If you're using it to avoid the dreams that visit unbidden, the matter is still open and is paying its tax somewhere else.`,
    zh_a: `清醒梦是一种真实的能力，也是一件复杂的工具。

你得到的：在影像内部的控制。你失去的：身体所偏好的沟通模式。梦把情感残留压缩进影像，正因为意识心智没有在监督这次压缩；打开监督，你得到的就是一幅为你而表演的影像。它仍生动，但也较不诚实。

多数清醒梦者在数年后落入的分割：清醒梦用于游戏，非清醒梦用于处理。他们注意到，在大量清醒梦的时期里，身体产出更少的反复梦——而某些被延迟的事项，会以清醒生活情感波峰的形式出现。身体把那份投诉归档到了别处。

本引擎不会假装的：有一个干净的答案。清醒梦可以享受、不可过度倚赖、不可作为治疗的替代。如果你用它来回避那些未经召唤而来的梦，那桩事项仍然未结，并在别处缴税。` },
  { id: 'no-dreams',
    en_t: 'No Dreams At All', zh_t: '完全不做梦',
    en_h: 'I never remember dreaming. Is that bad?',
    zh_h: '我从来记不起做梦。这是坏事吗？',
    en_a: `Probably not, but the question is more interesting than it sounds.

Everyone dreams; almost no one remembers most of it. Recall is a trainable, reversible capacity that responds to a few specific habits — keeping a bedside notebook, waking without an alarm, not reaching for a phone in the first ninety seconds, and asking yourself "what was just happening" before you move. People who claim never to dream are usually people whose mornings are structured to delete the recall window before it can form.

Two harder cases. (1) If you used to remember dreams and now don't, the change is the data. Either the body has shifted to lighter sleep with less REM consolidation (often a load issue), or the recall habit has been crowded out (usually a phone issue). Either is reversible. (2) If you never have remembered, you're at one tail of a normal distribution; nothing is wrong, but you're missing one of the cheaper diagnostic instruments the body offers.

The honest disclaimer: dream recall is not a virtue. People who recall everything aren't more in touch with themselves; they often just have looser sleep architecture. The point of remembering is to use what you remember. If you don't and your life is fine, the question doesn't need answering.`,
    zh_a: `多半不是，但这个问题比听起来有意思。

所有人都做梦；几乎没人能记住大部分。记忆是一种可训练、可逆转的能力，对几种具体习惯敏感——床头放本本子、不靠闹钟醒来、起床后九十秒内不碰手机，并在动身之前问自己"刚才在发生什么"。声称从不做梦的人，通常其早晨被结构化地清除了"记忆窗口"。

两种更难的情况。(1) 你过去能记起、现在记不起，这个变化本身就是数据。要么身体转向更浅、REM 整合更少的睡眠（常是负荷问题）；要么记忆习惯被挤掉（通常是手机问题）。两者都可逆。(2) 你从未记起过——你处于正态分布的一端尾部；没有什么不对，只是错过了身体最便宜的诊断仪器之一。

诚实的免责声明：记得梦不是美德。能记住一切的人，并不更"与自己相通"；他们常只是有更松散的睡眠结构。记忆的意义在于使用它。如果你不使用，且生活无碍，这问题就不需回答。` },
  { id: 'nightmare',
    en_t: 'Stuck Nightmare', zh_t: '卡住的噩梦',
    en_h: 'A nightmare keeps coming back at the same point in the year. Why?',
    zh_h: '一场噩梦总在每年同一时间回来。为什么？',
    en_a: `Calendar-locked nightmares are unusual and informative.

The body uses date as one of many indices for emotional residue, and an anniversary recurrence usually means the matter has been compressed into the date itself. The dream isn't predicting; it's resurfacing. The most common substrates: a loss whose date the calendar still holds, a transition you marked at this time of year for several years running, or an environmental cue (light, weather, smell) the body has associated with a fixed register.

Three moves, in order. (1) Mark the matter explicitly during the daylight before the date passes. Acknowledgment alone often unbinds the dream; the body lets go once the daytime register has registered. (2) Don't try to interpret the imagery. Calendar-locked nightmares often borrow imagery from elsewhere — the body picks whatever was already loaded — so the imagery is incidental. The recurrence is the signal. (3) If the dream continues to come back after explicit acknowledgment for two consecutive years, this is past the foundry's competence. See a real clinician.

What this engine will not pretend: that the nightmare is purposeful or didactic. The body is filing a complaint, not teaching a lesson. Treat it kindly; do not search it for hidden moral content.`,
    zh_a: `日历锁定的噩梦不常见，但有信息量。

身体把"日期"作为情感残留的众多索引之一，周年式的复发，通常意味着那桩事项已被压缩进日期本身。梦不是在预测，是在再次浮现。最常见的底层：日历仍持有日期的丧失；连续多年你都在此时标记的过渡；身体已与某个固定语域关联的环境线索（光、天气、气味）。

三步，按顺序。(1) 在日期过去之前的白昼，明确地标记那桩事项。仅仅承认，往往就能解除梦的绑定；白昼语域一登记，身体就放手。(2) 不要试图解读影像。日历锁定的噩梦常从别处借用影像——身体随手挑当时已加载的——所以影像是附带的，复发才是信号。(3) 若在连续两年的明确承认后梦仍回来，这已超出本熔炉的能力。去看真正的临床医生。

本引擎不会假装的：噩梦带有目的或教谕。身体在归档投诉，不在教课。温柔对待它；不要在其中搜寻隐藏的道德内容。` },
  { id: 'shared',
    en_t: 'Shared Dream', zh_t: '共享的梦',
    en_h: 'My partner and I once had nearly the same dream the same night. Coincidence?',
    zh_h: '我和伴侣曾在同一晚做了几乎相同的梦。巧合吗？',
    en_a: `Almost certainly. But it's a beautiful coincidence and worth thinking about.

Coupled lives produce coupled affect, and coupled affect produces overlapping residue. If you and your partner share an emotional climate — same recent week, same news, same friends, same bed — your bodies are processing similar inputs. That alone makes the imagery probability distribution overlap more than chance would predict, which is enough to produce the occasional near-match. No telepathy required; the explanation that rules out telepathy is also more elegant.

What's worth noticing isn't the coincidence; it's what the coincidence reveals. If a near-match happens, the matter compressed into the dream is shared, and you can talk about it together with the imagery as the entry point. The dream is doing the work of making the shared register legible. Use it.

What this engine will not pretend: that the question of "shared dreaming" deserves a mystical answer. Mystical answers are easy and decay quickly. The materialist answer — coupled lives compress similar residue — is more honest and travels further.`,
    zh_a: `几乎肯定是巧合。但这是一次美丽的巧合，值得思考。

被耦合的生活产出被耦合的情感，被耦合的情感产出相互重叠的残留。如果你和伴侣共享一片情绪气候——同一近周、同一新闻、同一群朋友、同一张床——你们的身体在处理相似的输入。仅此一点，就让影像的概率分布比偶然更重合，足以偶尔产生一次近似匹配。无需心灵感应；排除心灵感应的解释，也更优雅。

值得注意的不是巧合，而是巧合揭示的事。一旦发生一次近似匹配，被压缩进梦中的事项就是共享的，你可以与伴侣以影像为入口一同谈论它。梦在做"让共享语域可读"的工作。利用它。

本引擎不会假装的：关于"共享梦"的问题应得一个神秘答案。神秘答案易得而衰减得快。唯物的答案——被耦合的生活压缩相似的残留——更诚实，也走得更远。` },
];

function renderProbes() {
  $('#prompt-grid').innerHTML = probes.map(p => `
    <button class="prompt-btn" data-id="${p.id}">
      <span class="pt-tag">probe</span>
      <strong><span lang="en">${p.en_t}</span><span lang="zh">${p.zh_t}</span></strong>
      <div style="margin-top:6px; color: var(--muted); font-size: 12px;"><span lang="en">${p.en_h}</span><span lang="zh">${p.zh_h}</span></div>
    </button>`).join('');
  $$('.prompt-btn').forEach(b => b.addEventListener('click', () => {
    const p = probes.find(x => x.id === b.dataset.id);
    const lang = html.getAttribute('data-lang');
    $('#mirror-out').textContent = lang === 'en' ? p.en_a : p.zh_a;
  }));
}
renderProbes();

function heuristicRead(text) {
  const lang = html.getAttribute('data-lang');
  const t = text.toLowerCase();
  const found = [];
  if (/water|drown|sea|river|swim|水|溺|海|河|游/.test(t)) found.push(lang === 'en' ? 'water' : '水');
  if (/fall|drop|cliff|落|坠|崖/.test(t)) found.push(lang === 'en' ? 'falling' : '坠落');
  if (/fly|float|飞|浮/.test(t)) found.push(lang === 'en' ? 'flying' : '飞行');
  if (/chase|run|pursue|追|逃跑/.test(t)) found.push(lang === 'en' ? 'chase' : '追逐');
  if (/dead|died|gone|逝|死|去世/.test(t)) found.push(lang === 'en' ? 'dead-loved' : '逝者');
  if (/school|home|house|家|学校|房/.test(t)) found.push(lang === 'en' ? 'lost place' : '迷失之所');
  if (/naked|undressed|裸|衣/.test(t)) found.push(lang === 'en' ? 'naked' : '裸身');
  if (/teeth|tooth|牙/.test(t)) found.push(lang === 'en' ? 'teeth' : '牙齿');
  if (/again|every|recur|总是|再|反复/.test(t)) found.push(lang === 'en' ? 'recurrence' : '反复');

  if (lang === 'en') {
    return `Heuristic read · imagery flagged: ${found.length ? found.join(' · ') : 'none specifically flagged'}.

Three things to consider:

(1) ${/(again|every|recur|总是|再|反复)/.test(t) ? `You named recurrence. The signal is in the recurrence rate, not the imagery — see the "Recurring Dream" probe above for the proper read.` : `No recurrence vocabulary. If this dream came once, the heuristic is to let it sit for one week before interpreting; one-off dreams are often imagery-heavy and meaning-light.`}

(2) ${found.length === 0 ? `No imagery vocabulary flagged. Either the dream is structurally unusual or the description is too abstract for the heuristic. Try retelling it as if to a stranger.` : `${found.length} image(s) detected. Consult the lexicon above for the common reading and — more importantly — whether the cost line applies.`}

(3) ${/(scared|afraid|anxious|terrified|害怕|恐惧|焦虑)/.test(t) ? `Fear vocabulary present. Note: most adults read fear in dreams as the dream's content; usually it is the dream's affect register, and the content is something else.` : `No strong fear vocabulary. Read the affect of the dream as one of the dimensions, not the dimension.`}

The probes above are cleaner than this fallback. Pick the closest one for a fully written reading.`;
  } else {
    return `启发式读取 · 标记到的影像：${found.length ? found.join(' · ') : '无特定标记'}。

三点可考虑的：

(1) ${/(again|every|recur|总是|再|反复)/.test(t) ? `你提到了反复。信号在复发率里，而非影像里——见上方"反复梦"探针获取正确读法。` : `无反复词汇。若此梦只来过一次，启发式建议是先让它沉一周再解读；一次性的梦常常影像多、意义少。`}

(2) ${found.length === 0 ? `未标记到影像词汇。要么这梦结构特殊，要么描述对启发式过于抽象。试着像对陌生人那样重述它。` : `检测到 ${found.length} 项影像。查阅上方辞典获取常见读法——更重要的是看代价行是否适用。`}

(3) ${/(scared|afraid|anxious|terrified|害怕|恐惧|焦虑)/.test(t) ? `存在恐惧词汇。注意：多数成年人把梦里的恐惧读作梦的内容；它通常是梦的情感语域，内容是别的东西。` : `无强烈恐惧词汇。把梦的情感读作其中一个维度，不是那个维度。`}

上方的探针比这个回退更干净。挑最贴近的一个，可得到完整成型的读法。`;
  }
}

$('#mirror-go').addEventListener('click', () => {
  const text = $('#mirror-input').value.trim();
  if (!text) return;
  $('#mirror-out').textContent = heuristicRead(text);
});
