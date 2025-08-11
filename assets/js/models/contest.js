// 比赛数据模型

export class Contest {
    constructor(data) {
        this.id = data.id;
        this.title = data.title;
        this.platformName = data.platformName;
        this.startTime = data.startTime;
        this.endTime = data.endTime;
        this.status = data.status;
        this.url = data.url;
        this.duration = data.duration;
        this.type = data.type;
        this.phase = data.phase;
    }

    // 验证比赛数据
    static validate(data) {
        const required = ['id', 'title', 'platformName', 'startTime', 'url'];
        for (const field of required) {
            if (!data[field]) {
                throw new Error(`Missing required field: ${field}`);
            }
        }
        return true;
    }

    // 获取比赛状态
    getStatus() {
        return this.status;
    }

    // 检查比赛是否即将开始
    isUpcoming() {
        return this.status === 'upcoming';
    }

    // 检查比赛是否正在进行
    isOngoing() {
        return this.status === 'ongoing';
    }

    // 检查比赛是否正在进行系统测试
    isSystemTest() {
        return this.status === 'system_test';
    }

    // 检查比赛是否已结束
    isFinished() {
        return this.status === 'finished';
    }

    // 获取开始时间
    getStartTime() {
        return new Date(this.startTime);
    }

    // 获取结束时间
    getEndTime() {
        return new Date(this.endTime);
    }

    // 获取持续时间（分钟）
    getDurationMinutes() {
        return Math.floor(this.duration / 60);
    }

    // 获取持续时间（小时）
    getDurationHours() {
        return Math.floor(this.duration / 3600);
    }

    // 获取倒计时文本
    getCountdownText() {
        if (this.isFinished()) return '已结束';
        if (this.isOngoing()) return '进行中';
        
        const now = new Date();
        const start = this.getStartTime();
        const diff = start - now;
        
        if (diff <= 0) return '即将开始';
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        
        if (days > 0) return `${days}天 ${hours}小时`;
        if (hours > 0) return `${hours}小时 ${minutes}分钟`;
        return `${minutes}分钟`;
    }

    // 转换为普通对象
    toObject() {
        return {
            id: this.id,
            title: this.title,
            platformName: this.platformName,
            startTime: this.startTime,
            endTime: this.endTime,
            status: this.status,
            url: this.url,
            duration: this.duration,
            type: this.type,
            phase: this.phase
        };
    }

    // 获取平台信息
    getPlatformInfo() {
        return {
            name: this.platformName
        };
    }
}

// 比赛状态枚举
export const ContestStatus = {
    UPCOMING: 'upcoming',
    ONGOING: 'ongoing',
    SYSTEM_TEST: 'system_test',
    FINISHED: 'finished'
};

// 比赛平台枚举
export const ContestPlatform = {
    CODEFORCES: 'codeforces',
    LEETCODE: 'leetcode',
    ATCODER: 'atcoder',
    NIUKE: 'niuke'
}; 