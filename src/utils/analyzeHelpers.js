// All helper functions used across analyze components

export const LANG_COLORS = [
    '#58a6ff','#3fb950','#d29922','#f85149',
    '#bc8cff','#ff7b72','#79c0ff','#56d364',
    '#ffa657','#e3b341',
  ];
  
  export const timeAgo = (date) => {
    if (!date) return 'Unknown';
    const s = Math.floor((Date.now() - new Date(date)) / 1000);
    if (s < 3600)   return `${Math.floor(s / 60)}m ago`;
    if (s < 86400)  return `${Math.floor(s / 3600)}h ago`;
    if (s < 604800) return `${Math.floor(s / 86400)}d ago`;
    return new Date(date).toLocaleDateString();
  };
  
  export const scoreGrade = (n) => {
    if (n >= 80) return { label: 'Excellent', color: '#3fb950' };
    if (n >= 60) return { label: 'Good',      color: '#58a6ff' };
    if (n >= 40) return { label: 'Average',   color: '#d29922' };
    return             { label: 'Weak',       color: '#f85149' };
  };
  
  export const scoreBarColor = (value, max) => {
    const pct = (value / max) * 100;
    if (pct >= 70) return '#3fb950';
    if (pct >= 40) return '#d29922';
    return '#f85149';
  };
  
  export const buildActivityData = (repos) => {
    const counts = {};
    repos.forEach((r) => {
      if (!r.pushedAt) return;
      const d   = new Date(r.pushedAt);
      const key = `${d.getFullYear()}-Q${Math.floor(d.getMonth() / 3) + 1}`;
      counts[key] = (counts[key] || 0) + 1;
    });
    return Object.entries(counts)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .slice(-12)
      .map(([quarter, count]) => ({ quarter, count }));
  };