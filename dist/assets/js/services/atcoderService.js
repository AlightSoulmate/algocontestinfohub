// AtCoder 平台服务

class AtCoderService {
    constructor() {
        this.baseUrl = 'https://atcoder.jp';
        this.platformName = 'AtCoder';
    }

    // 获取比赛列表
    async getContests() {
        try {
            // AtCoder 使用不同的 API 端点
            const response = await fetch(`${this.baseUrl}/api/v2/contests`);
            const data = await response.json();
            
            if (data && Array.isArray(data)) {
                return this.transformData(data);
            } else {
                throw new Error('AtCoder API 返回数据格式错误');
            }
        } catch (error) {
            console.error('获取 AtCoder 比赛数据失败:', error);
            return [];
        }
    }

    // 转换数据格式
    transformData(contests) {
        // 取最近 10 场比赛
        contests = contests.slice(0, 10);

        const transformed = contests.map(contest => ({
            id: contest.id,
            title: contest.title,
            platformName: this.platformName,
            startTime: new Date(contest.start_epoch_second * 1000).toISOString(),
            endTime: new Date((contest.start_epoch_second + contest.duration_second) * 1000).toISOString(),
            status: this.getContestStatus(contest.phase),
            url: `${this.baseUrl}/contests/${contest.id}`,
            duration: contest.duration_second,
            type: contest.contest_type || 'regular',
            phase: contest.phase
        }))
        .sort((a, b) => new Date(b.startTime) - new Date(a.startTime));
        
        return transformed;
    }

    // 获取比赛状态
    getContestStatus(phase) {
        switch (phase) {
            case 'BEFORE':
                return 'upcoming';
            case 'CODING':
                return 'ongoing';
            case 'FINISHED':
                return 'finished';
            default:
                return 'upcoming';
        }
    }

    // 获取平台信息
    getPlatformInfo() {
        return {
            name: this.platformName,
            baseUrl: this.baseUrl,
            enabled: true
        };
    }
}

export default AtCoderService; 