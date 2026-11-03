// ========== 搜索功能 ==========
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    // 示例搜索数据（实际使用时可以从 JSON 文件加载）
    const searchData = [
        {
            title: '苏州经典景区与徒步路线',
            url: '/life/suzhou-scenic-hiking.html',
            excerpt: '拙政园、留园、虎丘、寒山寺、周庄/同里，以及天平、灵岩、穹窿、上方、阳山的路线难度与时间',
            category: 'life',
            date: '2026-11-03'
        },
        {
            title: '工作日志 2026-11-03',
            url: '/work/daily-2026-11-03.html',
            excerpt: 'newapi2.0 迁移项目 (11/3-11/20)；B端豆包生视频功能发布',
            category: 'work',
            date: '2026-11-03'
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
