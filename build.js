#!/usr/bin/env node

/**
 * 平台构建脚本
 * 用于开发和生产环境的构建管理
 */

const fs = require('fs');
const path = require('path');
const http = require('http');
const url = require('url');

// 构建配置
const config = {
    sourceDir: './',
    buildDir: './dist',
    assetsDir: './assets',
    files: [
        'index.html',
        'config.js',
        'README.md',
        'PROJECT_STRUCTURE.md'
    ]
};

// 颜色输出
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m'
};

// 日志函数
function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

// 检查文件是否存在
function fileExists(filePath) {
    return fs.existsSync(filePath);
}

// 创建目录
function createDir(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        log(`✓ 创建目录: ${dirPath}`, 'green');
    }
}

// 复制文件
function copyFile(source, destination) {
    try {
        fs.copyFileSync(source, destination);
        log(`✓ 复制文件: ${source} → ${destination}`, 'green');
    } catch (error) {
        log(`✗ 复制文件失败: ${source}`, 'red');
        console.error(error);
    }
}

// 复制目录
function copyDir(source, destination) {
    if (!fs.existsSync(destination)) {
        fs.mkdirSync(destination, { recursive: true });
    }

    const items = fs.readdirSync(source);
    
    for (const item of items) {
        const sourcePath = path.join(source, item);
        const destPath = path.join(destination, item);
        
        if (fs.statSync(sourcePath).isDirectory()) {
            copyDir(sourcePath, destPath);
        } else {
            copyFile(sourcePath, destPath);
        }
    }
}

// 构建项目
function build() {
    log('🚀 开始构建项目...', 'cyan');
    
    // 创建构建目录
    createDir(config.buildDir);
    
    // 复制主要文件
    for (const file of config.files) {
        const sourcePath = path.join(config.sourceDir, file);
        const destPath = path.join(config.buildDir, file);
        
        if (fileExists(sourcePath)) {
            copyFile(sourcePath, destPath);
        } else {
            log(`⚠ 文件不存在: ${file}`, 'yellow');
        }
    }
    
    // 复制assets目录
    if (fileExists(config.assetsDir)) {
        const destAssetsDir = path.join(config.buildDir, 'assets');
        copyDir(config.assetsDir, destAssetsDir);
    } else {
        log(`⚠ assets目录不存在: ${config.assetsDir}`, 'yellow');
    }
    
    log('✅ 构建完成!', 'green');
    log(`📁 输出目录: ${config.buildDir}`, 'blue');
}

// 清理构建目录
function clean() {
    if (fs.existsSync(config.buildDir)) {
        fs.rmSync(config.buildDir, { recursive: true, force: true });
        log('🧹 清理构建目录完成', 'yellow');
    }
}

// 简单的内置HTTP服务器
function startSimpleServer(port = 8080) {
    const server = http.createServer((req, res) => {
        let filePath = url.parse(req.url).pathname;
        
        // 默认页面
        if (filePath === '/') {
            filePath = '/index.html';
        }
        
        // 构建完整文件路径
        const fullPath = path.join(process.cwd(), filePath);
        
        // 检查文件是否存在
        if (fs.existsSync(fullPath) && fs.statSync(fullPath).isFile()) {
            const ext = path.extname(fullPath);
            let contentType = 'text/html';
            
            // 设置正确的MIME类型
            switch (ext) {
                case '.js':
                    contentType = 'application/javascript';
                    break;
                case '.css':
                    contentType = 'text/css';
                    break;
                case '.json':
                    contentType = 'application/json';
                    break;
                case '.png':
                    contentType = 'image/png';
                    break;
                case '.jpg':
                case '.jpeg':
                    contentType = 'image/jpeg';
                    break;
                case '.gif':
                    contentType = 'image/gif';
                    break;
                case '.svg':
                    contentType = 'image/svg+xml';
                    break;
            }
            
            res.writeHead(200, { 'Content-Type': contentType });
            fs.createReadStream(fullPath).pipe(res);
        } else {
            // 文件不存在，返回404
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(`
                <html>
                    <head><title>404 - 文件未找到</title></head>
                    <body>
                        <h1>404 - 文件未找到</h1>
                        <p>请求的文件: ${filePath}</p>
                        <p><a href="/">返回首页</a></p>
                    </body>
                </html>
            `);
        }
    });
    
    server.listen(port, () => {
        log(`🌐 内置服务器启动成功!`, 'green');
        log(`📱 本地访问: http://localhost:${port}`, 'blue');
        log(`🌍 网络访问: http://0.0.0.0:${port}`, 'blue');
        log(`⏹️  按 Ctrl+C 停止服务器`, 'yellow');
    });
    
    server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            log(`❌ 端口 ${port} 已被占用，尝试使用端口 ${port + 1}`, 'red');
            startSimpleServer(port + 1);
        } else {
            log(`❌ 服务器启动失败: ${err.message}`, 'red');
        }
    });
}

// 开发模式
function dev() {
    log('🔧 开发模式', 'cyan');
    log('启动内置HTTP服务器...', 'blue');
    startSimpleServer();
}

// 显示帮助信息
function showHelp() {
    log('算法竞赛平台 - 构建脚本', 'bright');
    log('');
    log('使用方法:', 'cyan');
    log('  node build.js [命令]', 'white');
    log('');
    log('可用命令:', 'cyan');
    log('  build    构建生产版本', 'white');
    log('  clean    清理构建目录', 'white');
    log('  dev      开发模式（使用内置服务器）', 'white');
    log('  help     显示帮助信息', 'white');
    log('');
    log('示例:', 'cyan');
    log('  node build.js build', 'white');
    log('  node build.js dev', 'white');
    log('');
    log('💡 提示: 开发模式使用内置HTTP服务器，无需额外依赖', 'yellow');
}

// 主函数
function main() {
    const command = process.argv[2] || 'help';
    
    switch (command) {
        case 'build':
            build();
            break;
        case 'clean':
            clean();
            break;
        case 'dev':
            dev();
            break;
        case 'help':
        default:
            showHelp();
            break;
    }
}

// 运行脚本
if (require.main === module) {
    main();
}

module.exports = {
    build,
    clean,
    dev,
    startSimpleServer,
    config
}; 