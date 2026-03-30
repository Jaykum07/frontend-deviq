// src/components/Loader.jsx
const Loader = () => {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0d1117',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        width: '40px',
        height: '40px',
        border: '3px solid #30363d',
        borderTopColor: '#58a6ff',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default Loader;