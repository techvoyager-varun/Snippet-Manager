import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createSnippet,updateSnippet,getSnippetById } from '../../api/snippetApi';
import {
  saveSnippetSuccess,
  clearCurrentSnippet
} from '../../store/snippetSlice';

const SnippetForm = ({ isEdit = false }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [tags, setTags] = useState('');
  const [isPublic, setIsPublic] = useState(false);

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchSnippet = async () => {
      if (!isEdit || !id) return;

      try {
        setIsSubmitting(true);
        const res = await getSnippetById(id);
        const s = res.data?.data;

        if (!s) throw new Error('Snippet not found');

        setTitle(s.title);
        setDescription(s.description || '');
        setCode(s.code || '');
        setLanguage(s.language || 'javascript');
        setTags(s.tags?.join(', ') || '');
        setIsPublic(!!s.isPublic);
      } catch (err) {
        setError(err.message || 'Failed to load snippet');
      } finally {
        setIsSubmitting(false);
      }
    };

    fetchSnippet();
    return () => dispatch(clearCurrentSnippet());
  }, [id, isEdit, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const snippetData = {
      title,
      description,
      code,
      language,
      isPublic,
      tags: tags.split(',').map(tag => tag.trim()).filter(Boolean)
    };

    try {
      const res = isEdit
        ? await updateSnippet(id, snippetData)
        : await createSnippet(snippetData);

      if (!res.data?.success) throw new Error(res.data?.message || 'Save failed');

      dispatch(saveSnippetSuccess(res.data.data));
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-6 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        {isEdit ? 'Edit Snippet' : 'Create New Snippet'}
      </h1>

      {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title*</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 h-20"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Language*</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
            <option value="c">C</option>
            <option value="c++">C++</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Code*</label>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md font-mono focus:ring-2 focus:ring-blue-500 h-64"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma separated)</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
          />
          <label className="text-gray-700">Make this snippet public</label>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : isEdit ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SnippetForm;
