import { Link } from 'react-router-dom';
import { FaCode, FaEye, FaEyeSlash, FaTrash, FaEdit } from 'react-icons/fa';

const SnippetItem = ({ snippet, onDelete, showActions = true }) => {
  return (
    <div className="border-b border-gray-200 py-4 hover:bg-gray-50 transition-colors">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
              {snippet.language}
            </span>
            {snippet.isPublic ? (
              <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full flex items-center">
                <FaEye className="mr-1" /> Public
              </span>
            ) : (
              <span className="text-xs px-2 py-1 bg-gray-100 text-gray-800 rounded-full flex items-center">
                <FaEyeSlash className="mr-1" /> Private
              </span>
            )}
          </div>
          
          <Link 
            to={`/snippets/${snippet._id}`}
            className="block group"
          >
            <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
              {snippet.title}
            </h3>
            {snippet.description && (
              <p className="text-gray-600 mt-1">{snippet.description}</p>
            )}
          </Link>

          {snippet.tags?.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {snippet.tags.map(tag => (
                <span 
                  key={tag} 
                  className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {showActions && (
          <div className="flex space-x-2 ml-4">
            <Link
              to={`/edit-snippet/${snippet._id}`}
              className="text-gray-500 hover:text-blue-600 transition-colors"
              title="Edit"
            >
              <FaEdit className="w-4 h-4" />
            </Link>
            <button
              onClick={() => onDelete(snippet._id)}
              className="text-gray-500 hover:text-red-600 transition-colors"
              title="Delete"
            >
              <FaTrash className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      <div className="mt-3 bg-gray-50 p-3 rounded-md">
        <div className="flex items-center text-gray-500 mb-1">
          <FaCode className="mr-1 w-3 h-3" />
          <span className="text-xs font-mono">Code Preview</span>
        </div>
        <pre className="text-xs text-gray-700 overflow-x-auto">
          {snippet.code.split('\n').slice(0, 3).join('\n')}
          {snippet.code.split('\n').length > 3 && '...'}
        </pre>
      </div>
    </div>
  );
};

export default SnippetItem;