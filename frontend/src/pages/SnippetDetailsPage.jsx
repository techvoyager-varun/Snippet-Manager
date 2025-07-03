import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSnippetById } from '../api/snippetApi';
import { FaCopy, FaCheck } from 'react-icons/fa';

const SnippetDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [snippet, setSnippet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchSnippet = async () => {
      try {
        setLoading(true);
        const res = await getSnippetById(id);
        const data = res.data?.data;
        if (!data) throw new Error('Snippet not found');
        setSnippet(data);
      } catch (err) {
        setError(err.message || 'Failed to load snippet');
      } finally {
        setLoading(false);
      }
    };

    fetchSnippet();
  }, [id]);

  const handleCopy = () => {
    if (snippet?.code) {
      navigator.clipboard.writeText(snippet.code).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        Loading snippet...
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto mt-10 p-4 bg-red-100 text-red-700 rounded-md">
        {error}
        <button
          onClick={() => navigate('/dashboard')}
          className="ml-4 text-blue-600 underline"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{snippet.title}</h1>
        <p className="text-gray-600 mb-1">{snippet.description}</p>
        <div className="flex flex-wrap items-center gap-2 mt-2">
          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
            {snippet.language}
          </span>
          <span className={`px-2 py-1 text-sm rounded-full ${snippet.isPublic ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
            {snippet.isPublic ? 'Public' : 'Private'}
          </span>
          {snippet.tags?.map(tag => (
            <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      <div className="relative">
        <button
          onClick={handleCopy}
          className="absolute right-2 top-2 flex items-center text-sm bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded-md"
        >
          {copied ? <><FaCheck className="mr-1" /> Copied</> : <><FaCopy className="mr-1" /> Copy Code</>}
        </button>

        <pre className="whitespace-pre-wrap bg-gray-100 p-4 rounded-md overflow-x-auto text-sm font-mono mt-8">
          {snippet.code}
        </pre>
      </div>
    </div>
  );
};

export default SnippetDetailsPage;
