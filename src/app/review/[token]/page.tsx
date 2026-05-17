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
    try {
      const res = await fetch(`${apiUrl}/admin/reviews/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, ...formData })
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message || 'Submission failed');
      }

      setMessage('Thanks for sharing your feedback.');
      setValid(false);
      setTimeout(() => router.push('/'), 1500);
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
        <p className="text-sm text-[var(--muted)]">Validating link...</p>
      </main>
    );
  }

  if (!valid) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-[var(--muted)]">{message}</p>
      </main>
    );
  }

  return (
    <main style={{ paddingTop: 'var(--navbar-height, 120px)' }}>
      <section className="section-shell">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="contact-card flex flex-col" style={{ padding: 'clamp(2rem, 5vw, 4rem)' }}>
              <div className="flex items-center justify-between mb-10">
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
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="contact-input"
                    />
                    <label className="contact-label">Your Name</label>
                  </div>

                  <div className="contact-input-group">
                    <input
                      type="text"
                      placeholder=" "
                      required
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="contact-input"
                    />
                    <label className="contact-label">Role / Position</label>
                  </div>

                  <div className="contact-input-group">
                    <input
                      type="text"
                      placeholder=" "
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="contact-input"
                    />
                    <label className="contact-label">Company (optional)</label>
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
                          value={formData.avatar}
                          onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                          className="contact-input"
                        />
                        <label className="contact-label">Or paste avatar URL</label>
                      </div>

                      {uploadError && (
                        <p className="text-xs text-red-400">{uploadError}</p>
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
                        onClick={() => setFormData({ ...formData, rating: num })}
                        className={`flex items-center justify-center w-12 h-12 rounded-xl border transition-all ${
                          formData.rating >= num
                            ? 'border-[var(--accent)] text-[var(--accent)]'
                            : 'border-[var(--border)] text-[var(--muted)]'
                        }`}
                      >
                        <Star size={16} className={formData.rating >= num ? 'fill-[var(--accent)]' : ''} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="contact-input-group">
                  <textarea
                    placeholder=" "
                    required
                    rows={5}
                    value={formData.text}
                    onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                    className="contact-input resize-none"
                  />
                  <label className="contact-label">Your Review</label>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="contact-btn w-full"
                  >
                    {submitting ? 'Submitting...' : 'Submit Review'}
                  </button>
                  {message && (
                    <p className="text-center mt-6 text-xs font-mono uppercase tracking-widest text-[var(--muted)]">
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
