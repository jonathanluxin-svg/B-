// DOM 元素
const videoUrlInput = document.getElementById('videoUrl');
const processBtn = document.getElementById('processBtn');
const videoPreview = document.getElementById('videoPreview');
const progressSection = document.getElementById('progressSection');
const transcriptSection = document.getElementById('transcriptSection');
const summarySection = document.getElementById('summarySection');
const exportSection = document.getElementById('exportSection');

const videoThumbnail = document.getElementById('videoThumbnail');
const videoTitle = document.getElementById('videoTitle');
const videoAuthor = document.getElementById('videoAuthor');
const videoDuration = document.getElementById('videoDuration');

const transcriptContent = document.getElementById('transcriptContent');
const summaryContent = document.getElementById('summaryContent');
const progressFill = document.getElementById('progressFill');

const copyTranscriptBtn = document.getElementById('copyTranscript');
const copySummaryBtn = document.getElementById('copySummary');
const exportTxtBtn = document.getElementById('exportTxt');
const exportMdBtn = document.getElementById('exportMd');
const exportJsonBtn = document.getElementById('exportJson');

// 全局变量存储结果
let currentTranscript = '';
let currentSummary = '';
let currentVideoInfo = {};

// 验证B站视频链接
function isValidBilibiliUrl(url) {
    const patterns = [
        /^https?:\/\/www\.?bilibili\.com\/video\/BV[\w]+/,
        /^https?:\/\/www\.?bilibili\.com\/video\/av[\d]+/,
        /^https?:\/\/b23\.tv\/[\w]+/
    ];
    return patterns.some(pattern => pattern.test(url));
}

// 模拟进度更新
function updateProgress(step, percentage) {
    const steps = document.querySelectorAll('.step');
    steps.forEach((s, index) => {
        if (index < step) {
            s.classList.add('completed');
            s.classList.remove('active');
        } else if (index === step - 1) {
            s.classList.add('active');
        } else {
            s.classList.remove('active', 'completed');
        }
    });
    progressFill.style.width = percentage + '%';
}

// 模拟异步延迟
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// 处理视频
async function processVideo() {
    const url = videoUrlInput.value.trim();
    
    if (!url) {
        alert('请输入B站视频链接！');
        return;
    }
    
    if (!isValidBilibiliUrl(url)) {
        alert('请输入有效的B站视频链接！');
        return;
    }
    
    // 禁用按钮
    processBtn.disabled = true;
    processBtn.querySelector('.btn-text').textContent = '处理中...';
    processBtn.querySelector('.loader').style.display = 'inline-block';
    
    // 隐藏之前的结果
    transcriptSection.style.display = 'none';
    summarySection.style.display = 'none';
    exportSection.style.display = 'none';
    
    // 显示进度区域
    progressSection.style.display = 'block';
    
    try {
        // 步骤1: 解析视频
        updateProgress(1, 10);
        await delay(1000);
        
        // 模拟获取视频信息
        currentVideoInfo = {
            title: '【示例视频】这是一个B站视频的标题',
            author: '示例UP主',
            duration: '10:23',
            thumbnail: 'https://via.placeholder.com/200x125/00a1d6/ffffff?text=B站视频封面'
        };
        
        videoTitle.textContent = currentVideoInfo.title;
        videoAuthor.textContent = currentVideoInfo.author;
        videoDuration.textContent = currentVideoInfo.duration;
        videoThumbnail.src = currentVideoInfo.thumbnail;
        videoPreview.style.display = 'block';
        
        updateProgress(1, 25);
        
        // 步骤2: 提取音频
        updateProgress(2, 30);
        await delay(1500);
        updateProgress(2, 50);
        
        // 步骤3: 语音识别
        updateProgress(3, 55);
        await delay(2000);
        
        // 模拟转录结果
        currentTranscript = `这是一段模拟的视频转录文本。\n\n在实际应用中,这里会显示视频中的语音内容转录成的中文文字。\n\n转录过程会使用语音识别技术,将视频中的音频内容转换为文字。这个过程可能需要一些时间,具体取决于视频的长度。\n\n转录完成后,文本会按照时间顺序排列,方便用户阅读和查找特定内容。\n\n注意:当前为前端演示版本,实际的转录功能需要后端API支持。后端需要集成以下功能:\n1. B站视频解析和下载\n2. 音频提取\n3. 语音识别(如使用 Whisper、阿里云、腾讯云等语音识别服务)\n4. 文本处理和格式化\n\n转录的准确性取决于:\n- 音频质量\n- 说话人的清晰度\n- 背景噪音\n- 语音识别模型的质量`;
        
        transcriptContent.innerHTML = `\n<pre style="white-space: pre-wrap; font-family: inherit;">${currentTranscript}</pre>`;
        transcriptSection.style.display = 'block';
        
        updateProgress(3, 75);
        
        // 步骤4: 生成总结
        updateProgress(4, 80);
        await delay(1500);
        
        // 模拟总结结果
        currentSummary = `📊 视频总结\n\n**主要内容:**\n这个视频主要介绍了B站视频转录和总结的实现方案。\n\n**核心要点:**\n1. 🎬 视频解析:从B站获取视频信息和音频流\n2. 🎤 语音识别:使用AI技术将音频转换为文字\n3. 📝 智能总结:提取关键信息,生成简洁摘要\n4. 💡 应用场景:学习笔记、内容回顾、快速浏览\n\n**技术实现:**\n- 前端:使用HTML/CSS/JavaScript构建用户界面\n- 后端:需要集成视频解析、语音识别和AI总结服务\n- 推荐使用的服务:Whisper(语音识别)、OpenAI GPT(文本总结)\n\n**待开发功能:**\n- 后端API接口开发\n- B站视频下载和解析\n- 实时转录进度显示\n- 多语言支持\n- 导出功能优化\n\n**预计时长:** ${currentVideoInfo.duration}\n**UP主:** ${currentVideoInfo.author}`;
        
        summaryContent.innerHTML = `<div style="white-space: pre-wrap;">${currentSummary}</div>`;
        summarySection.style.display = 'block';
        
        updateProgress(4, 100);
        
        // 显示导出选项
        exportSection.style.display = 'block';
        
        // 完成
        processBtn.querySelector('.btn-text').textContent = '处理完成';
        await delay(1000);
        
    } catch (error) {
        console.error('处理出错:', error);
        alert('处理过程中出现错误,请稍后重试。');
    } finally {
        // 重置按钮
        processBtn.disabled = false;
        processBtn.querySelector('.btn-text').textContent = '开始处理';
        processBtn.querySelector('.loader').style.display = 'none';
    }
}

