'use client';

import { useState } from 'react';
import { CalendarEmail, Comment } from '@/lib/types';
import { getEmailTypeColor, getStatusColor } from '@/lib/utils';
import { supabase } from '@/lib/supabase';

interface Props {
  email: CalendarEmail;
  clientSlug: string;
  comments: Comment[];
  onClose: () => void;
  onCommentAdded: () => void;
}

export function CommentModal({ email, clientSlug, comments, onClose, onCommentAdded }: Props) {
  const [authorName, setAuthorName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase || !authorName.trim() || !commentText.trim()) return;

    setSubmitting(true);
    const { error } = await supabase.from('comments').insert({
      client_slug: clientSlug,
      email_id: email.id,
      author_name: authorName.trim(),
      comment: commentText.trim(),
    });

    if (!error) {
      setCommentText('');
      onCommentAdded();
    }
    setSubmitting(false);
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-5 border-b border-gray-100">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getEmailTypeColor(email.type)}`}>
                {email.type}
              </span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium border ${getStatusColor(email.status)}`}>
                {email.status}
              </span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 leading-snug">{email.theme}</h3>
            <p className="text-sm text-gray-500 mt-0.5">{email.date} ({email.day})</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none p-1 ml-3 flex-shrink-0"
          >
            &times;
          </button>
        </div>

        {/* Email Details */}
        <div className="p-5 border-b border-gray-100 space-y-3">
          {email.product && (
            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Product</label>
              <p className="text-sm text-gray-700 mt-0.5">{email.product}</p>
            </div>
          )}
          {email.shortDescription && (
            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Description</label>
              <p className="text-sm text-gray-700 mt-0.5">{email.shortDescription}</p>
            </div>
          )}
          {email.notes && (
            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Notes</label>
              <p className="text-sm text-gray-700 mt-0.5">{email.notes}</p>
            </div>
          )}

          {/* Links */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Email Copy</label>
              {email.emailCopyLink ? (
                <a
                  href={email.emailCopyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline block truncate mt-0.5"
                >
                  View Copy &rarr;
                </a>
              ) : (
                <p className="text-sm text-gray-300 italic mt-0.5">Not added yet</p>
              )}
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Final Design</label>
              {email.finalDesignLink ? (
                <a
                  href={email.finalDesignLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline block truncate mt-0.5"
                >
                  View Design &rarr;
                </a>
              ) : (
                <p className="text-sm text-gray-300 italic mt-0.5">Not added yet</p>
              )}
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="p-5">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">
            Feedback & Comments {comments.length > 0 && <span className="text-gray-400">({comments.length})</span>}
          </h4>

          {comments.length > 0 ? (
            <div className="space-y-3 mb-4">
              {comments.map(comment => (
                <div key={comment.id} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900">{comment.author_name}</span>
                    <span className="text-xs text-gray-400">
                      {new Date(comment.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">{comment.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400 mb-4">No comments yet. Click below to leave feedback.</p>
          )}

          {/* Add Comment Form */}
          {supabase ? (
            <form onSubmit={handleSubmit} className="space-y-2 border-t border-gray-100 pt-4">
              <input
                type="text"
                placeholder="Your name"
                value={authorName}
                onChange={e => setAuthorName(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <textarea
                placeholder="Leave a comment or feedback..."
                value={commentText}
                onChange={e => setCommentText(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                required
              />
              <button
                type="submit"
                disabled={submitting || !authorName.trim() || !commentText.trim()}
                className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                {submitting ? 'Posting...' : 'Post Comment'}
              </button>
            </form>
          ) : (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mt-2">
              <p className="text-xs text-amber-700">
                Comments will be available once the database is connected. Calendar viewing works without it.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
