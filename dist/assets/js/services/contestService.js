// 比赛服务层 - 处理多平台 API 调用和数据转换

import PlatformManager from './platformManager.js';

class ContestService {
    constructor() {
        this.platformManager = new PlatformManager();
        this.cache = new Map();
        this.cacheTimeout = 1 * 60 * 60 * 1000; // 1小时缓存
    }

    // 获取指定平台的比赛列表
    async getPlatformContests(platformName) {
        const platformService = this.platformManager.getPlatformService(platformName);
        if (!platformService) {
            console.warn(`平台 ${platformName} 不存在`);
            return [];
        }

        try {
            return await platformService.getContests();
        } catch (error) {
            console.error(`获取 ${platformName} 比赛数据失败:`, error);
            return [];
        }
    }

    // 获取所有平台的比赛数据
    async getAllContests() {
        try {
            const enabledServices = this.platformManager.getEnabledPlatformServices();
            const platformPromises = enabledServices.map(service => 
                service.getContests().catch(error => {
                    console.error(`获取 ${service.platformName} 数据失败:`, error);
                    return [];
                })
            );

            const results = await Promise.all(platformPromises);
            
            // 合并所有平台的比赛数据
            const allContests = results.flat();
            const sortedContests = allContests.sort((a, b) => new Date(b.startTime) - new Date(a.startTime));
            
            return sortedContests;
        } catch (error) {
            console.error('获取所有比赛数据失败:', error);
            return [];
        }
    }

    // 获取指定平台的比赛数据
    async getContestsByPlatform(platformName) {
        return await this.getPlatformContests(platformName);
    }

    // 启用/禁用平台
    setPlatformEnabled(platformName, enabled) {
        this.platformManager.setPlatformEnabled(platformName, enabled);
    }

    // 获取平台状态
    getPlatformStatus() {
        return this.platformManager.getAllPlatforms();
    }

    // 获取启用的平台
    getEnabledPlatforms() {
        return this.platformManager.getEnabledPlatforms();
    }

    // 带缓存的比赛数据获取
    async getCachedContests() {
        const now = Date.now();
        const cached = this.cache.get('contests');
        
        if (cached && (now - cached.timestamp) < this.cacheTimeout) {
            return cached.data;
        }

        const contests = await this.getAllContests();
        
        this.cache.set('contests', {
            data: contests,
            timestamp: now
        });
        
        return contests;
    }

    // 清除缓存
    clearCache() {
        this.cache.clear();
    }

    // 刷新比赛数据
    async refreshContests() {
        this.clearCache();
        return await this.getCachedContests();
    }

    // 获取缓存状态
    getCacheStatus() {
        const cached = this.cache.get('contests');
        if (!cached) return { hasCache: false, age: null };
        
        const age = Date.now() - cached.timestamp;
        return {
            hasCache: true,
            age: Math.round(age / 1000),
            remaining: Math.round((this.cacheTimeout - age) / 1000)
        };
    }

    // 添加自定义平台
    addCustomPlatform(platformName, platformConfig) {
        this.platformManager.addCustomPlatform(platformName, platformConfig);
    }

    // 移除平台
    removePlatform(platformName) {
        this.platformManager.removePlatform(platformName);
    }

    // 获取平台管理器实例（用于高级操作）
    getPlatformManager() {
        return this.platformManager;
    }
}

// 导出服务实例
export default new ContestService(); 