# 项目结构说明

## 📁 文件结构

```
ojslist/
├── index.html              # 主页面文件（重构后，只包含HTML结构）
├── config.js               # 配置文件
├── assets/                 # 资源文件夹
│   ├── css/               # CSS样式文件
│   │   └── style.css      # 主要样式文件
│   └── js/                # JavaScript文件
│       └── app.js         # 主要应用逻辑
├── README.md               # 项目说明文档
└── PROJECT_STRUCTURE.md    # 项目结构说明（本文件）
```

## 🏗️ 架构设计

### 数据流

```
用户操作 → 事件监听 → 数据筛选 → 界面更新 → 用户反馈
    ↓
搜索输入、平台筛选、实时倒计时等
```

## 🛠️ 开发环境

### 本地开发

1. 克隆项目到本地
2. 浏览器打开 `index.html` 或 `npm run dev`
3. 使用浏览器开发者工具调试

## 📝 代码规范

### HTML 规范

- 使用语义化标签 (`<header>`, `<main>`, `<section>`)
- 保持结构清晰，添加适当注释
- 确保可访问性 (accessibility)

## 🔧 开发指南

### 添加新功能

1. 在 `index.html` 中添加 HTML 结构
2. 在 `assets/css` 中添加样式
3. 在 `assets/js` 中添加逻辑

### 添加新平台

1. 在 `config.js` 的 `PLATFORMS` 中添加配置
2. 在 `index.html` 中添加平台筛选按钮
3. 在 `assets/css/style.css` 中添加平台样式

## 🚀 构建部署

### 本地测试

```bash
# 使用 Python 简单服务器
python -m http.server 8000

# 使用 Node.js http-server
npx http-server

# 使用 Live Server (VS Code 扩展)
```

### 生产部署

1. 压缩 CSS 和 JavaScript 文件
2. 优化图片资源
3. 配置正确的 MIME 类型
4. 启用 HTTPS 和 Gzip 压缩

### 性能优化

- 启用浏览器缓存
- 使用 CDN 加速静态资源
- 代码分割和懒加载
- 图片懒加载和压缩

## 🧪 测试策略

### 功能测试

- 搜索功能测试
- 平台筛选测试
- 响应式布局测试
- 跨浏览器兼容性测试

### 性能测试

- 页面加载速度
- 内存使用情况
- 动画流畅度

## 📚 扩展开发

### 技术升级路径

- 引入构建工具 (Webpack, Vite)
- 添加 TypeScript 支持
- 使用现代框架 (Vue.js, React)
- 实现 PWA 功能

### 代码质量提升

- 添加 ESLint 代码检查
- 使用 Prettier 格式化
- 编写单元测试
- 实现自动化部署

---

> **注意**: 本文档专注于开发指南，用户使用说明请参考 `README.md`
