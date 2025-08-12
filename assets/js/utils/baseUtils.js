// 基础工具类

export class baseUtils {
      // 防抖函数
    static  debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // 检查元素是否存在
    static elementExists(selector) {
        return document.querySelector(selector) !== null;
    }
}