# 算法竞赛信息聚合网站

一个现代化的算法竞赛平台信息聚合网站，帮助算法竞赛爱好者不错过任何一场比赛。

## 🚀 功能特性

### ✨ 核心功能

- **多平台聚合**: 支持 LeetCode、Codeforces、AtCoder、牛客等主流平台
- **实时倒计时**: 显示距离比赛开始的精确倒计时
- **智能搜索**: 支持按比赛名称和平台名称搜索
- **平台筛选**: 可快速筛选特定平台的比赛

### 📊 数据展示

- **统计面板**: 实时显示比赛总数和各状态比赛数量
- **比赛卡片**: 清晰展示比赛信息，包括时间、状态、链接等
- **时区支持**: 自动转换为中国时区显示

## 🛠️ 技术实现

- **前端**: 纯 HTML5 + CSS3 + JavaScript
- **样式**: 使用 CSS Grid 和 Flexbox 布局
- **图标**: Font Awesome 图标库
- **响应式**: CSS Media Queries 实现移动端适配

## 📱 支持的平台

| 平台       | 图标 | 颜色主题       |
| ---------- | ---- | -------------- |
| LeetCode   | 💻   | 橙色 (#ffa116) |
| Codeforces | 🔥   | 蓝色 (#3b5998) |
| AtCoder    | 🤖   | 红色 (#ff6b6b) |
| 牛客       | 🎓   | 绿色 (#00b894) |

## 🚀 快速开始

1. **克隆项目**

   ```bash
   git clone [项目地址]
   cd ojslist
   ```

2. **打开网站**

   - 直接预览 `index.html` 文件或 `npm run start` 启动

3. **开始使用**
   - 浏览所有比赛信息
   - 使用搜索功能查找特定比赛
   - 点击平台按钮筛选比赛
   - 点击"查看详情"跳转到原平台

## 🔧 自定义配置

### 添加新平台

在 `config.js` 的 `PLATFORMS` 中添加新的平台配置：

```javascript
{
    name: "新平台",
    key: "newplatform",
    color: "#your-color",
    icon: "fas fa-star"
}
```

### 添加新比赛

在 `config.js` 的 `SAMPLE_CONTESTS` 中添加新的比赛数据：

```javascript
{
    id: 9,
    title: "新平台比赛",
    platform: "newplatform",
    platformName: "新平台",
    startTime: "2024-01-25T10:00:00Z",
    endTime: "2024-01-25T12:00:00Z",
    status: "upcoming",
    url: "https://example.com/contest"
}
```

### 修改网站配置

在 `config.js` 的 `SITE_CONFIG` 中修改网站设置：

```javascript
const SITE_CONFIG = {
  title: "你的网站标题",
  description: "你的网站描述",
  theme: "light", // 或 "dark"
};
```

## 📊 数据结构

每个比赛对象包含以下字段：

```javascript
{
    id: Number,           // 唯一标识符
    title: String,        // 比赛标题
    platform: String,     // 平台标识符
    platformName: String, // 平台显示名称
    startTime: String,    // 开始时间 (ISO 8601 格式)
    endTime: String,      // 结束时间 (ISO 8601 格式)
    status: String,       // 状态: "upcoming" | "ongoing" | "finished"
    url: String          // 比赛链接
}
```

## 🌟 未来计划

- [ ] 集成真实 API 数据源
- [ ] 添加比赛提醒功能
- [ ] 支持用户订阅特定平台
- [ ] 添加比赛历史记录
- [ ] 支持多语言切换
- [ ] 添加比赛难度评级
- [ ] 集成比赛结果查询

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📚 相关文档

- **[PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)** - 开发指南和项目结构说明
- **[README.md](README.md)** - 用户使用说明（本文件）

---

⭐ 如果这个项目对你有帮助，请给它一个星标！
