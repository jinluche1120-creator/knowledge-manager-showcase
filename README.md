# 知识管家 · 公开演示站

这是一个**纯静态单页演示站**，用于公开展示「知识管家」Agent 的功能、工作流程与能力边界。

> ⚠️ 本页面**不连接真实 Agent**、不接任何 API、不含任何凭证或真实数据。体验区对话全部由前端脚本回放。

## 目录结构

```text
knowledge-manager-showcase/
├─ index.html          # 页面结构
├─ assets/
│  ├─ style.css        # 样式（无外部依赖）
│  └─ demo.js          # 体验区脚本（纯前端回放，无网络请求）
└─ README.md           # 本说明
```

## 三种部署方式（任选其一）

### 方式一：GitHub Pages（推荐，URL 稳定）

1. 新建一个**公开**仓库，把本目录内容推上去。
2. 仓库 `Settings → Pages → Source` 选择 `Deploy from a branch`，分支选 `main`，目录选 `/ (root)`。
3. 保存后等待 1 分钟，得到链接：
   `https://<你的用户名>.github.io/<仓库名>/`

### 方式二：Netlify Drop（最快出链接）

1. 打开 <https://app.netlify.com/drop>。
2. 把整个 `knowledge-manager-showcase` 文件夹拖进去。
3. 几秒后即可得到公开链接。

### 方式三：Vercel（拖拽或 CLI）

1. 打开 <https://vercel.com/new>，导入本目录。
2. 框架选 `Other`，无需构建命令，直接 Deploy。

## 如何替换演示内容

- 修改 `index.html` 中各 `<section>` 的文案，即可更新功能说明、能力边界、FAQ。
- 修改 `assets/demo.js` 顶部的 `presets` 数组，即可更新体验区的对话脚本。
- 修改 `assets/style.css` 顶部的 CSS 变量（`--accent`、`--bg` 等）可更换主题色。

## 数据安全红线（务必遵守）

公开前请确认页面里**不包含**以下内容：

- 飞书 App ID / App Secret
- 用户 open_id / user_id / chat_id / 群 ID
- DeepSeek API Key、base_url、`.env` 内容
- 真实本地绝对路径（如 `C:\Users\...`）
- 真实笔记中的隐私信息（真实人名、联系方式、公司名等）

当前版本已按上述红线做脱敏处理，路径统一使用相对/示意写法。