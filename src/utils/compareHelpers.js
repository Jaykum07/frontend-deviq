export const scoreColor = (score) => {
    if (score >= 70) return { text: '#3fb950', bg: '#3fb95015', border: '#3fb95040' };
    if (score >= 40) return { text: '#d29922', bg: '#d2992215', border: '#d2992240' };
    return             { text: '#f85149', bg: '#f8514915', border: '#f8514940' };
  };
  
  export const DIMENSION_LABELS = [
    { key: 'activityScore',   label: 'Activity',   max: 20  },
    { key: 'popularityScore', label: 'Popularity', max: 25  },
    { key: 'qualityScore',    label: 'Quality',    max: 20  },
    { key: 'diversityScore',  label: 'Diversity',  max: 15  },
    { key: 'communityScore',  label: 'Community',  max: 20  },
  ];
  
  export const COMPARE_COLORS = [
    '#58a6ff', '#3fb950', '#d29922', '#f85149',
  ];