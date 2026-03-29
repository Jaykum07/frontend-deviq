import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerApi } from '../api/authApi';
import useAuth from '../hooks/useAuth';

const s = {
  page:  { minHeight:'100vh', backgroundColor:'#0d1117', display:'flex', alignItems:'center', justifyContent:'center', padding:'1rem', fontFamily:'Inter, sans-serif' },
  wrap:  { width:'100%', maxWidth:'420px' },
  logo:  { textAlign:'center', marginBottom:'2rem' },
  row:   { display:'flex', alignItems:'center', justifyContent:'center', gap:'12px', marginBottom:'8px' },
  img:   { width:'44px', height:'44px', borderRadius:'50%', objectFit:'cover' },
  title: { fontSize:'2rem', fontWeight:'700', color:'#fff', letterSpacing:'-0.5px' },
  sub:   { fontSize:'0.85rem', color:'#6e7681' },
  card:  { backgroundColor:'#161b22', border:'1px solid #30363d', borderRadius:'16px', padding:'2rem' },
  h2:    { fontSize:'1.25rem', fontWeight:'600', color:'#e6edf3', marginBottom:'1.5rem' },
  err:   { backgroundColor:'rgba(248,81,73,0.1)', border:'1px solid rgba(248,81,73,0.4)', color:'#f85149', borderRadius:'8px', padding:'10px 14px', fontSize:'0.85rem', marginBottom:'1rem' },
  grp:   { marginBottom:'1rem' },
  lbl:   { display:'block', fontSize:'0.85rem', color:'#8b949e', marginBottom:'6px', fontWeight:'500' },
  inp:   { width:'100%', backgroundColor:'#0d1117', border:'1px solid #30363d', borderRadius:'8px', padding:'10px 14px', color:'#e6edf3', fontSize:'0.9rem', outline:'none', boxSizing:'border-box' },
  btn:   { width:'100%', backgroundColor:'#1f6feb', color:'#fff', border:'none', borderRadius:'8px', padding:'11px', fontSize:'0.9rem', fontWeight:'600', cursor:'pointer', marginTop:'0.5rem' },
  foot:  { textAlign:'center', marginTop:'1.25rem', fontSize:'0.85rem', color:'#6e7681' },
  lnk:   { color:'#58a6ff', textDecoration:'none', fontWeight:'500' },
};

const fields = [
  { label:'Full name',        name:'name',            type:'text',     ph:'Rahul Sharma'     },
  { label:'Email address',    name:'email',           type:'email',    ph:'you@example.com'  },
  { label:'Password',         name:'password',        type:'password', ph:'Min 6 characters' },
  { label:'Confirm password', name:'confirmPassword', type:'password', ph:'Repeat password'  },
];

const RegisterPage = () => {
  const navigate  = useNavigate();
  const { login } = useAuth();
  const [form, setForm]     = useState({ name:'', email:'', password:'', confirmPassword:'' });
  const [loading, setLoad]  = useState(false);
  const [error, setError]   = useState('');

  const onChange = (e) => { setForm({...form, [e.target.name]: e.target.value}); setError(''); };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) { setError('Please fill in all fields'); return; }
    if (form.password.length < 6) { setError('Password must be at least 6 characters'); return; }
    if (form.password !== form.confirmPassword) { setError('Passwords do not match'); return; }
    setLoad(true);
    try {
      const res = await registerApi(form.name, form.email, form.password);
      login(res.data.user, res.data.accessToken);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    } finally { setLoad(false); }
  };

  return (
    <div style={s.page}>
      <div style={s.wrap}>
        <div style={s.logo}>
          <div style={s.row}>
            <img src="/deviqlogo.jpg" alt="DevIQ" style={s.img} />
            <span style={s.title}>DevIQ</span>
          </div>
          <p style={s.sub}>Developer Intelligence Platform</p>
        </div>
        <div style={s.card}>
          <h2 style={s.h2}>Create your account</h2>
          {error && <div style={s.err}>{error}</div>}
          <form onSubmit={onSubmit}>
            {fields.map(f => (
              <div key={f.name} style={s.grp}>
                <label style={s.lbl}>{f.label}</label>
                <input type={f.type} name={f.name} value={form[f.name]}
                  onChange={onChange} placeholder={f.ph} style={s.inp} />
              </div>
            ))}
            <button type="submit" disabled={loading}
              style={{...s.btn, ...(loading ? {opacity:0.6, cursor:'not-allowed'} : {})}}>
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </form>
          <p style={s.foot}>
            Already have an account?{' '}
            <Link to="/login" style={s.lnk}>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;