// 复制到剪贴板
async function copyToClipboard(text, btnElement) {
    try {
        await navigator.clipboard.writeText(text);
        const originalText = btnElement.textContent;
        btnElement.textContent = '✓ 已复制';
        btnElement.style.background = 'var(--success-color)';
        btnElement.style.color = 'white';
        btnElement.style.borderColor = 'var(--success-color)';
        
        setTimeout(() => {
            btnElement.textContent = originalText;
            btnElement.style.background = '';
            btnElement.style.color = '';
            btnElement.style.borderColor = '';
        }, 2000);
    } catch (err) {
        alert('复制失败,请手动复制。');
    }
}

// 导出为文本文件
function exportAsText() {
    const content = `视频标题:${currentVideoInfo.title}\nUP主:${currentVideoInfo.author}\n时长:${currentVideoInfo.duration}\n\n===== 转录文本 =====\n\n${currentTranscript}\n\n===== 视频总结 =====\n\n${currentSummary}`;
    
    downloadFile('bilibili-transcript.txt', content, 'text/plain');
}

// 导出为Markdown
function exportAsMarkdown() {
    const content = `# ${currentVideoInfo.title}\n\n**UP主:** ${currentVideoInfo.author}  \n**时长:** ${currentVideoInfo.duration}\n\n---\n\n## 📝 转录文本\n\n${currentTranscript}\n\n---\n\n## 📄 视频总结\n\n${currentSummary}\n\n---\n\n*导出时间:${new Date().toLocaleString('zh-CN')}*`;
    
    downloadFile('bilibili-transcript.md', content, 'text/markdown');
}

// 导出为JSON
function exportAsJson() {
    const data = {
        videoInfo: currentVideoInfo,
        transcript: currentTranscript,
        summary: currentSummary,
        exportTime: new Date().toISOString()
    };
    
    const content = JSON.stringify(data, null, 2);
    downloadFile('bilibili-transcript.json', content, 'application/json');
}

// 下载文件
function downloadFile(filename, content, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// 事件监听
processBtn.addEventListener('click', processVideo);

videoUrlInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        processVideo();
    }
});

copyTranscriptBtn.addEventListener('click', () => {
    copyToClipboard(currentTranscript, copyTranscriptBtn);
});

copySummaryBtn.addEventListener('click', () => {
    copyToClipboard(currentSummary, copySummaryBtn);
});

exportTxtBtn.addEventListener('click', exportAsText);
exportMdBtn.addEventListener('click', exportAsMarkdown);
exportJsonBtn.addEventListener('click', exportAsJson);

// 页面加载时的提示
console.log('%c🎬 B站视频转录助手', 'font-size: 20px; color: #00a1d6; font-weight: bold;');
console.log('%c当前为前端演示版本', 'font-size: 14px; color: #fb7299;');
console.log('%c后端API开发中...', 'font-size: 12px; color: #999;');