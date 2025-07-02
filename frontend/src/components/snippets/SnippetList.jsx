import SnippetItem from './SnippetItem';

const SnippetList = ({ snippets, onDelete, showActions = true }) => {
  return (
    <div className="divide-y divide-gray-200">
      {snippets.map(snippet => (
        <SnippetItem
          key={snippet._id}
          snippet={snippet}
          onDelete={onDelete}
          showActions={showActions}
        />
      ))}
    </div>
  );
};

export default SnippetList;