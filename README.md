<div align="center">
  <img src="assets/favicon.svg" alt="CListHub Logo" width="200" height="200"/>
  <br>
  <em>🎯 CListHub · 算法竞赛信息聚合网站</em>
  <br>
</div>
<br>

<p align="center">
  <a href="https://clisthub.com">
    <img src="https://img.shields.io/badge/🌐_Website-4A90E2?style=for-the-badge" alt="Website"/>
  </a>
  <img src="https://img.shields.io/badge/🚧_Under_Development-orange?style=for-the-badge" alt="Under Development"/>
  <br>
  
</p>
  
## 功能

- **多平台聚合**: LeetCode、Codeforces、AtCoder、牛客等
- **实时倒计时**: 显示距离比赛开始的倒计时
- **智能搜索**: 按比赛名称和平台搜索
- **平台筛选**: 快速筛选特定平台比赛

## 项目结构

```
ojslist/
├── index.html              # 主页面
├── config.js               # 配置文件
├── build.js                # 平台构建脚本
├── assets/                 # 资源文件夹
│   ├── css                 # 样式
│   └── js                  # 前后台逻辑
└── README.md               # 项目说明（local）
```

## 支持的平台

| Platform   | logo | color |
| ---------- | ---- | ----- |
| LeetCode   | <img src="https://img.shields.io/badge/LeetCode-%F0%9F%93%8B_Planned-FFA116?style=flat&logo=leetcode&logoColor=black" alt="LeetCode"/>        | 橙色 |
| Codeforces | <img src="https://img.shields.io/badge/Codeforces-1F8ACB?style=flat&logo=codeforces&logoColor=white" alt="Codeforces"/>  | 蓝色 | 
| AtCoder    | <img src="https://img.shields.io/badge/AtCoder-%F0%9F%93%8B_Planned-red?style=flat&logo=atcoder&logoColor=white" alt="AtCoder"/>              | 红色 |
| 牛客竞赛    | <img src="https://img.shields.io/badge/NowCoder-%F0%9F%93%8B_Planned-2E8B57?style=flat&logoColor=white" alt="NowCoder"/>                      | 绿色 |

## 快速开始

1. 克隆项目
2. 运行 `npm start` 启动服务或直接预览 `index.html`

## 开发配置

### 添加平台

在 `config.js` 的 `PLATFORMS` 中添加：

```javascript
{
    name: "新平台",
    key: "newplatform",
    color: "#your-color",
    icon: "fas fa-star"
}
```

### 添加比赛

在 `config.js` 的 `SAMPLE_CONTESTS` 中添加：

```javascript
{
    id: 9,
    title: "新比赛",
    platform: "newplatform",
    startTime: "2024-01-25T10:00:00Z",
    endTime: "2024-01-25T12:00:00Z",
    status: "upcoming",
    url: "https://example.com"
}
```

## 数据结构

每个比赛对象包含：

```javascript
{
    id: Number,           // 唯一标识
    title: String,        // 比赛标题
    platform: String,     // 平台标识
    startTime: String,    // 开始时间
    endTime: String,      // 结束时间
    status: String,       // 状态
    url: String          // 比赛链接
}
```

## 测试部署

- 本地预览：`npm start` 或 Live Server
- 生产部署：`npm run build` 打包

## 开发计划

- [ ] 更多平台支持
- [ ] 添加日历提醒功能 (.ics)
- [ ] 多语言 / i18n
- [ ] 比赛详细数据的展示模块
- [ ] 用户个性化和 UGC 模块
- [ ] API 接口开放
- [ ] 其他
 
## 贡献

- 欢迎提交 Issue 和 Pull Request！完善本项目。

## 相关链接

- [Codeforces](https://codeforces.com) 
- [AtCoder](https://atcoder.jp)
- [牛客竞赛](https://ac.nowcoder.com)
- [LeetCode 中国](https://leetcode.cn)
- [Kenkoooo](https://kenkoooo.com/atcoder) - AtCoder Problem List
