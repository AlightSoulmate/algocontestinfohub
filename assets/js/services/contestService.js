// 综合服务层 - 处理 API 调用和数据转换

import CodeforcesService from './codeforcesService.js';
import AtCoderService from './atcoderService.js';
import LeetCodeService from './leetcodeService.js';

class ContestService {
    constructor() {
        this.platforms = new Map();
        this.initializePlatforms();
        this.cache = new Map();
        this.cacheTimeout = 5 * 60 * 1000; // 5分钟缓存
        this.loadCacheFromStorage(); // 从 localStorage 加载缓存
    }

    // 初始化平台服务
    initializePlatforms() {
        this.platforms.set('codeforces', new CodeforcesService());
        this.platforms.set('atcoder', new AtCoderService());
        this.platforms.set('leetcode', new LeetCodeService());
        
        // 设置平台启用状态
        this.setPlatformEnabled('codeforces', true);
        this.setPlatformEnabled('atcoder', false);
        this.setPlatformEnabled('leetcode', false);
    }

    // 从 localStorage 加载缓存
    loadCacheFromStorage() {
        try {
            const stored = localStorage.getItem('contestCache');
            if (stored) {
                const parsed = JSON.parse(stored);
                const now = Date.now();
                
                // 检查缓存是否过期
                if (parsed.timestamp && (now - parsed.timestamp) < this.cacheTimeout) {
                    this.cache.set('contests', parsed);
                    console.log(`从 localStorage 恢复缓存 (${parsed.data.length}条)`);
                } else {
                    console.log('localStorage 中的缓存已过期，清除');
                    localStorage.removeItem('contestCache');
                }
            }
        } catch (error) {
            console.warn('加载缓存失败:', error);
            localStorage.removeItem('contestCache');
        }
    }

    // 保存缓存到 localStorage
    saveCacheToStorage() {
        try {
            const cached = this.cache.get('contests');
            if (cached) {
                localStorage.setItem('contestCache', JSON.stringify(cached));
            }
        } catch (error) {
            console.warn('保存缓存失败:', error);
        }
    }

    // 获取指定平台的比赛列表
    async getPlatformContests(platformName) {
        const platformService = this.platforms.get(platformName);
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
            const enabledServices = Array.from(this.platforms.values()).filter(service => service.enabled);
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

    // 启用/禁用平台
    setPlatformEnabled(platformName, enabled) {
        const service = this.platforms.get(platformName);
        if (service) {
            service.enabled = enabled;
        }
    }

    // 获取平台状态
    getPlatformStatus() {
        const platforms = {};
        for (const [name, service] of this.platforms) {
            const info = service.getPlatformInfo();
            platforms[name] = {
                name: info.name,
                baseUrl: info.baseUrl,
                enabled: service.enabled
            };
        }
        return platforms;
    }

    // 带缓存的比赛数据获取
    async getCachedContests() {
        const now = Date.now();
        const cached = this.cache.get('contests');

        if (cached && (now - cached.timestamp) < this.cacheTimeout) {
            console.log(`使用缓存数据 (${cached.data.length}条)`);
            return cached.data;
        }

        console.log('缓存过期，重新请求数据...');
        const contests = await this.getAllContests();
        
        this.cache.set('contests', {
            data: contests,
            timestamp: now
        });
        this.saveCacheToStorage(); // 保存缓存
        
        console.log(`数据已缓存 (${contests.length}条)`);
        return contests;
    }

    // 清除缓存
    clearCache() {
        console.log('缓存已清除');
        this.cache.clear();
        localStorage.removeItem('contestCache');
    }

    // 刷新比赛数据
    async refreshContests() {
        this.clearCache();
        return await this.getCachedContests();
    }

    // 添加自定义平台
    addCustomPlatform(platformName, platformConfig) {
        if (this.platforms.has(platformName)) {
            console.warn(`平台 ${platformName} 已存在，将被覆盖`);
        }
        this.platforms.set(platformName, platformConfig.service);
    }

    // 移除平台
    removePlatform(platformName) {
        this.platforms.delete(platformName);
    }
}

export default ContestService; 