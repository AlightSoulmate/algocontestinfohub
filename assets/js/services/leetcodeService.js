// LeetCode

class LeetCodeService {
    constructor() {
        this.baseUrl = 'https://leetcode.com';
        this.platformName = 'LeetCode';
    }
    // https://alfa-leetcode-api.onrender.com/chang-an-16x/contest/history
    // 获取比赛列表
    async getContests() {
        try {
            // LeetCode 使用 GraphQL API
            const query = `
                query {
                    contestUpcomingContests {
                        title
                        titleSlug
                        startTime
                        duration
                        isVirtual
                        contestType
                    }
                }
            `;
            
            const response = await fetch(`${this.baseUrl}/graphql`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query })
            });
            
            const data = await response.json();
            
            if (data.data && data.data.contestUpcomingContests) {
                return this.transformData(data.data.contestUpcomingContests);
            } else {
                throw new Error('LeetCode API 返回数据格式错误');
            }
        } catch (error) {
            console.error('获取 LeetCode 比赛数据失败:', error);
            return [];
        }
    }

    // 转换数据格式
    transformData(contests) {
        // 取最近 10 场比赛
        contests = contests.slice(0, 10);

        const transformed = contests.map(contest => ({
            id: contest.titleSlug,
            title: contest.title,
            platformName: this.platformName,
            startTime: new Date(contest.startTime * 1000).toISOString(),
            endTime: new Date((contest.startTime + contest.duration) * 1000).toISOString(),
            status: this.getContestStatus(contest.startTime),
            url: `${this.baseUrl}/contest/${contest.titleSlug}`,
            duration: contest.duration,
            type: contest.contestType || 'weekly',
            phase: contest.startTime > Date.now() / 1000 ? 'BEFORE' : 'CODING'
        }))
        .sort((a, b) => new Date(b.startTime) - new Date(a.startTime));
        
        return transformed;
    }

    // 获取比赛状态
    getContestStatus(startTime) {
        const now = Date.now() / 1000;
        if (startTime > now) {
            return 'upcoming';
        } else if (startTime + 7200 > now) { // 假设比赛持续2小时
            return 'ongoing';
        } else {
            return 'finished';
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

export default LeetCodeService; 