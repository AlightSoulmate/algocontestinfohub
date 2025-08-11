// 日期工具函数

export class DateUtils {
    // 格式化时间为本地字符串
    static formatTime(timeString, locale = 'zh-CN') {
        const date = new Date(timeString);
        return date.toLocaleString(locale, {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'Asia/Shanghai'
        });
    }

    // 格式化日期（只显示日期）
    static formatDate(timeString, locale = 'zh-CN') {
        const date = new Date(timeString);
        return date.toLocaleDateString(locale, {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            timeZone: 'Asia/Shanghai'
        });
    }

    // 格式化时间（只显示时间）
    static formatTimeOnly(timeString, locale = 'zh-CN') {
        const date = new Date(timeString);
        return date.toLocaleTimeString(locale, {
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'Asia/Shanghai'
        });
    }

    // 计算倒计时
    static calculateCountdown(startTime) {
        const now = new Date();
        const start = new Date(startTime);
        const diff = start - now;
        
        if (diff <= 0) return '即将开始';
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        if (days > 0) return `${days}天 ${hours}小时`;
        if (hours > 0) return `${hours}小时 ${minutes}分钟`;
        if (minutes > 0) return `${minutes}分钟 ${seconds}秒`;
        return `${seconds}秒`;
    }

    // 获取相对时间描述
    static getRelativeTime(timeString) {
        const now = new Date();
        const target = new Date(timeString);
        const diff = target - now;
        const absDiff = Math.abs(diff);
        
        const minutes = Math.floor(absDiff / (1000 * 60));
        const hours = Math.floor(absDiff / (1000 * 60 * 60));
        const days = Math.floor(absDiff / (1000 * 60 * 60 * 24));
        
        if (diff > 0) {
            if (days > 0) return `${days}天后`;
            if (hours > 0) return `${hours}小时后`;
            if (minutes > 0) return `${minutes}分钟后`;
            return '即将开始';
        } else {
            if (days > 0) return `${days}天前`;
            if (hours > 0) return `${hours}小时前`;
            if (minutes > 0) return `${minutes}分钟前`;
            return '刚刚';
        }
    }

    // 检查是否是今天
    static isToday(timeString) {
        const today = new Date();
        const target = new Date(timeString);
        return today.toDateString() === target.toDateString();
    }

    // 检查是否是明天
    static isTomorrow(timeString) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const target = new Date(timeString);
        return tomorrow.toDateString() === target.toDateString();
    }

    // 获取星期几
    static getDayOfWeek(timeString, locale = 'zh-CN') {
        const date = new Date(timeString);
        return date.toLocaleDateString(locale, { weekday: 'long' });
    }
} 