// 平台管理器 - 统一管理所有比赛平台

import CodeforcesService from './codeforcesService.js';
import AtCoderService from './atcoderService.js';
import LeetCodeService from './leetcodeService.js';

class PlatformManager {
    constructor() {
        this.platforms = new Map();
        this.initializeDefaultPlatforms();
    }

    // 初始化默认平台
    initializeDefaultPlatforms() {
        // 注册 Codeforces 平台
        this.registerPlatform(new CodeforcesService());
        
        // 注册 AtCoder 平台（默认禁用）
        const atcoderService = new AtCoderService();
        atcoderService.enabled = false;
        this.registerPlatform(atcoderService);
        
        // 注册 LeetCode 平台（默认启用）
        const leetcodeService = new LeetCodeService();
        leetcodeService.enabled = false;
        this.registerPlatform(leetcodeService);
    }

    // 注册平台
    registerPlatform(platformService) {
        const platformInfo = platformService.getPlatformInfo();
        this.platforms.set(platformInfo.name, {
            service: platformService,
            ...platformInfo
        });
        
        console.log(`平台 ${platformInfo.name} 已注册`);
    }

    // 获取平台服务实例
    getPlatformService(platformName) {
        const platform = this.platforms.get(platformName);
        return platform ? platform.service : null;
    }

    // 获取所有平台信息
    getAllPlatforms() {
        const platforms = {};
        for (const [name, platform] of this.platforms) {
            platforms[name] = {
                name: platform.name,
                baseUrl: platform.baseUrl,
                enabled: platform.enabled
            };
        }
        return platforms;
    }

    // 获取启用的平台
    getEnabledPlatforms() {
        const enabled = [];
        for (const [name, platform] of this.platforms) {
            if (platform.enabled) {
                enabled.push({
                    name: platform.name,
                    baseUrl: platform.baseUrl
                });
            }
        }
        return enabled;
    }

    // 启用/禁用平台
    setPlatformEnabled(platformName, enabled) {
        const platform = this.platforms.get(platformName);
        if (platform) {
            platform.enabled = enabled;
            platform.service.enabled = enabled;
            console.log(`${platform.name} 平台已${enabled ? '启用' : '禁用'}`);
        }
    }

    // 获取平台状态
    getPlatformStatus(platformName) {
        const platform = this.platforms.get(platformName);
        if (!platform) return null;
        
        return {
            name: platform.name,
            baseUrl: platform.baseUrl,
            enabled: platform.enabled
        };
    }

    // 添加自定义平台
    addCustomPlatform(platformName, platformConfig) {
        if (this.platforms.has(platformName)) {
            console.warn(`平台 ${platformName} 已存在，将被覆盖`);
        }
        
        this.platforms.set(platformName, {
            service: platformConfig.service,
            name: platformName,
            baseUrl: platformConfig.baseUrl,
            enabled: platformConfig.enabled !== undefined ? platformConfig.enabled : true
        });
        
        console.log(`自定义平台 ${platformName} 已添加`);
    }

    // 移除平台
    removePlatform(platformName) {
        if (this.platforms.has(platformName)) {
            const platform = this.platforms.get(platformName);
            this.platforms.delete(platformName);
            console.log(`平台 ${platform.name} 已移除`);
        }
    }

    // 获取所有启用的平台服务
    getEnabledPlatformServices() {
        const services = [];
        for (const [name, platform] of this.platforms) {
            if (platform.enabled) {
                services.push(platform.service);
            }
        }
        return services;
    }
}

export default PlatformManager; 