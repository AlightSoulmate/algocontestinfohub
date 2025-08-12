// Codeforces

class CodeforcesService {
    constructor() {
        this.baseUrl = 'https://codeforces.com/api';
        this.platformName = 'Codeforces';
    }

    // 获取比赛列表
    async getContests() {
        try {
            const response = await fetch(`${this.baseUrl}/contest.list`);
            const data = await response.json();
            
            if (data.status === 'OK') {
                return this.transformData(data.result);
            } else {
                throw new Error(`Codeforces API 返回错误: ${data.status}`);
            }
        } catch (error) {
            console.error('获取 Codeforces 比赛数据失败:', error);
            return [];
        }
    }

    // 转换数据格式
    transformData(contests) {
        // 取最近 10 场比赛
        contests = contests.slice(0, 10);

        const transformed = contests.map(contest => ({
            id: contest.id,
            title: contest.name,
            platformName: this.platformName,
            startTime: new Date(contest.startTimeSeconds * 1000).toISOString(),
            endTime: new Date((contest.startTimeSeconds + contest.durationSeconds) * 1000).toISOString(),
            status: this.getContestStatus(contest.phase),
            url: `https://codeforces.com/contest/${contest.id}`,
            duration: contest.durationSeconds,
            type: contest.type,
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
            case 'PENDING_SYSTEM_TEST':
            case 'SYSTEM_TEST':
                return 'system_test';
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
            enabled: this.enabled
        };
    }
}

export default CodeforcesService; 