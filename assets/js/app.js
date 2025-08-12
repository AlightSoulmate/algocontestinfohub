// 主要应用逻辑
import ContestService from './services/contestService.js';
import { Contest } from './models/contest.js';
import { DateUtils } from './utils/dateUtils.js';

// 创建服务实例
const contestService = new ContestService();

// 平台图标映射
const platformIcons = {
    'Codeforces': 'fas fa-fire',
    'AtCoder': 'fas fa-robot',
    'LeetCode': 'fas fa-code',
    '牛客': 'fas fa-graduation-cap',
};

// 平台CSS类名映射
const platformClasses = {
    'Codeforces': 'codeforces',
    'AtCoder': 'atcoder',
    'LeetCode': 'leetcode',
    '牛客': 'niuke',
};

// 状态颜色映射
const statusColors = {
    upcoming: 'status-upcoming',
    ongoing: 'status-ongoing',
    system_test: 'status-system_test',
    finished: 'status-finished'
};

// 状态文本映射
const statusTexts = {
    upcoming: 'Upcoming',
    ongoing: 'Ongoing',
    system_test: 'Ended(System Test)',
    finished: 'Ended'
};

// 全局变量
let filteredContests = [];
let currentFilter = 'all';
let isLoading = false;

// 主应用类
class ContestApp {
    constructor() {
        this.init();
    }

    // 初始化应用
    async init() {
        try {
            await this.loadContests();
            this.setupEventListeners();
            this.startCountdown();
        } catch (error) {
            this.showError('应用初始化失败: ' + error.message);
        }
    }

    // 设置事件监听器
    setupEventListeners() {
        // 搜索功能
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', this.handleSearch.bind(this));
        }

        // 平台筛选
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', this.handleFilter.bind(this));
        });
    }

    // 加载比赛数据
    async loadContests() {
        try {
            isLoading = true;
            
            const contests = await contestService.getCachedContests();
            
            if (!contests || contests.length === 0) {
                this.showError('没有获取到比赛数据，请检查网络连接或稍后重试');
                return;
            }
            
            // 转换为 Contest 对象
            filteredContests = contests.map(contestData => new Contest(contestData));
            
            this.renderContests();
            this.updateStats();
            
        } catch (error) {
            console.error('加载比赛数据时发生错误:', error);
            this.showError('加载比赛数据失败: ' + error.message);
        } finally {
            isLoading = false;
        }
    }

    // 处理搜索
    handleSearch() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        const filtered = filteredContests.filter(contest => 
            contest.title.toLowerCase().includes(searchTerm) ||
            contest.platformName.toLowerCase().includes(searchTerm)
        );
        this.renderContests(filtered);
        this.updateStats(filtered);
    }

    // 处理平台筛选
    handleFilter(e) {
        const platform = e.target.dataset.platform;
        
        // 更新按钮状态
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        
        currentFilter = platform;
        this.filterContests();
    }

    // 筛选比赛
    filterContests() {
        let filtered = [...filteredContests];
        
        if (currentFilter !== 'all') {
            // 根据平台名称筛选
            filtered = filtered.filter(contest => {
                const platformName = contest.platformName;
                return platformName === currentFilter;
            });
        }
        
        this.renderContests(filtered);
        this.updateStats(filtered);
    }

    // 渲染比赛列表
    renderContests(contests = filteredContests) {
        const container = document.getElementById('contestsContainer');
        if (!container) return;

        if (contests.length === 0) {
            container.innerHTML = '<div class="no-contests"><i>No contest information</i></div>';
            return;
        }

        container.innerHTML = contests.map(contest => this.createContestCard(contest)).join('');
    }

    // 创建比赛卡片HTML
    createContestCard(contest) {
        const countdownHtml = contest.isUpcoming() ? `
            <div class="countdown">
                <div class="countdown-title">Time to Start</div>
                <div class="countdown-time" id="countdown-${contest.id}">${contest.getCountdownText()}</div>
            </div>
        ` : '';
        
        // 获取平台图标和CSS类名
        const platformIcon = platformIcons[contest.platformName] || 'fas fa-question';
        const platformClass = platformClasses[contest.platformName] || 'default';
        
        return `
            <div class="contest-card">
                <div class="contest-header">
                    <div class="platform-icon ${platformClass}">
                        <i class="${platformIcon}"></i>
                    </div>
                    <div>
                        <div class="contest-title">${contest.title}</div>
                        <div class="contest-platform">${contest.platformName}</div>
                    </div>
                </div>
                
                <div class="contest-time">
                    <div class="time-label">Start Time</div>
                    <div class="time-value">${DateUtils.formatTime(contest.startTime)}</div>
                </div>
                
                <div class="contest-time">
                    <div class="time-label">End Time</div>
                    <div class="time-value">${DateUtils.formatTime(contest.endTime)}</div>
                </div>
                
                ${countdownHtml}
                
                <div class="contest-status ${statusColors[contest.status]}">
                    ${statusTexts[contest.status]}
                </div>
                
                <a href="${contest.url}" target="_blank" class="contest-link">
                    <i class="fas fa-external-link-alt"></i> Go Registry
                </a>
            </div>
        `;
    }

    // 更新统计信息
    updateStats(contests = filteredContests) {
        const total = contests.length;
        const upcoming = contests.filter(c => c.isUpcoming()).length;
        const ongoing = contests.filter(c => c.isOngoing()).length;
        const finished = contests.filter(c => c.isFinished() || c.isSystemTest()).length;
        
        const totalElement = document.getElementById('totalContests');
        const upcomingElement = document.getElementById('upcomingContests');
        const ongoingElement = document.getElementById('ongoingContests');
        const finishedElement = document.getElementById('finishedContests');
        
        if (totalElement) totalElement.textContent = total;
        if (upcomingElement) upcomingElement.textContent = upcoming;
        if (ongoingElement) ongoingElement.textContent = ongoing;
        if (finishedElement) finishedElement.textContent = finished;
    }

    // 开始倒计时
    startCountdown() {
        setInterval(() => {
            filteredContests.forEach(contest => {
                if (contest.isUpcoming()) {
                    const countdownElement = document.getElementById(`countdown-${contest.id}`);
                    if (countdownElement) {
                        countdownElement.textContent = contest.getCountdownText();
                    }
                }
            });
        }, 1000);
    }

    showError(message) {
        console.error(message);
    }

    showSuccess(message) {
        console.log(message);
    }
}

// 页面加载完成后初始化应用
document.addEventListener('DOMContentLoaded', () => {
    new ContestApp();
});

// 导出到全局作用域（如果需要）
if (typeof window !== 'undefined') {
    window.ContestApp = ContestApp;
} 