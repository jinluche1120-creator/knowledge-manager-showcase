// 知识管家 · 公开演示站脚本
// 重要：本脚本为纯前端回放，不含任何网络请求，不连接真实 Agent，不上传任何数据。

(function () {
  const chat = document.getElementById('chat');
  const presetsEl = document.getElementById('presets');

  // 预设入口：每个入口对应一段「用户消息 + Agent 脚本回放」
  const presets = [
    {
      label: '💬 发文字',
      user: '今天看到一句话：最好的投资，是投资你自己。',
      bot: [
        '✅ 已开始执行',
        '📥 归档 → Inbox 收件箱 / 2026-08-16.md',
        '📝 提炼 → Seed 种子笔记 / 个人成长-自我投资.md',
        '核心观点：自我投资是最确定、长期回报最高的杠杆。',
        '行动项建议：本周列出 3 项可长期积累的「自我投资」方向。'
      ]
    },
    {
      label: '🔗 发公众号链接',
      user: 'https://example.com/article/ai-coding',
      bot: [
        '✅ 已开始执行',
        '🔍 正在抓取正文（演示中…）',
        '📥 已归档全文到 Inbox 收件箱 / 2026-08-16.md',
        '📝 已提炼到 Seed 种子笔记 / AI副业-零基础入门.md',
        '一句话脉络：普通人借助 AI 把「不会写代码」的门槛抹平。',
        '行动项建议：先用一个真实需求跑通最小闭环，再决定是否投入。'
      ]
    },
    {
      label: '🖼️ 发截图',
      user: '[图片] 一张思维导图截图',
      bot: [
        '✅ 已开始执行',
        '🖼️ 正在 OCR 转文字（演示中…）',
        '📥 已归档原图 + OCR 全文到 Inbox 收件箱 / 2026-08-16.md',
        '📝 已提炼到 Seed 种子笔记 / 个人成长-框架.md',
        '⚠️ 说明：个别字词存在 OCR 识别误差，已在 Seed 阶段标注校正。'
      ]
    },
    {
      label: '📎 发文件',
      user: '[文件] 课程笔记.pdf',
      bot: [
        '✅ 已开始执行',
        '📎 正在解析文件（演示中…）',
        '📥 已归档原文到 Inbox 收件箱 / 2026-08-16.md',
        '📝 已提炼到 Seed 种子笔记 / 主题-话题.md',
        '说明：文件内容已完整提取，保留原文不删减。'
      ]
    },
    {
      label: '📅 查看日报',
      user: '查看今天日报',
      bot: [
        '📑 Review / 2026-08-16-解析汇总.md',
        '今日处理碎片：2 条',
        '| 1 | 示例截图 | 个人成长 | 📥 + 📝 |',
        '| 2 | 示例链接 | AI 副业 | 📥 + 📝 |',
        '待人工确认：0 项'
      ]
    }
  ];

  function el(tag, cls, text) {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function scrollBottom() {
    chat.scrollTop = chat.scrollHeight;
  }

  function addUser(text) {
    chat.appendChild(el('div', 'msg user', text));
    scrollBottom();
  }

  function addTyping() {
    const t = el('div', 'msg bot typing', '正在处理…');
    chat.appendChild(t);
    scrollBottom();
    return t;
  }

  function typeBot(text, delay) {
    return new Promise(function (resolve) {
      const msg = el('div', 'msg bot', '');
      chat.appendChild(msg);
      let i = 0;
      function tick() {
        if (i <= text.length) {
          msg.textContent = text.slice(0, i);
          i++;
          scrollBottom();
          setTimeout(tick, 14);
        } else {
          resolve();
        }
      }
      setTimeout(tick, delay || 220);
    });
  }

  function run(preset) {
    addUser(preset.user);
    const typing = addTyping();
    setTimeout(function () {
      typing.remove();
      const items = preset.bot;
      let p = Promise.resolve();
      items.forEach(function (line) {
        p = p.then(function () { return typeBot(line, 200); });
      });
      p.then(function () {
        chat.appendChild(el('div', 'msg bot', '（演示模式 · 以上为脚本回放，非真实处理）'));
        scrollBottom();
      });
    }, 500);
  }

  presets.forEach(function (p) {
    const b = el('button', 'preset', p.label);
    b.addEventListener('click', function () { run(p); });
    presetsEl.appendChild(b);
  });
})();