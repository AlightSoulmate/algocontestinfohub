// 平台配置文件

// 平台配置
const PLATFORMS = {
    leetcode: {
        name: "LeetCode",
        icon: "fas fa-code",
        color: "#ffa116",
        url: "https://leetcode.cn/contest/",
        description: "全球知名的算法学习平台",
        enabled: false
    },
    codeforces: {
        name: "Codeforces",
        icon: "fas fa-fire",
        color: "#3b5998",
        url: "https://codeforces.com",
        description: "俄罗斯顶级算法竞赛平台",
        enabled: true
    },
    atcoder: {
        name: "AtCoder",
        icon: "fas fa-robot",
        color: "#ff6b6b",
        url: "https://atcoder.jp",
        description: "日本算法竞赛平台",
        enabled: false
    },
    niuke: {
        name: "牛客",
        icon: "fas fa-graduation-cap",
        color: "#00b894",
        url: "https://ac.nowcoder.com",
        description: "中国知名算法竞赛平台",
        enabled: false
    }
    // 在这里添加更多平台  
};

// 比赛状态配置
const CONTEST_STATUS = {
    upcoming: {
        text: "Upcoming",
        color: "status-upcoming",
        icon: "fas fa-clock",
        description: "Upcoming"
    },
    ongoing: {
        text: "Ongoing",
        color: "status-ongoing",
        icon: "fas fa-play",
        description: "Ongoing"
    },
    system_test: {
        text: "Ended(System Test)",
        color: "status-system_test",
        icon: "fas fa-check",
        description: "Ended(System Test)"
    },
    finished: {
        text: "Ended",
        color: "status-finished",
        icon: "fas fa-check",
        description: "Ended"
    }
};

// 网站配置
const SITE_CONFIG = {
    title: "Algo Contest Info Hub",
    description: "All contests in one place",
    timezone: "Asia/Shanghai",
    updateInterval: 1 * 60 * 60 * 1000, // 数据更新间隔（1小时）
    countdownInterval: 1000, // 倒计时更新间隔（1秒）
    maxContests: 100, // 最大显示比赛数量
    enableNotifications: true, // 是否启用通知
    enableAutoRefresh: true, // 是否启用自动刷新
    cacheTimeout: 0.9 * 60 * 60 * 1000, // 0.9小时缓存
    maxCacheSize: 100 // 最大缓存条目数
};

// API 配置
const API_CONFIG = {
    CODEFORCES: {
        BASE_URL: 'https://codeforces.com/api',
        CONTEST_LIST: '/contest.list',
        TIMEOUT: 10000, // 10秒超时
    },
    TIMEOUT: 10000, // 默认超时时间
    RETRY_ATTEMPTS: 3 // 重试次数
};

// 本地化配置
const LOCALE_CONFIG = {
    LANGUAGE: 'zh-CN',
    TIMEZONE: 'Asia/Shanghai',
    DATE_FORMAT: {
        SHORT: 'YYYY-MM-DD',
        LONG: 'YYYY年MM月DD日',
        TIME: 'HH:mm',
        DATETIME: 'YYYY-MM-DD HH:mm',
    }
};

// 错误消息配置
const MESSAGES_CONFIG = {
    ERROR: {
        NETWORK: '网络连接失败，请检查网络设置',
        API_ERROR: 'API 请求失败，请稍后重试',
        LOADING_FAILED: '数据加载失败，请刷新页面',
        REFRESH_FAILED: '刷新失败，请稍后重试',
    },
    SUCCESS: {
        REFRESHED: '数据已刷新',
        LOADED: '数据加载完成',
    },
    INFO: {
        LOADING: '正在加载数据...',
        NO_DATA: '暂无比赛数据',
        NO_MATCH: '没有找到匹配的比赛',
    }
};

// 开发环境配置
const DEV_CONFIG = {
    DEBUG: true,
    LOG_LEVEL: 'info',
    MOCK_DATA: false,
    API_TIMEOUT: 5000,
};

// 生产环境配置
const PROD_CONFIG = {
    DEBUG: false,
    LOG_LEVEL: 'error',
    MOCK_DATA: false,
    API_TIMEOUT: 10000,
};

// 获取环境配置
const getConfig = () => {
    const isDev = window.location.hostname === 'localhost' || 
                  window.location.hostname === '127.0.0.1' ||
                  window.location.protocol === 'file:';
    
    return {
        PLATFORMS,
        CONTEST_STATUS,
        SITE_CONFIG,
        API_CONFIG,
        LOCALE_CONFIG,
        MESSAGES_CONFIG,
        ...(isDev ? DEV_CONFIG : PROD_CONFIG)
    };
};

// 导出配置（如果使用模块系统）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        PLATFORMS,
        CONTEST_STATUS,
        SITE_CONFIG,
        API_CONFIG,
        LOCALE_CONFIG,
        MESSAGES_CONFIG,
        DEV_CONFIG,
        PROD_CONFIG,
        getConfig
    };
}

// 全局变量（如果不使用模块系统）
if (typeof window !== 'undefined') {
    window.PLATFORMS = PLATFORMS;
    window.CONTEST_STATUS = CONTEST_STATUS;
    window.SITE_CONFIG = SITE_CONFIG;
    window.API_CONFIG = API_CONFIG;
    window.LOCALE_CONFIG = LOCALE_CONFIG;
    window.MESSAGES_CONFIG = MESSAGES_CONFIG;
    window.getConfig = getConfig;
} 