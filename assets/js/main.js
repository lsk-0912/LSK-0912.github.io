// ========== 搜索功能 ==========
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    // 示例搜索数据（实际使用时可以从 JSON 文件加载）
    const searchData = [
        {
            title: '项目规划方法论',
            url: '/work/project-planning.html',
            excerpt: '关于如何进行有效项目规划的一些思考和实践，包括目标设定、资源分配、风险管理等方面...',
            category: 'work',
            date: '2026-11-01'
        },
        {
            title: '团队会议纪要 - 2026/10/28',
            url: '/work/meeting-20261028.html',
            excerpt: '本周团队同步会议的关键决策和行动项，包括项目进度更新、资源调配、下周重点任务...',
            category: 'work',
            date: '2026-10-28'
        },
        {
            title: '技术架构设计文档',
            url: '/work/architecture-design.html',
            excerpt: '系统架构设计的核心原则和最佳实践，包括微服务架构、数据库设计、API 设计等...',
            category: 'work',
            date: '2026-10-26'
        },
        {
            title: '阅读笔记：深度工作',
            url: '/life/reading-notes.html',
            excerpt: '关于提升专注力和工作效率的一些感悟，深度工作的价值和实践方法...',
            category: 'life',
            date: '2026-10-25'
        },
        {
            title: '个人效率工具箱',
            url: '/life/life-tools.html',
            excerpt: '整理的一些提升个人效率的工具和方法，包括时间管理、笔记工具、自动化脚本等...',
            category: 'life',
            date: '2026-10-20'
        },
        {
            title: '健康管理指南',
            url: '/life/health-guide.html',
            excerpt: '个人健康管理的一些心得，包括运动计划、饮食建议、作息规律等...',
            category: 'life',
            date: '2026-10-15'
        }
    ];

    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const query = e.target.value.toLowerCase().trim();
            
            if (query.length < 2) {
                searchResults.classList.remove('active');
                return;
            }

            const results = searchData.filter(item => 
                item.title.toLowerCase().includes(query) || 
                item.excerpt.toLowerCase().includes(query)
            );

            displaySearchResults(results, query);
        });

        // 点击外部关闭搜索结果
        document.addEventListener('click', function(e) {
            if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.classList.remove('active');
            }
        });
    }

    function displaySearchResults(results, query) {
        if (results.length === 0) {
            searchResults.innerHTML = '<div class="search-result-item"><div class="search-result-title">未找到相关内容</div></div>';
            searchResults.classList.add('active');
            return;
        }

        const html = results.map(item => `
            <a href="${item.url}" class="search-result-item">
                <div class="search-result-title">${highlightText(item.title, query)}</div>
                <div class="search-result-excerpt">${highlightText(item.excerpt.substring(0, 100), query)}...</div>
            </a>
        `).join('');

        searchResults.innerHTML = html;
        searchResults.classList.add('active');
    }

    function highlightText(text, query) {
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<strong>$1</strong>');
    }

    // ========== 分类筛选 ==========
    const categoryButtons = document.querySelectorAll('.category-btn');
    const noteCards = document.querySelectorAll('.note-card');

    categoryButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.dataset.category;
            
            // 更新按钮状态
            categoryButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // 筛选笔记
            noteCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // ========== 平滑滚动 ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
