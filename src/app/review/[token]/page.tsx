'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Star } from 'lucide-react';

const ReviewFormPage = () => {
  const params = useParams();
  const router = useRouter();
  const token = useMemo(() => {
    const value = params?.token;
    return Array.isArray(value) ? value[0] : value;
  }, [params]);

  const [loading, setLoading] = useState(true);
  const [valid, setValid] = useState(false);
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    company: '',
    text: '',
    rating: 5,
    avatar: ''
  });

  useEffect(() => {
    const validateInvite = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!apiUrl || !token) {
        setMessage('Invalid review link.');
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${apiUrl}/admin/reviews/invite/${token}`);
        if (!res.ok) throw new Error();
        setValid(true);
      } catch {
        setMessage('This review link is invalid or expired.');
      } finally {
        setLoading(false);
      }
    };

    validateInvite();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl || !token) return;

    setSubmitting(true);
    setMessage('');
    setErrors({});
    try {
      const res = await fetch(`${apiUrl}/admin/reviews/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, ...formData })
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        if (data?.errors) {
          setErrors(data.errors);
        }
        throw new Error(data?.message || 'Submission failed');
      }

      setSubmitted(true);
    } catch (err: any) {
      setMessage(err.message || 'Submission failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleAvatarUpload = async (file: File) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) return;

    setUploading(true);
    setUploadError('');
    try {
      const formData = new FormData();
      formData.append('image', file);

      const res = await fetch(`${apiUrl}/admin/reviews/upload`, {
        method: 'POST',
        body: formData
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message || 'Upload failed');
      }

      const data = await res.json();
      setFormData((prev) => ({ ...prev, avatar: data.url || '' }));
    } catch (err: any) {
      setUploadError(err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-sm font-mono uppercase tracking-widest text-[var(--muted)] animate-pulse">Validating invite token...</p>
      </main>
    );
  }

  if (!valid) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8 bg-[var(--surface)] border border-[var(--border)] rounded-[2rem] max-w-md mx-6 shadow-2xl">
          <p className="text-sm font-mono uppercase tracking-widest text-rose-400 mb-4">Verification Error</p>
          <p className="text-base text-[var(--muted)]">{message}</p>
        </div>
      </main>
    );
  }

  if (submitted) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[var(--background)] px-6 relative overflow-hidden">
        {/* Spatial floating particles background */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-[var(--accent)] rounded-full animate-pulse"
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: `${10 + Math.random() * 80}%`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>

        <div 
          className="contact-card flex flex-col items-center text-center max-w-xl w-full rounded-[2.5rem] shadow-2xl relative z-10"
          style={{
            animation: 'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both'
          }}
        >
          {/* Spatial brutalist success icon */}
          <div className="w-20 h-20 bg-[var(--accent)]/10 border-2 border-[var(--accent)] text-[var(--accent)] rounded-full flex items-center justify-center mb-8 relative">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <div className="absolute inset-0 rounded-full border border-[var(--accent)]/30 animate-ping" style={{ animationDuration: '2s' }} />
          </div>

          <h1 className="text-3xl font-black uppercase tracking-tighter italic mb-3">Transmission Successful.</h1>
          <p className="text-xs font-mono uppercase tracking-widest text-[var(--accent)] mb-8">Testimonial Cataloged</p>

          <p className="text-sm text-[var(--muted)] leading-relaxed mb-10">
            Thank you! Your feedback has been safely captured. It is currently queued for Salah&apos;s digital display board, where it will serve as an endorsement of our successful collaboration.
          </p>

          <button
            onClick={() => router.push('/')}
            className="contact-btn w-full py-5 flex items-center justify-center gap-3"
          >
            <span>Return to Portfolio</span>
          </button>
        </div>
      </main>
    );
  }

  return (
    <main>
      <section className="section-shell">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="contact-card flex flex-col">
              <div className="flex items-center justify-between mb-12">
                <div className="flex flex-col gap-1">
                  <h1 className="text-3xl font-black uppercase tracking-tighter italic">Share a Review.</h1>
                  <p className="text-sm text-[var(--muted)]">Help me showcase the impact of our collaboration.</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                <div className="grid md:grid-cols-2 gap-x-10 gap-y-10">
                  <div className="contact-input-group">
                    <input
                      type="text"
                      placeholder=" "
                      required
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors((prev) => { const c = { ...prev }; delete c.name; return c; });
                      }}
                      className={`contact-input ${errors.name ? '!border-red-500/50' : ''}`}
                    />
                    <label className="contact-label">Your Name</label>
                    {errors.name && (
                      <p className="text-[10px] font-mono uppercase tracking-widest text-red-400 mt-2">{errors.name}</p>
                    )}
                  </div>

                  <div className="contact-input-group">
                    <input
                      type="text"
                      placeholder=" "
                      required
                      value={formData.role}
                      onChange={(e) => {
                        setFormData({ ...formData, role: e.target.value });
                        if (errors.role) setErrors((prev) => { const c = { ...prev }; delete c.role; return c; });
                      }}
                      className={`contact-input ${errors.role ? '!border-red-500/50' : ''}`}
                    />
                    <label className="contact-label">Role / Position</label>
                    {errors.role && (
                      <p className="text-[10px] font-mono uppercase tracking-widest text-red-400 mt-2">{errors.role}</p>
                    )}
                  </div>

                  <div className="contact-input-group">
                    <input
                      type="text"
                      placeholder=" "
                      value={formData.company}
                      onChange={(e) => {
                        setFormData({ ...formData, company: e.target.value });
                        if (errors.company) setErrors((prev) => { const c = { ...prev }; delete c.company; return c; });
                      }}
                      className={`contact-input ${errors.company ? '!border-red-500/50' : ''}`}
                    />
                    <label className="contact-label">Company (optional)</label>
                    {errors.company && (
                      <p className="text-[10px] font-mono uppercase tracking-widest text-red-400 mt-2">{errors.company}</p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <p className="text-xs font-mono uppercase tracking-widest text-[var(--muted)]">Avatar (optional)</p>
                    <div className="flex flex-col gap-3">
                      {formData.avatar ? (
                        <div className="flex items-center gap-4">
                          <img
                            src={formData.avatar}
                            alt="Avatar preview"
                            className="h-16 w-16 rounded-2xl object-cover border border-[var(--border)]"
                          />
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, avatar: '' })}
                            className="text-xs text-[var(--muted)] hover:text-white transition"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <label className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl border border-[var(--border)] text-xs text-[var(--muted)] hover:text-white hover:border-[var(--accent)]/60 transition cursor-pointer w-fit">
                          {uploading ? 'Uploading...' : 'Upload avatar'}
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            disabled={uploading}
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleAvatarUpload(file);
                              e.currentTarget.value = '';
                            }}
                          />
                        </label>
                      )}

                      <div className="contact-input-group">
                        <input
                          type="url"
                          placeholder=" "
                          value={formData.avatar || ''}
                          onChange={(e) => {
                            setFormData({ ...formData, avatar: e.target.value });
                            if (errors.avatar) setErrors((prev) => { const c = { ...prev }; delete c.avatar; return c; });
                          }}
                          className={`contact-input ${errors.avatar ? '!border-red-500/50' : ''}`}
                        />
                        <label className="contact-label">Or paste avatar URL</label>
                      </div>

                      {(uploadError || errors.avatar) && (
                        <p className="text-[10px] font-mono uppercase tracking-widest text-red-400">{uploadError || errors.avatar}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-xs font-mono uppercase tracking-widest text-[var(--muted)]">Rating</p>
                  <div className="flex gap-3">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => {
                          setFormData({ ...formData, rating: num });
                          if (errors.rating) setErrors((prev) => { const c = { ...prev }; delete c.rating; return c; });
                        }}
                        className={`flex items-center justify-center w-12 h-12 rounded-xl border transition-all ${
                          formData.rating >= num
                            ? 'border-[var(--accent)] text-[var(--accent)] bg-[var(--accent)]/5'
                            : 'border-[var(--border)] text-[var(--muted)] hover:border-[var(--accent)]/40'
                        }`}
                      >
                        <Star size={16} className={formData.rating >= num ? 'fill-[var(--accent)]' : ''} />
                      </button>
                    ))}
                  </div>
                  {errors.rating && (
                    <p className="text-[10px] font-mono uppercase tracking-widest text-red-400 mt-2">{errors.rating}</p>
                  )}
                </div>

                <div className="contact-input-group">
                  <textarea
                    placeholder=" "
                    required
                    rows={5}
                    value={formData.text}
                    onChange={(e) => {
                      setFormData({ ...formData, text: e.target.value });
                      if (errors.text) setErrors((prev) => { const c = { ...prev }; delete c.text; return c; });
                    }}
                    className={`contact-input resize-none ${errors.text ? '!border-red-500/50' : ''}`}
                  />
                  <label className="contact-label">Your Review</label>
                  {errors.text && (
                    <p className="text-[10px] font-mono uppercase tracking-widest text-red-400 mt-2">{errors.text}</p>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="contact-btn w-full flex items-center justify-center gap-3"
                  >
                    <span>{submitting ? 'Transmitting...' : 'Submit Review'}</span>
                  </button>
                  {message && !submitted && (
                    <p className="text-center mt-6 text-xs font-mono uppercase tracking-widest text-rose-400">
                      {message}
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ReviewFormPage;
