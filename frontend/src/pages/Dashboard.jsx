import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getSnippets, deleteSnippet } from '../api/snippetApi';
import { getSnippetsSuccess, deleteSnippetSuccess } from '../store/snippetSlice';
import SnippetList from '../components/snippets/SnippetList';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [language, setLanguage] = useState('all');
  const [visibility, setVisibility] = useState('all');

  const dispatch = useDispatch();
  const snippets = useSelector(state => state.snippets.snippets);
  const user = useSelector(state => state.auth.user);

  // Fetch snippets once on mount
  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        setLoading(true);
  const res = await getSnippets("");
        dispatch(getSnippetsSuccess(res.data?.data || []));
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load snippets');
        dispatch(getSnippetsSuccess([]));
      } finally {
        setLoading(false);
      }
    };
    fetchSnippets();
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (window.confirm('Delete this snippet?')) {
      try {
        const res = await deleteSnippet(id);
        if (res.data?.success) dispatch(deleteSnippetSuccess(id));
        else throw new Error(res.data?.message);
      } catch (err) {
        setError(err.message || 'Failed to delete snippet');
      }
    }
  };

  // Filtered results client-side
  const filtered = snippets.filter(snippet => {
    const searchMatch = snippet.title.toLowerCase().includes(search.toLowerCase());
    const langMatch = language === 'all' || snippet.language === language;
    const visMatch =
      visibility === 'all' ||
      (visibility === 'public' && snippet.isPublic) ||
      (visibility === 'private' && !snippet.isPublic);
    return searchMatch && langMatch && visMatch;
  });

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">
          {user?.username ? `Welcome back, ${user.username}!` : 'My Snippets'}
        </h1>
        <Link
          to="/create-snippet"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          New Snippet
        </Link>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">{error}</div>
      )}

      {/* Filters */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by title..."
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
          <select
            value={language}
            onChange={e => setLanguage(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All</option>
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Visibility</label>
          <select
            value={visibility}
            onChange={e => setVisibility(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All</option>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>
      </div>

      {/* Snippets */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        {loading ? (
          <div className="flex justify-center items-center h-32 text-gray-500">
            Loading snippets...
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {snippets.length === 0
              ? "You don't have any snippets yet. Create one!"
              : 'No snippets match your filters.'}
          </div>
        ) : (
          <SnippetList snippets={filtered} onDelete={handleDelete} showActions />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
